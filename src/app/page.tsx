"use client";

import { api } from "@/api";
import { WTOnboarding } from "@/interfaces";
import { useEffect, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [onboardings, setOnboardings] = useState<WTOnboarding[]>([]);

  const onOnboardingCreate = async () => {
    await api.post<WTOnboarding>("/third-party-onboardings", {
      email,
      first_name: "Test",
      last_name: "Fake Consumer",
    });

    await listOnboardings();
  };

  const listOnboardings = async () => {
    const onboardingsResponse = await api.get("/third-party-onboardings");

    const onboardings = onboardingsResponse.data;

    setOnboardings(onboardings);
  };

  useEffect(() => {
    listOnboardings();
  }, []);

  return (
    <main className="flex flex-col gap-4 bg-gray-100 w-screen h-screen p-8">
      <h1 className="font-bold text-lg">Pointr API Consumer</h1>

      <div className="bg-white shadow rounded p-4 flex gap-4 items-center">
        <label htmlFor="email">Potential user email:</label>
        <input
          className="border border-gray-500 h-8 px-4 rounded"
          type="email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <button className="h-8 px-6 bg-blue-500 rounded text-white" onClick={onOnboardingCreate}>
          Create new draft
        </button>
      </div>

      <p>Onboardings:</p>

      {onboardings.map((onboarding) => {
        return (
          <div key={onboarding.id} className="bg-white shadow rounded p-4 flex gap-4 flex-col">
            <p>Onboarding ID: {onboarding.id}</p>
            <p>
              User: {onboarding.user.first_name} {onboarding.user.last_name}
            </p>
            <p>Link: {onboarding.link}</p>
            <p>Started at: {onboarding.started_at}</p>
            <p>Completed at: {onboarding.completed_at}</p>

            <p>Points</p>

            {onboarding.user.points &&
              onboarding.user.points.map((point, index) => {
                return (
                  <div key={index}>
                    <p>{point.question.text}</p>
                    <p>{point.answer}</p>
                  </div>
                );
              })}
          </div>
        );
      })}
    </main>
  );
}
