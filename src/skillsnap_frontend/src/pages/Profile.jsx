import React, { useEffect, useState, useRef } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaHome, FaPencilAlt, FaPlus, FaMapMarkerAlt, FaGlobe, FaCamera, FaTrash } from "react-icons/fa";

const Profile = () => {
  const [principal, setPrincipal] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Profile states
  const [name, setName] = useState("Jane Doe");
  const [bio, setBio] = useState("Lorem ipsum dolor sit amet consectetur. Scelerisque quam amet vel nulla. In tristique cursus. Suspendisse massa nisl mauris sem et velit.");
  const [location, setLocation] = useState("Bandung, West Java, Indonesia");
  const [website, setWebsite] = useState("https://example.web");
  const [profilePic, setProfilePic] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);

  // Experience states
  const [experiences, setExperiences] = useState([
    { title: "Web3 Developer", company: "Web3 Company • Internship", date: "Sep 2024 - Sep 2025 • 1yr" },
    { title: "Web3 Developer", company: "Web3 Company • Internship", date: "Sep 2024 - Sep 2025 • 1yr" },
    { title: "Web3 Developer", company: "Web3 Company • Internship", date: "Sep 2024 - Sep 2025 • 1yr" },
    { title: "Web3 Developer", company: "Web3 Company • Internship", date: "Sep 2024 - Sep 2025 • 1yr" },
  ]);
  const [editingExpIndex, setEditingExpIndex] = useState(-1);
  const [showingAddExp, setShowingAddExp] = useState(false);
  const [tempExp, setTempExp] = useState({ title: "", company: "", date: "" });

  // Education states
  const [educations, setEducations] = useState([
    { title: "High School", major: "Science", date: "Sep 2024 - Sep 2025 • 1yr" },
    { title: "High School", major: "Science", date: "Sep 2024 - Sep 2025 • 1yr" },
  ]);
  const [editingEduIndex, setEditingEduIndex] = useState(-1);
  const [showingAddEdu, setShowingAddEdu] = useState(false);
  const [tempEdu, setTempEdu] = useState({ title: "", major: "", date: "" });

  // Save profile data to localStorage
  const saveProfileToStorage = () => {
    localStorage.setItem("profile_name", name);
    localStorage.setItem("profile_bio", bio);
    localStorage.setItem("profile_location", location);
    localStorage.setItem("profile_website", website);
    if (profilePic) {
      localStorage.setItem("profile_pic", profilePic);
    }
  };

  // Save experiences to localStorage
  const saveExperiencesToStorage = (newExperiences) => {
    localStorage.setItem("profile_experiences", JSON.stringify(newExperiences));
  };

  // Save educations to localStorage
  const saveEducationsToStorage = (newEducations) => {
    localStorage.setItem("profile_educations", JSON.stringify(newEducations));
  };

  useEffect(() => {
    const iiPrincipal = localStorage.getItem("ii_principal");
    const storedToken = localStorage.getItem("token");

    // Load profile data from localStorage
    const storedName = localStorage.getItem("profile_name");
    const storedBio = localStorage.getItem("profile_bio");
    const storedLocation = localStorage.getItem("profile_location");
    const storedWebsite = localStorage.getItem("profile_website");
    const storedProfilePic = localStorage.getItem("profile_pic");
    const storedExperiences = localStorage.getItem("profile_experiences");
    const storedEducations = localStorage.getItem("profile_educations");

    if (iiPrincipal) {
      setPrincipal(iiPrincipal);
    }
    if (storedToken) {
      setToken(storedToken);
    }
    
    // Set profile data if exists in localStorage
    if (storedName) setName(storedName);
    if (storedBio) setBio(storedBio);
    if (storedLocation) setLocation(storedLocation);
    if (storedWebsite) setWebsite(storedWebsite);
    if (storedProfilePic) setProfilePic(storedProfilePic);
    
    // Load experiences and educations
    if (storedExperiences) {
      try {
        setExperiences(JSON.parse(storedExperiences));
      } catch (e) {
        console.error("Error parsing experiences:", e);
      }
    }
    
    if (storedEducations) {
      try {
        setEducations(JSON.parse(storedEducations));
      } catch (e) {
        console.error("Error parsing educations:", e);
      }
    }
    
    setLoading(false);
  }, []);

  const handleLogout = async () => {
    if (window.confirm("Apakah Anda yakin ingin logout?")) {
      setLoading(true);
      const authClient = await AuthClient.create();

      if (principal) {
        await authClient.logout();
        localStorage.removeItem("ii_principal");
      }

      if (token) {
        localStorage.removeItem("token");
      }

      // Clear profile data
      localStorage.removeItem("profile_name");
      localStorage.removeItem("profile_bio");
      localStorage.removeItem("profile_location");
      localStorage.removeItem("profile_website");
      localStorage.removeItem("profile_pic");
      localStorage.removeItem("profile_experiences");
      localStorage.removeItem("profile_educations");

      setLoading(false);
      navigate("/");
    }
  };

  const handleGoHome = () => {
    navigate("/home");
  };

  // Profile edit functions
  const startEditingProfile = () => {
    setEditingProfile(true);
  };

  const saveProfile = () => {
    setEditingProfile(false);
    saveProfileToStorage();
  };

  const handleProfilePicChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setProfilePic(imageUrl);
        localStorage.setItem("profile_pic", imageUrl);
      };
      
      reader.readAsDataURL(file);
    }
  };

  // Experience functions
  const startEditExp = (index) => {
    setTempExp({ ...experiences[index] });
    setEditingExpIndex(index);
  };

  const startAddExp = () => {
    setTempExp({ title: "", company: "", date: "" });
    setShowingAddExp(true);
  };

  const saveEditExp = () => {
    if (editingExpIndex !== -1) {
      const newExps = [...experiences];
      newExps[editingExpIndex] = tempExp;
      setExperiences(newExps);
      saveExperiencesToStorage(newExps);
      setEditingExpIndex(-1);
    }
  };

  const saveAddExp = () => {
    const newExps = [...experiences, tempExp];
    setExperiences(newExps);
    saveExperiencesToStorage(newExps);
    setShowingAddExp(false);
  };

  const cancelEditExp = () => {
    setEditingExpIndex(-1);
    setShowingAddExp(false);
  };

  const handleDeleteExp = (index) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pengalaman ini?")) {
      const newExps = experiences.filter((_, i) => i !== index);
      setExperiences(newExps);
      saveExperiencesToStorage(newExps);
    }
  };

  // Education functions
  const startEditEdu = (index) => {
    setTempEdu({ ...educations[index] });
    setEditingEduIndex(index);
  };

  const startAddEdu = () => {
    setTempEdu({ title: "", major: "", date: "" });
    setShowingAddEdu(true);
  };

  const saveEditEdu = () => {
    if (editingEduIndex !== -1) {
      const newEdus = [...educations];
      newEdus[editingEduIndex] = tempEdu;
      setEducations(newEdus);
      saveEducationsToStorage(newEdus);
      setEditingEduIndex(-1);
    }
  };

  const saveAddEdu = () => {
    const newEdus = [...educations, tempEdu];
    setEducations(newEdus);
    saveEducationsToStorage(newEdus);
    setShowingAddEdu(false);
  };

  const cancelEditEdu = () => {
    setEditingEduIndex(-1);
    setShowingAddEdu(false);
  };

  const handleDeleteEdu = (index) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pendidikan ini?")) {
      const newEdus = educations.filter((_, i) => i !== index);
      setEducations(newEdus);
      saveEducationsToStorage(newEdus);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header with background */}
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb')" }}
        />
        <div className="absolute inset-0 bg-black/70" /> {/* Dark overlay */}
        <div className="relative z-10 max-w-4xl mx-auto p-4 sm:p-6">
          {/* Profile Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-start">
            <div className="flex flex-col sm:flex-row sm:items-start">
              <div className="relative mx-auto sm:mx-0">
                {profilePic ? (
                  <img src={profilePic} alt="Profile" className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover" />
                ) : (
                  <FaUserCircle className="text-7xl sm:text-9xl text-gray-300" />
                )}
                <div
                  className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer"
                  onClick={() => fileInputRef.current.click()}
                >
                  <FaCamera className="text-black" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleProfilePicChange}
                />
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                {editingProfile ? (
                  <input
                    className="text-2xl sm:text-3xl font-bold bg-transparent border-b border-gray-400 w-full text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  <h1 className="text-2xl sm:text-3xl font-bold">{name}</h1>
                )}
                <p className="text-base sm:text-lg mt-1 break-words">
                  {principal || token || "0xDc16b...648Aa"}
                </p>
                {editingProfile ? (
                  <textarea
                    className="mt-2 bg-transparent border-b border-gray-400 w-full text-gray-300"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                ) : (
                  <p className="mt-2 text-gray-300">{bio}</p>
                )}
                <div className="flex flex-col sm:flex-row sm:items-center mt-2 text-gray-300">
                  <div className="flex items-center justify-center sm:justify-start mb-2 sm:mb-0">
                    <FaMapMarkerAlt className="mr-2" />
                    {editingProfile ? (
                      <input
                        className="bg-transparent border-b border-gray-400 flex-1"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    ) : (
                      <span>{location}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-center sm:justify-start sm:ml-4">
                    <FaGlobe className="mr-2" />
                    {editingProfile ? (
                      <input
                        className="bg-transparent border-b border-gray-400 flex-1"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    ) : (
                      <a href={website} className="hover:underline">{website}</a>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <FaPencilAlt className="cursor-pointer text-gray-300 hover:text-white mt-4 sm:mt-0 mx-auto sm:mx-0" onClick={startEditingProfile} />
          </div>
          {editingProfile && (
            <button
              onClick={saveProfile}
              className="w-full py-2 px-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
            >
              Save Profile
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        {/* Login Info */}
        {loading ? (
          <p className="text-center text-gray-300">Memuat profil...</p>
        ) : principal ? (
          <div className="mb-8 p-4 bg-gray-800 rounded-lg">
            <p>
              <strong>Metode Login:</strong> Internet Identity
            </p>
            <p className="break-words mt-2">
              <strong>Principal:</strong> {principal}
            </p>
          </div>
        ) : token ? (
          <div className="mb-8 p-4 bg-gray-800 rounded-lg">
            <p>
              <strong>Metode Login:</strong> Token
            </p>
            <p className="break-words mt-2">
              <strong>Token:</strong> {token}
            </p>
          </div>
        ) : (
          <p className="text-red-500 text-center mb-8">❌ Belum login</p>
        )}

        {/* Sections */}
        <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0 mb-8">
          {/* Experience Section */}
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h2 className="text-xl sm:text-2xl font-bold">Experience</h2>
              <div className="flex space-x-2">
                <FaPlus className="cursor-pointer" onClick={startAddExp} />
              </div>
            </div>
            <div className="mt-4 relative pl-6 before:absolute before:left-3 before:top-0 before:bottom-0 before:w-0.5 before:bg-purple-500">
              {experiences.map((exp, index) => (
                <div key={index} className="mb-4 flex items-center">
                  <div className="absolute left-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="ml-8 w-full">
                    {editingExpIndex === index ? (
                      <div>
                        <input
                          className="font-bold bg-transparent border-b border-gray-400 w-full text-white"
                          value={tempExp.title}
                          onChange={(e) => setTempExp({ ...tempExp, title: e.target.value })}
                          placeholder="Title"
                        />
                        <input
                          className="text-gray-300 bg-transparent border-b border-gray-400 w-full"
                          value={tempExp.company}
                          onChange={(e) => setTempExp({ ...tempExp, company: e.target.value })}
                          placeholder="Company"
                        />
                        <input
                          className="text-gray-300 bg-transparent border-b border-gray-400 w-full"
                          value={tempExp.date}
                          onChange={(e) => setTempExp({ ...tempExp, date: e.target.value })}
                          placeholder="Date"
                        />
                        <div className="flex space-x-2 mt-2">
                          <button onClick={saveEditExp} className="px-2 py-1 bg-green-600 rounded">
                            Save
                          </button>
                          <button onClick={cancelEditExp} className="px-2 py-1 bg-red-600 rounded">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">{exp.title}</h3>
                          <p className="text-gray-300">{exp.company}</p>
                          <p className="text-gray-300">{exp.date}</p>
                        </div>
                        <div className="flex space-x-2">
                          <FaPencilAlt
                            className="cursor-pointer text-gray-400 hover:text-white"
                            onClick={() => startEditExp(index)}
                          />
                          <FaTrash
                            className="cursor-pointer text-gray-400 hover:text-white"
                            onClick={() => handleDeleteExp(index)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {showingAddExp && (
                <div className="mb-4 flex items-center">
                  <div className="absolute left-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="ml-8 w-full">
                    <input
                      className="font-bold bg-transparent border-b border-gray-400 w-full text-white"
                      value={tempExp.title}
                      onChange={(e) => setTempExp({ ...tempExp, title: e.target.value })}
                      placeholder="Title"
                    />
                    <input
                      className="text-gray-300 bg-transparent border-b border-gray-400 w-full"
                      value={tempExp.company}
                      onChange={(e) => setTempExp({ ...tempExp, company: e.target.value })}
                      placeholder="Company"
                    />
                    <input
                      className="text-gray-300 bg-transparent border-b border-gray-400 w-full"
                      value={tempExp.date}
                      onChange={(e) => setTempExp({ ...tempExp, date: e.target.value })}
                      placeholder="Date"
                    />
                    <div className="flex space-x-2 mt-2">
                      <button onClick={saveAddExp} className="px-2 py-1 bg-green-600 rounded">
                        Add
                      </button>
                      <button onClick={cancelEditExp} className="px-2 py-1 bg-red-600 rounded">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Education Section */}
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h2 className="text-xl sm:text-2xl font-bold">Education</h2>
              <div className="flex space-x-2">
                <FaPlus className="cursor-pointer" onClick={startAddEdu} />
              </div>
            </div>
            <div className="mt-4 relative pl-6 before:absolute before:left-3 before:top-0 before:bottom-0 before:w-0.5 before:bg-purple-500">
              {educations.map((edu, index) => (
                <div key={index} className="mb-4 flex items-center">
                  <div className="absolute left-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="ml-8 w-full">
                    {editingEduIndex === index ? (
                      <div>
                        <input
                          className="font-bold bg-transparent border-b border-gray-400 w-full text-white"
                          value={tempEdu.title}
                          onChange={(e) => setTempEdu({ ...tempEdu, title: e.target.value })}
                          placeholder="Title"
                        />
                        <input
                          className="text-gray-300 bg-transparent border-b border-gray-400 w-full"
                          value={tempEdu.major}
                          onChange={(e) => setTempEdu({ ...tempEdu, major: e.target.value })}
                          placeholder="Major"
                        />
                        <input
                          className="text-gray-300 bg-transparent border-b border-gray-400 w-full"
                          value={tempEdu.date}
                          onChange={(e) => setTempEdu({ ...tempEdu, date: e.target.value })}
                          placeholder="Date"
                        />
                        <div className="flex space-x-2 mt-2">
                          <button onClick={saveEditEdu} className="px-2 py-1 bg-green-600 rounded">
                            Save
                          </button>
                          <button onClick={cancelEditEdu} className="px-2 py-1 bg-red-600 rounded">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">{edu.title}</h3>
                          <p className="text-gray-300">{edu.major}</p>
                          <p className="text-gray-300">{edu.date}</p>
                        </div>
                        <div className="flex space-x-2">
                          <FaPencilAlt
                            className="cursor-pointer text-gray-400 hover:text-white"
                            onClick={() => startEditEdu(index)}
                          />
                          <FaTrash
                            className="cursor-pointer text-gray-400 hover:text-white"
                            onClick={() => handleDeleteEdu(index)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {showingAddEdu && (
                <div className="mb-4 flex items-center">
                  <div className="absolute left-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="ml-8 w-full">
                    <input
                      className="font-bold bg-transparent border-b border-gray-400 w-full text-white"
                      value={tempEdu.title}
                      onChange={(e) => setTempEdu({ ...tempEdu, title: e.target.value })}
                      placeholder="Title"
                    />
                    <input
                      className="text-gray-300 bg-transparent border-b border-gray-400 w-full"
                      value={tempEdu.major}
                      onChange={(e) => setTempEdu({ ...tempEdu, major: e.target.value })}
                      placeholder="Major"
                    />
                    <input
                      className="text-gray-300 bg-transparent border-b border-gray-400 w-full"
                      value={tempEdu.date}
                      onChange={(e) => setTempEdu({ ...tempEdu, date: e.target.value })}
                      placeholder="Date"
                    />
                    <div className="flex space-x-2 mt-2">
                      <button onClick={saveAddEdu} className="px-2 py-1 bg-green-600 rounded">
                        Add
                      </button>
                      <button onClick={cancelEditEdu} className="px-2 py-1 bg-red-600 rounded">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <button
          onClick={handleGoHome}
          className="w-full mt-8 py-2 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition flex items-center justify-center"
          disabled={loading}
        >
          <FaHome className="mr-2" /> Kembali ke Home
        </button>

        <button
          onClick={handleLogout}
          className="w-full mt-4 py-2 px-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition flex items-center justify-center"
          disabled={loading}
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;