"use client";
import { GoogleGenAI } from "@google/genai";
import { useState } from "react";

export default function Home() {
  const [niche, setNiche] = useState("");
  const [bios, setBios] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
});
 const generateBio = async () => {
  if (!niche.trim()) {
    setBios(["Please enter an Instagram niche."]);
    return;
  }
   setLoading(true);

   try {
   const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
   contents:
    "Generate 3 different creative Instagram bios for a " +
    niche +
    " creator. Maximum 150 characters. Use emojis.Return ONLY the 3 bios, each on a new line.. Do not add titles, options or explanations.",
});

    const generatedBios = (response.text ?? "").split("\n").filter(Boolean);
    setBios(generatedBios);
  } catch (error) {
  console.error(error);
  setBios(["Something went wrong. Please try again."]);
} finally {
  setLoading(false);
}
};

  const copyBio = () => {
    navigator.clipboard.writeText(bios.join("\n\n"));
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
      disabled={loading}
      className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 disabled:opacity-50"
      >
      {loading ? "Generating..." : "Generate Bio"}
     </button>

     <button
     onClick={() => {
    setNiche("");
    setBios([]);
  }}
  className="mt-3 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
   >
   Clear
   </button>

      {bios.length > 0 && (
        <>
          <div className="mt-6 p-4 bg-white rounded-lg shadow-lg w-80">
            <h2 className="font-bold text-pink-600 mb-2">Your Bio</h2>
            {bios.map((item, index) => (
           <div key={index} className="mb-4 border rounded-lg p-3">
           <p className="whitespace-pre-line text-gray-700 mb-3">{item}</p>

          <button
           onClick={() => navigator.clipboard.writeText(item)}
           className="mt-3 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900"
           >
           Copy
          </button>

          </div>
           ))}
          </div>

         
        </>
      )}
    </main>
  );
}