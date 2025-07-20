import React, { useEffect, useState } from "react";
import {
  createActor,
  canisterId,
} from "../../../declarations/skillsnap_backend";

const skillsnap_backend = createActor(canisterId, {
  agentOptions: {
    host: "http://127.0.0.1:4943",
  },
});

function RecommendationFetcher() {
  const [projectId, setProjectId] = useState("");
  const [hasil, setHasil] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = parseInt(projectId);
      const response = await skillsnap_backend.getAIRecommendation(id);
      if (response && response.length > 0) {
        setHasil(response[0]);
      } else {
        setHasil("Tidak ada rekomendasi untuk ID ini.");
      }
    } catch (error) {
      console.error("Gagal mengambil rekomendasi:", error);
      setHasil("Terjadi kesalahan.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6">
        Cari Rekomendasi AI berdasarkan Project ID
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
      >
        <input
          type="number"
          placeholder="Masukkan Project ID"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          Lihat Rekomendasi
        </button>
      </form>

      <div className="bg-gray-800 p-4 rounded shadow-inner">
        <p className="whitespace-pre-line">{hasil}</p>
      </div>
    </div>
  );
}

export default RecommendationFetcher;
