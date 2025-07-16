import React, { useState } from "react";
import {
  createActor,
  canisterId,
} from "../../../declarations/skillsnap_backend";

const skillsnap_backend = createActor(canisterId, {
  agentOptions: {
    host: "http://127.0.0.1:4943",
  },
});

export default function AI() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const kepribadianKeys = [
        "waktuLuang",
        "percayaPada",
        "gayaMasalah",
        "gayaKerja",
        "sosialEvent",
        "jenisPekerjaan",
        "pengambilanKeputusan",
        "kerjaNyaman",
        "gayaKomunikasi",
        "gayaBelajar",
      ];

      const kepribadianArray = kepribadianKeys.map(
        (key) => formData[key] || ""
      );

      const result = await skillsnap_backend.createProject(
        formData.bidangMinat || "",
        formData.aktivitasSuka || "",
        formData.toolsDikuasai || "",
        formData.kerjaTim || "",
        formData.strukturKerja || "",
        formData.tantanganStabil || "",
        formData.variasiKerja || "",
        formData.pendidikanTerakhir || "",
        formData.bersediaBelajar || "",
        formData.tipeKerja || "",
        formData.lokasiKerja || "",
        kepribadianArray
      );

      alert(`Project berhasil dibuat dengan ID: ${result}`);
    } catch (err) {
      console.error("Gagal mengirim ke backend:", err);
      alert("Gagal mengirim data.");
    }
  };
  console.log(formData); // submit logic

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Form Preferensi dan Kepribadian
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1 */}
        <fieldset className="border border-gray-700 p-4 rounded-md bg-gray-800">
          <legend className="font-semibold text-lg">
            1. Minat dan Gaya Kerja
          </legend>

          <label className="block mt-4">
            Bidang apa yang paling menarik bagi Anda?
          </label>
          <input
            name="bidangMinat"
            onChange={handleChange}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded p-2"
          />

          <label className="block mt-4">
            Aktivitas seperti apa yang Anda sukai?
          </label>
          <textarea
            name="aktivitasSuka"
            onChange={handleChange}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded p-2"
          />

          <label className="block mt-4">
            Apa saja keterampilan atau tools yang Anda kuasai?
          </label>
          <input
            name="toolsDikuasai"
            onChange={handleChange}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded p-2"
          />

          <label className="block mt-4">
            Apakah Anda lebih suka bekerja secara:
          </label>
          <div className="space-y-1 ml-2">
            {["Individu", "Tim", "Keduanya"].map((opt) => (
              <label key={opt} className="block">
                <input
                  type="radio"
                  name="kerjaTim"
                  value={opt}
                  onChange={handleChange}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>

          <label className="block mt-4">
            Apakah Anda menyukai pekerjaan yang:
          </label>
          <div className="space-y-1 ml-2">
            {["Terstruktur", "Fleksibel"].map((opt) => (
              <label key={opt} className="block">
                <input
                  type="radio"
                  name="strukturKerja"
                  value={opt}
                  onChange={handleChange}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>

          <label className="block mt-4">
            Apakah Anda menyukai tantangan atau kestabilan dalam pekerjaan?
          </label>
          <input
            name="tantanganStabil"
            onChange={handleChange}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded p-2"
          />

          <label className="block mt-4">
            Apakah Anda menyukai pekerjaan dengan:
          </label>
          <div className="space-y-1 ml-2">
            {["Banyak variasi", "Rutinitas tetap"].map((opt) => (
              <label key={opt} className="block">
                <input
                  type="radio"
                  name="variasiKerja"
                  value={opt}
                  onChange={handleChange}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Section 2 */}
        <fieldset className="border border-gray-700 p-4 rounded-md bg-gray-800">
          <legend className="font-semibold text-lg">
            2. Pendidikan dan Skill
          </legend>

          <label className="block mt-4">
            Apa latar belakang pendidikan terakhir Anda?
          </label>
          <input
            name="pendidikanTerakhir"
            onChange={handleChange}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded p-2"
          />

          <label className="block mt-4">
            Apakah Anda bersedia belajar skill baru jika diperlukan?
          </label>
          <div className="space-y-1 ml-2">
            {["Ya", "Tidak"].map((opt) => (
              <label key={opt} className="block">
                <input
                  type="radio"
                  name="bersediaBelajar"
                  value={opt}
                  onChange={handleChange}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Section 3 */}
        <fieldset className="border border-gray-700 p-4 rounded-md bg-gray-800">
          <legend className="font-semibold text-lg">3. Preferensi Kerja</legend>

          <label className="block mt-4">
            Apakah Anda ingin bekerja secara:
          </label>
          <div className="space-y-1 ml-2">
            {["Remote", "Hybrid", "Onsite"].map((opt) => (
              <label key={opt} className="block">
                <input
                  type="radio"
                  name="tipeKerja"
                  value={opt}
                  onChange={handleChange}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>

          <label className="block mt-4">
            Di mana lokasi kerja yang Anda inginkan?
          </label>
          <input
            name="lokasiKerja"
            onChange={handleChange}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded p-2"
          />
        </fieldset>

        {/* Section 4 */}
        <fieldset className="border border-gray-700 p-4 rounded-md bg-gray-800">
          <legend className="font-semibold text-lg">
            4. Kuis Kepribadian Ringan
          </legend>

          {[
            {
              q: "Saat menghabiskan waktu luang, Anda lebih suka:",
              name: "waktuLuang",
              options: ["Bersosialisasi", "Menyendiri"],
            },
            {
              q: "Anda lebih percaya pada:",
              name: "percayaPada",
              options: ["Fakta dan pengalaman nyata", "Intuisi dan inspirasi"],
            },
            {
              q: "Ketika memecahkan masalah, Anda cenderung:",
              name: "gayaMasalah",
              options: ["Logis", "Mengikuti perasaan"],
            },
            {
              q: "Gaya kerja Anda lebih dekat dengan:",
              name: "gayaKerja",
              options: ["Terencana", "Fleksibel"],
            },
            {
              q: "Saat menghadiri acara sosial, Anda:",
              name: "sosialEvent",
              options: ["Bersemangat", "Butuh waktu sendiri"],
            },
            {
              q: "Anda lebih suka pekerjaan yang:",
              name: "jenisPekerjaan",
              options: ["Mengandalkan data", "Butuh visi"],
            },
            {
              q: "Dalam membuat keputusan, Anda:",
              name: "pengambilanKeputusan",
              options: ["Berdasarkan prinsip", "Dampak ke orang lain"],
            },
            {
              q: "Saat bekerja, Anda lebih nyaman dengan:",
              name: "kerjaNyaman",
              options: ["To-do list", "Flow bebas"],
            },
            {
              q: "Dalam percakapan, Anda lebih:",
              name: "gayaKomunikasi",
              options: ["Aktif berbicara", "Pendengar dulu"],
            },
            {
              q: "Ketika belajar sesuatu, Anda:",
              name: "gayaBelajar",
              options: ["Fokus detail", "Fokus konsep besar"],
            },
          ].map((item) => (
            <div key={item.name} className="my-4">
              <label className="block mb-1">{item.q}</label>
              <div className="space-y-1 ml-2">
                {item.options.map((opt) => (
                  <label key={opt} className="block">
                    <input
                      type="radio"
                      name={item.name}
                      value={opt}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </fieldset>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
