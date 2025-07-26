import React, { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import AI from "../pages/AI";

const PersonalityAssessmentForm = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [errors, setErrors] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const [aiRecommendations, setAIRecommendations] = useState([]);
  const [showCertificate, setShowCertificate] = useState(false);
  const [formData, setFormData] = useState({
    // Section 1: Minat dan Gaya Kerja
    bidang: "",
    aktifitas: "",
    keterampilan: "",
    preferensiKerja: "",
    tipePekerjaan: "",
    tantangan: "",
    variasiPekerjaan: "",

    // Section 2: Pendidikan dan Skill
    pendidikan: "",
    belajarSkillBaru: "",

    // Section 3: Preferensi Kerja
    tipeTempatKerja: "",
    lokasiKerja: "",

    // Section 4: Kuis Kepribadian
    waktuLuang: "",
    kepercayaan: "",
    pemecahanMasalah: "",
    gayaKerja: "",
    acaraSosial: "",
    preferensiPekerjaan: "",
    pengambilanKeputusan: "",
    kenyamananKerja: "",
    gayaKomunikasi: "",
    gayaBelajar: "",
  });

  // Options for dropdowns
  const bidangOptions = [
    "Information Technology",
    "Creative Design",
    "Business & Management",
    "Marketing",
    "Finance",
    "Healthcare",
    "Education",
    "Others",
  ];

  const aktifitasOptions = [
    "Analyzing data",
    "Communicating with people",
    "Designing something",
    "Solving technical problems",
    "Writing content",
    "Teaching/training",
    "Strategizing business plans",
    "Collaborate in teams",
  ];

  const keterampilanOptions = [
    "Programming (JavaScript, Python, dll)",
    "Graphic Design",
    "Data Analysis",
    "Project Management",
    "Digital Marketing",
    "Creative Writing",
    "Foreign Languages",
    "Leadership and Teamwork",
  ];

  const pendidikanOptions = [
    "Senior high school",
    "D1/D2/D3",
    "D4/S1",
    "S2",
    "S3",
    "Others",
  ];

  const lokasiKerjaOptions = [
    "Jakarta",
    "Bandung",
    "Surabaya",
    "Yogyakarta",
    "Bali",
    "Medan",
    "Makassar",
    "Remote",
    "Others",
  ];

  const sections = [
    {
      title: "Interests and Work Style",
      fields: [
        {
          type: "select",
          name: "bidang",
          label: "What fields interest you most?",
          placeholder: "Choose a field of interest",
        },
        {
          type: "select",
          name: "aktifitas",
          label: "What kind of activities do you enjoy?",
          placeholder: "Choose a preferred activity",
        },
        {
          type: "select",
          name: "keterampilan",
          label: "What are your skills or tools?",
          placeholder: "Select mastered skills",
        },
        {
          type: "radio",
          name: "preferensiKerja",
          label: "Do you prefer to work in:",
          options: ["Individual", "Team", "Both"],
        },
        {
          type: "radio",
          name: "tipePekerjaan",
          label: "Do you like work that:",
          options: ["Structured", "Flexible"],
        },
        {
          type: "text",
          name: "tantangan",
          label: "Do you like challenges or stability in your work?",
          placeholder: "Explain your preferences",
        },
        {
          type: "radio",
          name: "variasiPekerjaan",
          label: "Do you like working with:",
          options: ["Lots of variety", "Fixed routine"],
        },
      ],
    },
    {
      title: "Education and Skills",
      fields: [
        {
          type: "select",
          name: "pendidikan",
          label: "What is your latest educational background?",
          placeholder: "Select education level",
        },
        {
          type: "radio",
          name: "belajarSkillBaru",
          label: "Are you willing to learn new skills if needed?",
          options: ["Yes", "No"],
        },
      ],
    },
    {
      title: "Work Preferences",
      fields: [
        {
          type: "radio",
          name: "tipeTempatKerja",
          label: "Do you want to work in a:",
          options: ["Remote", "Hybrid", "Onsite"],
        },
        {
          type: "select",
          name: "lokasiKerja",
          label: "Where do you want to work?",
          placeholder: "Select desired work location",
        },
      ],
    },
    {
      title: "Lightweight Personality Quiz",
      fields: [
        {
          type: "radio",
          name: "waktuLuang",
          label: "When spending your free time, you prefer:",
          options: ["Socialize", "Alone"],
        },
        {
          type: "radio",
          name: "kepercayaan",
          label: "You have more faith in:",
          options: ["Real facts and experiences", "Intuition and inspiration"],
        },
        {
          type: "radio",
          name: "pemecahanMasalah",
          label: "When solving problems, you tend to:",
          options: ["Logical", "Following feelings"],
        },
        {
          type: "radio",
          name: "gayaKerja",
          label: "Your working style is closer to:",
          options: ["Planned", "Flexible"],
        },
        {
          type: "radio",
          name: "acaraSosial",
          label: "When attending social events, you:",
          options: ["Excited", "Need time alone"],
        },
        {
          type: "radio",
          name: "preferensiPekerjaan",
          label: "You prefer a job that:",
          options: ["Rely on data", "Need a vision"],
        },
        {
          type: "radio",
          name: "pengambilanKeputusan",
          label: "In making decisions, you:",
          options: ["Based on principles", "Impact to others"],
        },
        {
          type: "radio",
          name: "kenyamananKerja",
          label: "When working, you are more comfortable with:",
          options: ["To-do list", "Free flow"],
        },
        {
          type: "radio",
          name: "gayaKomunikasi",
          label: "In conversation, you are more:",
          options: ["Active speaking", "Listener"],
        },
        {
          type: "radio",
          name: "gayaBelajar",
          label: "When you learn something, you:",
          options: ["Detail focus", "Big concept focus"],
        },
      ],
    },
  ];

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "radio" ? e.target.labels[0].textContent : value,
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Generate dummy results based on form data
  const generateDummyResults = () => {
    // These are completely random percentages for demonstration
    const resultData = {
      nama: formData.nama || "Nama Peserta",
      tanggal: new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      kepribadian: {
        ekstrovert: Math.floor(Math.random() * 30) + 70, // 70-100%
        introvert: 100 - Math.floor(Math.random() * 30) - 70, // 0-30%
      },
      gayaBelajar: {
        visual: Math.floor(Math.random() * 50) + 50, // 50-100%
        auditori: Math.floor(Math.random() * 80) + 20, // 20-100%
        kinestetik: Math.floor(Math.random() * 60) + 40, // 40-100%
      },
      minatKarir: {
        teknologi: Math.floor(Math.random() * 40) + 60, // 60-100%
        bisnis: Math.floor(Math.random() * 70) + 30, // 30-100%
        kreatif: Math.floor(Math.random() * 80) + 20, // 20-100%
      },
      rekomendasi: [
        "Pengembangan Perangkat Lunak",
        "Analisis Data",
        "UI/UX Design",
        "Manajemen Proyek Teknologi",
      ],
    };

    // Determine personality type
    resultData.tipeKepribadian =
      resultData.kepribadian.ekstrovert > 50 ? "Ekstrovert" : "Introvert";

    // Determine learning style
    const gayaBelajar = resultData.gayaBelajar;
    resultData.gayaBelajarDominan = Object.keys(gayaBelajar).reduce((a, b) =>
      gayaBelajar[a] > gayaBelajar[b] ? a : b
    );

    return resultData;
  };

  const [results, setResults] = useState(null);
  const [aiAnalysis, setAIAnalysis] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [certificateData, setCertificateData] = useState({
    recipientName: "",
    signature: null,
    isSigned: false,
  });
  const signatureCanvasRef = useRef(null);
  const certificateRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  //Handle analisis AI
  const handleAIAnalysis = async () => {
    try {
      const kepribadianKeys = [
        "bidang",
        "aktivitas",
        "keterampilan",
        "preferensiKerja",
        "tipePekerjaan",
        "tantangan",
        "variasiPekerjaan",
        "pendidikan",
        "belajarSkillBaru",
        "tipeTempatKerja",
        "lokasiKerja",
        "waktuLuang",
        "kepercayaan",
        "pemecahanMasalah",
        "gayaKerja",
        "acaraSosial",
        "preferensiPekerjaan",
        "pengambilanKeputusan",
        "kenyamananKerja",
        "gayaKomunikasi",
        "gayaBelajar",
      ];

      const kepribadianArray = kepribadianKeys.map(
        (key) => `${key}: ${formData[key] || ""} `
      );

      const response = await fetch("http://127.0.0.1:5000/ai/rekomendasi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          kepribadian: kepribadianArray.join("\n"),
        }),
      });

      if (!response.ok) throw new Error("Gagal mendapatkan rekomendasi AI");

      const data = await response.json();
      const hasil = data.rekomendasi;

      alert("Berhasil mendapatkan rekomendasi: ");
      console.log("Hasil analisis AI:", hasil);

      await skillsnap_backend.saveAIRecommendation(projectId, hasil);
      // const rekomendasi = await skillsnap_backend.getAIRecommendation(
      //   projectId
      // );

      setAIRecommendations(hasil);
      setShowCertificate(true);
      setAIAnalysis(hasil);
    } catch (error) {
      console.error("Error during AI analysis:", error);
      alert("Gagal mendapatkan rekomendasi AI. Silakan coba lagi.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the last section
    if (validateSection(currentSection)) {
      try {
        // Siapkan array kunci kepribadian
        const kepribadianKeys = [
          "bidang",
          "aktifitas",
          "keterampilan",
          "preferensiKerja",
          "tipePekerjaan",
          "tantangan",
          "variasiPekerjaan",
          "pendidikan",
          "belajarSkillBaru",
          "tipeTempatKerja",
          "lokasiKerja",
          "WaktuLuang",
          "kepercayaan",
          "pemecahanMasalah",
          "gayaKerja",
          "acaraSosial",
          "preferensiPekerjaan",
          "pengambilanKeputusan",
          "kenyamananKerja",
          "gayaKomunikasi",
          "gayaBelajar",
        ];

        console.log("Form data sebelum pengiriman:", formData);

        // Kirim data ke backend
        const result = await skillsnap_backend.createProject(
          formData.bidang || "",
          formData.aktifitas || "",
          formData.keterampilan || "",
          formData.preferensiKerja || "",
          formData.tipePekerjaan || "",
          formData.tantangan || "",
          formData.variasiPekerjaan || "",
          formData.pendidikan || "",
          formData.belajarSkillBaru || "",
          formData.tipeTempatKerja || "",
          formData.lokasiKerja || "",
          formData.waktuLuang || "",
          formData.kepercayaan || "",
          formData.pemecahanMasalah || "",
          formData.gayaKerja || "",
          formData.acaraSosial || "",
          formData.preferensiPekerjaan || "",
          formData.pengambilanKeputusan || "",
          formData.kenyamananKerja || "",
          formData.gayaKomunikasi || "",
          formData.gayaBelajar || ""
        );

        // Tampilkan hasil sukses
        alert(`Project berhasil dibuat dengan ID: ${result}`);
        setIsSubmitted(true);
        setProjectId(result);
        console.log("Project ID:", result);

        // Scroll ke atas
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        console.error("Gagal mengirim ke backend:", err);
        alert("Gagal mengirim data.");
      }
    } else {
      // Tampilkan error jika form belum valid
      showErrorNotification("Harap lengkapi semua field yang wajib diisi");
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
  };

  const validateSection = (sectionIndex) => {
    const currentSectionFields = sections[sectionIndex].fields;
    const newErrors = {};
    let isValid = true;

    currentSectionFields.forEach((field) => {
      if (!formData[field.name] || formData[field.name].trim() === "") {
        newErrors[field.name] = `Harap isi ${field.label.toLowerCase()}`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const showErrorNotification = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  const handleDeleteForm = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDeleteForm = () => {
    // Reset all form data
    setFormData({
      bidang: "",
      aktifitas: "",
      keterampilan: "",
      preferensiKerja: "",
      tipePekerjaan: "",
      tantangan: "",
      variasiPekerjaan: "",
      pendidikan: "",
      belajarSkillBaru: "",
      tipeTempatKerja: "",
      lokasiKerja: "",
      waktuLuang: "",
      kepercayaan: "",
      pemecahanMasalah: "",
      gayaKerja: "",
      acaraSosial: "",
      preferensiPekerjaan: "",
      pengambilanKeputusan: "",
      kenyamananKerja: "",
      gayaKomunikasi: "",
      gayaBelajar: "",
    });
    setCurrentSection(0);
    setShowDeleteConfirm(false);
    setShowResults(false);

    // Show success notification
    setNotificationMessage("Formulir berhasil dihapus");
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const nextSection = () => {
    if (validateSection(currentSection)) {
      if (currentSection < sections.length - 1) {
        setCurrentSection(currentSection + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      showErrorNotification("Harap lengkapi semua field yang wajib diisi");
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderField = (field) => {
    // Render dropdown for select type
    if (field.type === "select") {
      let options = [];
      let placeholder = "Choose...";

      switch (field.name) {
        case "bidang":
          options = bidangOptions;
          break;
        case "aktifitas":
          options = aktifitasOptions;
          break;
        case "keterampilan":
          options = keterampilanOptions;
          break;
        case "pendidikan":
          options = pendidikanOptions;
          break;
        case "lokasiKerja":
          options = lokasiKerjaOptions;
          break;
        default:
          options = [];
      }

      return (
        <div className="mb-8 transition-all duration-300 ease-in-out">
          <label className="block text-gray-200 text-sm font-light mb-2 tracking-wide">
            {field.label}
          </label>
          <select
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleSelectChange}
            className={getFieldClasses(
              field.name,
              "w-full px-4 py-3 bg-gray-800/50 border-b border-gray-600 text-white focus:outline-none focus:border-cyan-400 transition-colors duration-200"
            )}
          >
            <option value="">{placeholder}</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
    }

    // Render radio buttons
    if (field.type === "radio") {
      return (
        <div className="mb-8 transition-all duration-300 ease-in-out">
          <p className="block text-gray-200 text-sm font-light mb-4 tracking-wide">
            {field.label}
          </p>
          <div className="space-y-3">
            {field.options.map((option, idx) => (
              <label
                key={idx}
                className="flex items-center group cursor-pointer"
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-colors ${
                    formData[field.name] === option
                      ? "border-cyan-400"
                      : "border-gray-500 group-hover:border-cyan-400"
                  }`}
                >
                  {formData[field.name] === option && (
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
                  )}
                </div>
                <span className="text-gray-200 group-hover:text-white transition-colors">
                  {option}
                </span>
                <input
                  type="radio"
                  name={field.name}
                  checked={formData[field.name] === option}
                  onChange={handleChange}
                  className="absolute opacity-0 w-0 h-0"
                />
              </label>
            ))}
          </div>
        </div>
      );
    }

    // Default text input
    return (
      <div className="mb-8 transition-all duration-300 ease-in-out">
        <label className="block text-gray-200 text-sm font-light mb-2 tracking-wide">
          {field.label}
        </label>
        <input
          type="text"
          name={field.name}
          value={formData[field.name] || ""}
          onChange={handleChange}
          className={getFieldClasses(
            field.name,
            "w-full px-4 py-3 bg-gray-800/50 border-b border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors duration-200"
          )}
          placeholder={field.placeholder}
        />
        {errors[field.name] && (
          <p className="mt-1 text-sm text-red-400">{errors[field.name]}</p>
        )}
      </div>
    );
  };

  // Function to handle certificate download
  const handleDownloadCertificate = () => {
    // Exit edit mode before downloading
    if (isEditing) {
      setIsEditing(false);

      // Small delay to ensure the UI updates before capturing
      setTimeout(() => {
        captureAndDownload();
      }, 100);
    } else {
      captureAndDownload();
    }
  };

  const captureAndDownload = () => {
    // Add a small delay to ensure the certificate is fully rendered
    setTimeout(() => {
      if (certificateRef.current) {
        html2canvas(certificateRef.current, {
          scale: 2, // Higher scale for better quality
          useCORS: true,
          logging: false,
          backgroundColor: null,
          ignoreElements: (element) => {
            // Ignore edit controls in the final download
            return (
              element.classList &&
              (element.classList.contains("edit-controls") ||
                element.classList.contains("edit-button"))
            );
          },
        }).then((canvas) => {
          // Convert canvas to blob
          canvas.toBlob((blob) => {
            const name =
              certificateData.recipientName || formData.nama || "sertifikat";
            saveAs(
              blob,
              `sertifikat-ai-${name.replace(/\s+/g, "-").toLowerCase()}.png`
            );
          }, "image/png");
        });
      }
    }, 500);
  };

  // Handle signature drawing
  const startDrawing = (e) => {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setLastX(x);
    setLastY(y);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = signatureCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = "#1a365d";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    setLastX(x);
    setLastY(y);

    // Mark as signed when drawing starts
    if (!certificateData.isSigned) {
      setCertificateData((prev) => ({
        ...prev,
        isSigned: true,
      }));
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);

    // Save the signature as data URL
    if (signatureCanvasRef.current) {
      const signatureData = signatureCanvasRef.current.toDataURL();
      setCertificateData((prev) => ({
        ...prev,
        signature: signatureData,
      }));
    }
  };

  const clearSignature = () => {
    const canvas = signatureCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setCertificateData((prev) => ({
        ...prev,
        signature: null,
        isSigned: false,
      }));
    }
  };

  // Certificate component
  const Certificate = ({ results }) => {
    if (!results) return null;

    const recipientName =
      certificateData.recipientName || results.nama || "Nama Penerima";

    // If in edit mode, initialize the canvas when component mounts
    React.useEffect(() => {
      if (
        isEditing &&
        signatureCanvasRef.current &&
        certificateData.signature
      ) {
        const canvas = signatureCanvasRef.current;
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = certificateData.signature;
      }
    }, [isEditing]);

    {
      return (
        <div
          className="bg-white p-8 rounded-xl shadow-2xl max-w-4xl mx-auto my-8 border-2 border-blue-100"
          ref={certificateRef}
        >
          {/* //tampilan hasil analisis AI */}
          {showCertificate && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">
                AI Analysis Results
              </h2>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-600 shadow-lg">
                <h3 className="text-lg font-bold text-white mb-4">
                  Career Recommendations Based on AI Analysis
                </h3>
                <div className="space-y-4 text-gray-100 whitespace-pre-wrap leading-relaxed">
                  {aiRecommendations
                    .split(/\n{2,}/) // Pisah tiap paragraf berdasarkan 2 enter
                    .map((paragraph, index) => (
                      <p key={index}>{paragraph.trim()}</p>
                    ))}
                </div>
                <p className="text-gray-400 text-sm mt-4">
                  This analysis is based on your personality and interest data.
                  Please use these recommendations as a guide in choosing a
                  suitable career.
                </p>
              </div>
            </div>
          )}

          {/* Certificate Header with Decorative Elements */}
          {/* <div
            className="relative
          before:absolute before:top-0 before:left-0 before:w-16 before:h-16 before:border-t-2 before:border-l-2 before:border-blue-300 before:rounded-tl-lg
          after:absolute after:top-0 after:right-0 after:w-16 after:h-16 after:border-t-2 after:border-r-2 after:border-blue-300 after:rounded-tr-lg"
          >
            <div className="text-center mb-8">
              <div className="flex justify-center mb-2">
                <img
                  src="/images/com.png"
                  alt="SkillSnap Logo"
                  className="h-16 w-auto"
                />
              </div>
              <h1 className="text-4xl font-bold text-blue-800 mb-2">
                SERTIFIKAT ANALISIS AI
              </h1>
              <p className="text-gray-600 text-lg">Diberikan Kepada:</p>
              {isEditing ? (
                <div className="relative">
                  <input
                    type="text"
                    value={certificateData.recipientName || results.nama || ""}
                    onChange={(e) =>
                      setCertificateData((prev) => ({
                        ...prev,
                        recipientName: e.target.value,
                      }))
                    }
                    className="text-3xl font-semibold text-blue-700 my-3 font-serif italic text-center bg-transparent border-b-2 border-blue-300 focus:outline-none focus:border-blue-500"
                    placeholder="Nama Penerima"
                  />
                  <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </div>
                </div>
              ) : (
                <h2
                  className="text-3xl font-semibold text-blue-700 my-3 font-serif italic cursor-pointer hover:bg-blue-50 px-2 py-1 rounded"
                  onClick={() => setIsEditing(true)}
                >
                  {recipientName}
                </h2>
              )}
              <div className="w-48 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mx-auto my-4 rounded-full"></div>
              <p className="text-gray-600 text-sm mt-2">
                Atas partisipasi dan penyelesaian analisis kepribadian dan minat
                karir
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Profil Kepribadian
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Tipe Kepribadian</p>
                  <p className="text-lg font-medium">
                    {results.tipeKepribadian}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full"
                      style={{ width: `${results.kepribadian.ekstrovert}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Ekstrovert: {results.kepribadian.ekstrovert}% | Introvert:{" "}
                    {results.kepribadian.introvert}%
                  </p>
                </div>

                <div>
                  <p className="text-gray-600">Gaya Belajar Dominan</p>
                  <p className="text-lg font-medium capitalize">
                    {results.gayaBelajarDominan}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Rekomendasi Karir
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.rekomendasi.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-700/30 backdrop-blur-sm p-4 rounded-lg border border-gray-600/50 hover:border-cyan-400/50 transition-colors"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center mr-3">
                        <span className="text-cyan-400 font-medium">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{item}</h4>
                        <p className="text-gray-400 text-sm mt-1">
                          Kesesuaian: {Math.floor(Math.random() * 30) + 70}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-200 text-center relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-4">
              <span className="text-gray-500 text-sm bg-white px-2">
                STAMP & SEAL
              </span>
            </div>

            <p className="text-gray-700 mb-6">
              Telah berhasil menyelesaikan analisis kepribadian dan minat karir
              berbasis AI
            </p>

            <div className="flex flex-col items-center space-y-2">
              <p className="text-gray-500 text-sm">
                Dikeluarkan pada: {results.tanggal}
              </p>
              <p className="text-gray-500 text-sm">
                Nomor Sertifikat: SN-
                {Math.random().toString(36).substring(2, 10).toUpperCase()}
              </p>
            </div>

            <div className="mt-8 flex justify-center space-x-12">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full border-4 border-blue-100 p-1 mx-auto mb-2 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                    <div className="text-center">
                      <img
                        src="/images/com.png"
                        alt="Stempel Resmi SkillSnap"
                        className="h-16 w-auto mx-auto mb-1"
                      />
                      <span className="text-xs font-medium text-blue-700">
                        STAMP & SEAL
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 font-medium">
                  Stempel Resmi
                </p>
                <p className="text-xs text-gray-500">SkillSnap</p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 p-1 mx-auto mb-2 flex items-center justify-center overflow-hidden">
                  {isEditing ? (
                    <div className="relative w-full h-full">
                      <canvas
                        ref={signatureCanvasRef}
                        width={200}
                        height={200}
                        className="absolute top-0 left-0 w-full h-full rounded-full bg-white"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={(e) => {
                          e.preventDefault();
                          startDrawing(e.touches[0]);
                        }}
                        onTouchMove={(e) => {
                          e.preventDefault();
                          draw(e.touches[0]);
                        }}
                        onTouchEnd={stopDrawing}
                      />
                      {!certificateData.isSigned && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm text-gray-400 text-center px-2">
                            Tanda tangan di sini
                          </span>
                        </div>
                      )}
                    </div>
                  ) : certificateData.signature ? (
                    <img
                      src={certificateData.signature}
                      alt="Tanda Tangan"
                      className="w-full h-full object-contain bg-white rounded-full"
                      onClick={() => setIsEditing(true)}
                    />
                  ) : (
                    <div
                      className="w-full h-full rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center cursor-pointer"
                      onClick={() => setIsEditing(true)}
                    >
                      <div className="text-center">
                        <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <span className="text-4xl font-bold text-gray-400">
                            TTD
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          Klik untuk menandatangani
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 font-medium">Penerima</p>
                <p className="text-xs text-gray-500">
                  {isEditing ? (
                    <button
                      onClick={clearSignature}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      Hapus Tanda Tangan
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-blue-500 hover:text-blue-700 text-xs"
                    >
                      {certificateData.isSigned
                        ? "Edit Tanda Tangan"
                        : "Tambah Tanda Tangan"}
                    </button>
                  )}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Sertifikat ini diterbitkan secara digital dan dapat diverifikasi
                melalui sistem kami
              </p>
              <p className="text-xs text-blue-500 mt-1">
                www.skillsnap.id/verify
              </p>
            </div>
          </div>

          <style jsx global>{`
            @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap");

            .font-serif {
              font-family: "Playfair Display", serif;
            }
          `}</style> */}
        </div>
      );
    }
  };

  // Notification component
  const Notification = () => {
    if (!showNotification) return null;

    return (
      <div className="fixed bottom-6 right-6 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 z-50 animate-fade-in-up">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          ></path>
        </svg>
        <span>{notificationMessage}</span>
      </div>
    );
  };

  // Delete Confirmation Modal
  const DeleteConfirmation = () => {
    if (!showDeleteConfirm) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-red-500/30">
          <div className="flex items-center mb-4">
            <div className="bg-red-500/20 p-2 rounded-full mr-3">
              <svg
                className="w-6 h-6 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">Hapus Formulir</h3>
          </div>
          <p className="text-gray-300 mb-6">
            Apakah Anda yakin ingin menghapus semua jawaban yang sudah diisi?
            Tindakan ini tidak dapat dibatalkan.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-4 py-2 text-gray-300 hover:text-white font-medium"
            >
              Batal
            </button>
            <button
              onClick={confirmDeleteForm}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center"
            >
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
              Hapus
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Add error styles to form fields
  const getFieldClasses = (fieldName, baseClasses) => {
    return errors[fieldName]
      ? `${baseClasses} border-red-500 focus:border-red-500`
      : baseClasses;
  };

  // Render the results component
  const renderResults = () => {
    if (!aiAnalysis) return null;
    //
    return (
      <div className="max-w-4xl mx-auto my-12 px-4 sm:px-6">
        <Certificate results={aiAnalysis} />
        <div className="text-center mt-8">
          <button
            onClick={handleDownloadCertificate}
            className="px-8 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium rounded-lg tracking-wide hover:opacity-90 transition-all active:scale-95 flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
            Download Certificate
          </button>
        </div>
      </div>
    );
  };
  // Render the main component

  return (
    <div className="min-h-screen py-12 md:py-16 relative">
      <Notification />
      <DeleteConfirmation />
      {/* Tampilkan hasil analisis jika sudah selesai */}
      {showCertificate ? (
        renderResults()
      ) : (
        // Formulir input jika belum ada hasil
        <div className="max-w-2xl mx-auto my-12 px-4 sm:px-6">
          <div className="text-center mb-12 transition-all duration-500 ease-out">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-tight">
              Preferences & Personality
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400 text-sm tracking-wide">
              Part {currentSection + 1} of {sections.length}
            </p>
          </div>

          <div
            key={currentSection}
            className="bg-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-xl transition-all duration-500 ease-out transform hover:scale-[1.01] hover:shadow-2xl hover:border-cyan-400/30"
          >
            <h2 className="text-2xl font-bold text-white mb-6 pb-2 border-b border-gray-700">
              {sections[currentSection].title}
            </h2>

            <form onSubmit={handleSubmit}>
              {sections[currentSection].fields.map((field, index) => (
                <div key={index} className="mb-8">
                  {renderField(field)}
                </div>
              ))}

              <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-700">
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={handleDeleteForm}
                    className="px-4 py-2 text-red-400 hover:text-red-300 font-medium flex items-center transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                    Delete
                  </button>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={prevSection}
                    disabled={currentSection === 0}
                    className={`px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 ${
                      currentSection === 0
                        ? "text-gray-500 cursor-not-allowed"
                        : "text-white hover:text-cyan-400"
                    }`}
                  >
                    Previous
                  </button>

                  {currentSection < sections.length - 1 ? (
                    <button
                      type="button"
                      onClick={nextSection}
                      className="px-8 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium rounded-lg tracking-wide hover:opacity-90 transition-all active:scale-95"
                    >
                      Next
                    </button>
                  ) : !isSubmitted ? (
                    <button
                      type="submit"
                      className="px-8 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium rounded-lg tracking-wide hover:opacity-90 transition-all active:scale-95 flex items-center"
                    >
                      Submit
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleAIAnalysis}
                      className="px-8 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium rounded-lg tracking-wide hover:opacity-90 transition-all active:scale-95 flex items-center"
                    >
                      Work Recommendations
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalityAssessmentForm;
