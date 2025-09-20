import React from "react";
import { useEffect, useState } from "react";

const Recommendation = () => {
  const [projects, setProjects] = useState([]);

  const parseRecommendations = (text) => {
    const matches = text.split(/\d+\.\s/).filter(Boolean);

    let parsed = matches.map((rec) => {
      // Cari judul di dalam **...**
      const titleMatch = rec.match(/\*\*(.*?)\*\*/);
      const title = titleMatch ? titleMatch[1].trim() : null;

      // Hapus judul (bold) dari string, sisanya deskripsi
      const description = rec
        .replace(/\*\*.*?\*\*/, "")
        .trim()
        .replace(/^:\s*/, "");

      return { title, description };
    });

    // 🔹 Buang entri kosong atau yang hanya "Recommendation"
    parsed = parsed.filter(
      (item) => item.title && item.title.toLowerCase() !== "recommendation"
    );

    return parsed;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const principal = localStorage.getItem("ii_principal");
        if (!principal) {
          console.error("❌ Principal belum ada. Pastikan user login dulu.");
          return;
        }

        // ambil semua project milik user
        const list = await window.skillsnap_backend.getProjectsByOwner(
          principal
        );

        // kumpulkan semua rekomendasi
        let allRekomendasi = [];

        (Array.isArray(list) ? list : []).forEach((project) => {
          if (
            Array.isArray(project.aiRekomendasi) &&
            project.aiRekomendasi.length > 0
          ) {
            const aiText = project.aiRekomendasi[0]; // unwrap opt text
            const parsed = parseRecommendations(aiText);
            allRekomendasi = [...allRekomendasi, ...parsed];
          }
        });
        setProjects(allRekomendasi);
      } catch (err) {
        console.error("❌ Gagal ambil projects:", err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">AI Analysis Results</h2>
      <div className="bg-slate-800 text-slate-100 rounded-xl p-6 shadow-lg">
        <h3 className="font-semibold text-lg mb-4">
          Career Recommendations Based on AI Analysis
        </h3>
        <p className="mb-4">
          Based on the provided data, here are {projects.length} suitable job
          types:
        </p>
        <ol className="space-y-4 list-decimal pl-5">
          {projects.map((p, idx) => (
            <li key={idx}>
              <p className="font-semibold mb-1">{p.title}</p>
              <p className="whitespace-pre-line">{p.description}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-slate-400">
          This analysis is based on your personality and interest data. Please
          use these recommendations as a guide in choosing a suitable career.
        </p>
      </div>
    </div>
  );
};
export default Recommendation;
