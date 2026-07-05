"use client";
import { GoogleGenAI } from "@google/genai";
import { useState } from "react";

export default function Home() {
  const [niche, setNiche] = useState("");
  const [bio, setBio] = useState("");

  const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
});
 const generateBio = async () => {
  if (!niche.trim()) {
    setBio("Please enter an Instagram niche.");
    return;
  }

  try {
   const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents:
    "Generate ONE creative Instagram bio for a " +
    niche +
    " creator. Maximum 150 characters. Use emojis. Return ONLY the bio. Do not add titles, options or explanations.",
});

    setBio(response.text ?? "No bio generated.");
  } catch (error) {
    console.error(error);
    setBio("Something went wrong. Please try again.");
  }
};

  const copyBio = () => {
    navigator.clipboard.writeText(bio);
    alert("Bio copied!");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-6">
      <h1 className="text-5xl font-bold text-pink-600 mb-4">
        SnapConnect
      </h1>

      <p className="text-lg text-gray-700 mb-6">
        AI Instagram Bio Generator
      </p>

      <input
        type="text"
        value={niche}
        onChange={(e) => setNiche(e.target.value)}
        placeholder="Enter your Instagram niche"
        className="w-80 p-3 border-2 border-pink-500 rounded-lg mb-4 text-black bg-white"
      />

      <button
        onClick={generateBio}
        className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700"
      >
        Generate Bio
      </button>

      {bio && (
        <>
          <div className="mt-6 p-4 bg-white rounded-lg shadow-lg w-80">
            <h2 className="font-bold text-pink-600 mb-2">Your Bio</h2>
            <p className="whitespace-pre-line text-gray-700">{bio}</p>
          </div>

          <button
            onClick={copyBio}
            className="mt-4 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900"
          >
            Copy Bio
          </button>
        </>
      )}
    </main>
  );
}