"use client";

import { api } from "@/api";
import { WTOnboarding } from "@/interfaces";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const [onboardings, setOnboardings] = useState<WTOnboarding[]>([]);

  const { register, handleSubmit } = useForm<FormData>();

  const onOnboardingCreate = async (data: FormData) => {
    const { email, first_name, last_name } = data;

    await api.post<WTOnboarding>("/onboardings", {
      email,
      first_name,
      last_name,
    });

    await listOnboardings();
  };

  const listOnboardings = useCallback(async () => {
    const onboardingsResponse = await api.get("/onboardings");

    const onboardings = onboardingsResponse.data;

    setOnboardings(onboardings);
  }, []);

  useEffect(() => {
    listOnboardings();
  }, [listOnboardings]);

  return (
    <main className="flex flex-col gap-4 bg-gray-100 w-screen h-screen p-8">
      <h1 className="font-bold text-lg">Whos That API Consumer</h1>

      <form
        className="bg-white shadow rounded p-4 flex flex-col gap-4 items-start"
        onSubmit={handleSubmit(onOnboardingCreate)}
      >
        <p>Potential user:</p>

        <div className="flex items-center gap-4">
          <label htmlFor="first_name">First Name:</label>
          <input className="border border-gray-500 h-8 px-4 rounded" type="text" {...register("first_name")} />
        </div>

        <div className="flex items-center gap-4">
          <label htmlFor="last_name">Last Name:</label>
          <input className="border border-gray-500 h-8 px-4 rounded" type="text" {...register("last_name")} />
        </div>

        <div className="flex items-center gap-4">
          <label htmlFor="email">Email:</label>
          <input className="border border-gray-500 h-8 px-4 rounded" type="email" {...register("email")} />
        </div>

        <button className="h-8 px-6 bg-blue-500 rounded text-white" type="submit">
          Create new onboarding
        </button>
      </form>

      <div className="flex items-center gap-4">
        <p>Onboardings:</p>
        <button className="h-8 px-6 bg-blue-500 rounded text-white" onClick={listOnboardings}>
          Reload onboardings
        </button>
      </div>

      {!onboardings.length && <p>No onboardings yet.</p>}

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

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
}
