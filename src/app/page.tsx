"use client";

import { api } from "@/api";
import { Draft, DraftUrl, PointrDraft } from "@/interfaces";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [drafts, setDrafts] = useState<Draft[]>([]);

  const onDraftCreate = async () => {
    const draftResponse = await api.post<PointrDraft>("/draft", {
      userEmail: email,
      userKey: email,
      redirectUrl: "http://localhost:3333",
      answersRequired: 10,
    });

    const urlResponse = await api.post<DraftUrl>("/draft/url", { userKey: email });

    const draft: Draft = {
      ...draftResponse.data,
      ...urlResponse.data,
    };

    setDrafts([...drafts, draft]);
  };

  const onGetPoints = async (userKey: string) => {
    const pointsResponse = await api.get(`/draft/${userKey}/points`);

    setDrafts(
      drafts.map((draft) => {
        if (draft.userKey === userKey) {
          return {
            ...draft,
            points: pointsResponse.data,
          };
        }

        return draft;
      })
    );
  };

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
        <button className="h-8 px-6 bg-blue-500 rounded text-white" onClick={onDraftCreate}>
          Create new draft
        </button>
      </div>

      <p>Drafts:</p>

      {drafts.map((draft) => {
        return (
          <div key={draft.id} className="bg-white shadow rounded p-4 flex gap-4 flex-col">
            <p>ID: {draft.id}</p>
            <p>User: {draft.userKey}</p>
            <p>Link: {draft.url}</p>

            <div className="flex gap-6 items-center">
              <span>Points</span>
              <button className="h-8 px-6 bg-blue-500 rounded text-white" onClick={() => onGetPoints(draft.userKey)}>
                Get Points
              </button>
            </div>

            {draft.points &&
              draft.points.map((point, index) => {
                return (
                  <div key={index}>
                    <p>{point.question}</p>
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
