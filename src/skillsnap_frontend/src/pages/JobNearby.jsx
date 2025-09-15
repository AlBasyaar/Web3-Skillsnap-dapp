import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Heart, ArrowLeft, Info, X, Building2, Briefcase, DollarSign, Calendar, Linkedin, Twitter } from 'lucide-react';

const ApplyModal = ({ onAccept, onDecline }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-[300px] relative shadow-lg">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
          onClick={onDecline}
        >
          <X size={20} />
        </button>
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 overflow-hidden">
            <img
              src="https://res.cloudinary.com/dr5pehdsw/image/upload/v1755964466/2a3f28b656447dc9b192edceafe69067c2432b7b_bbmzm2.png"
              alt="Info"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold text-white mb-2">Before You Apply</h2>
          <p className="text-gray-300 text-sm mb-6">
            This action will collect your wallet address and certificate ID.
          </p>
          <div className="flex gap-3 w-full">
            <button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm"
              onClick={onAccept}
            >
              Accept
            </button>
            <button
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm"
              onClick={onDecline}
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobDetails = ({ job, onBack }) => {
  const [showModal, setShowModal] = useState(false);

  const handleApply = () => {
    setShowModal(true);
  };

  const handleAccept = () => {
    setShowModal(false);
    console.log('Apply accepted');
  };

  const handleDecline = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      {/* Job Header */}
      <div className="border-b border-gray-800 pb-6">
        <div className="max-w-7xl mx-auto">
          <button onClick={onBack} className="text-gray-400 hover:text-white mb-4 flex items-center">
            <ArrowLeft className="mr-2" size={16} /> Back
          </button>

          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <img src={job.logo} alt={`${job.company} logo`} className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">{job.title}</h1>
                <p className="text-gray-300 mb-2">{job.company}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign size={14} />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>Posted {job.datePosted.toLowerCase().replace('last ', '')} ago</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100"
              onClick={handleApply}
            >
              Apply
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">{job.workMode}</span>
            <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">{job.type}</span>
            <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">{job.experience}</span>
            <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">All experience type</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Description</h2>
            <p className="text-gray-300 leading-relaxed">{job.description}</p>
          </div>

          {/* Qualifications */}
          <div>
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Qualification</h2>
            <ul className="space-y-2 text-gray-300">
              {job.qualifications.map((qual, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  {qual}
                </li>
              ))}
            </ul>
          </div>

          {/* About Company */}
          <div>
            <h2 className="text-xl font-semibold text-blue-400 mb-4">About this company</h2>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="w-12 h-12 rounded-full mr-4 overflow-hidden">
                  <img src={job.logo} alt={`${job.company} logo`} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{job.company}</h3>
                  <p className="text-gray-400 text-sm">IT Solution</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">{job.about}</p>
              {/* Social Media Links */}
              <div className="flex gap-4">
                <a href={job.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">
                  <Linkedin size={20} />
                </a>
                <a href={job.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Skills */}
        <div>
          <h2 className="text-xl font-semibold text-blue-400 mb-4">Skill requirement ({job.skills.length})</h2>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <span key={index} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">{skill}</span>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <ApplyModal onAccept={handleAccept} onDecline={handleDecline} />
      )}
    </div>
  );
};

const JobNearby = () => {
  const jobs = [
    {
      id: 1,
      title: 'UI Designer',
      company: 'Openworks',
      location: 'DKI Jakarta',
      type: 'Contract',
      experience: '1 years experience',
      workMode: 'Onsite',
      datePosted: '6 days',
      salary: 'Rp1.000.000 - Rp2.000.000',
      status: 'Active 8 hours ago',
      description: "We're looking for a passionate UI Designer to join our team. The ideal candidate will have a strong eye for clean and elegant user interfaces, with the ability to translate user and business goals into intuitive and beautiful designs. You'll be responsible for the entire design process, from wireframing and prototyping to creating high-fidelity mockups and design systems. You'll collaborate closely with our product and engineering teams to ensure a seamless and engaging user experience across all our platforms.",
      skills: ['UI/UX Design', 'Prototyping', 'Wireframe', 'Storyboarding', 'Teamwork'],
      qualifications: [
        'Strong portfolio showcasing a range of UI/UX design projects.',
        'Proficiency with design and prototyping tools like Figma, Sketch, or Adobe XD.',
        'Solid understanding of user-centered design principles and best practices.',
        'Excellent communication and collaboration skills.',
        'Ability to receive and implement feedback in an iterative design process.'
      ],
      logo: 'https://res.cloudinary.com/dr5pehdsw/image/upload/v1757432039/5b594e4f6d581159efb8566685e7b3b8c31feb04_kqewvy.png',
      about: 'Openworks is a dynamic design agency focused on creating intuitive and beautiful user experiences.',
      social: {
        linkedin: 'https://linkedin.com/company/openworks',
        twitter: 'https://twitter.com/openworks'
      }
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'TechLabs',
      location: 'Bandung, Indonesia',
      type: 'Full-time',
      experience: 'Entry Level',
      workMode: 'Hybrid',
      datePosted: 'Last 7 days',
      salary: 'Rp4.000.000 - Rp6.000.000',
      status: 'Active 2 days ago',
      description: "We are seeking a motivated Frontend Developer to help build and maintain our web applications. You will work closely with the design and backend teams to create responsive, user-friendly interfaces. This role is perfect for entry-level developers who are eager to grow their skills in a collaborative environment.",
      skills: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Responsive Design', 'Next.js', 'Vue.js', 'Angular'],
      qualifications: [
        'Basic knowledge of HTML, CSS, and JavaScript.',
        'Familiarity with frontend frameworks such as React or Vue.',
        'Understanding of responsive and cross-browser design principles.',
        'Good problem-solving and debugging skills.',
        'Eagerness to learn and adapt to new technologies.'
      ],
      logo: 'https://res.cloudinary.com/dr5pehdsw/image/upload/v1757432039/5b594e4f6d581159efb8566685e7b3b8c31feb04_kqewvy.png',
      about: 'TechLabs is a technology startup specializing in creating innovative software solutions for various industries.',
      social: {
        linkedin: 'https://linkedin.com/company/techlabs',
        twitter: 'https://twitter.com/techlabs'
      }
    },
    {
      id: 3,
      title: 'Backend Engineer',
      company: 'Softindo',
      location: 'Surabaya, Indonesia',
      type: 'Part-time',
      experience: 'Mid Level',
      workMode: 'Remote',
      datePosted: 'Last 30 days',
      salary: 'Rp6.000.000 - Rp8.000.000',
      status: 'Active 1 week ago',
      description: "Softindo is hiring a Backend Engineer to design and optimize server-side logic, databases, and APIs. You will collaborate with frontend developers to integrate user-facing elements with server logic while ensuring high performance and security in backend services.",
      skills: ['Node.js', 'Express.js', 'MySQL/PostgreSQL', 'API Development', 'Authentication & Security', 'Docker', 'Golang', 'Python', 'Java', 'Ruby on Rails'],
      qualifications: [
        '2+ years of experience as a backend developer.',
        'Strong knowledge of Node.js and Express.js or similar frameworks.',
        'Experience with relational databases (MySQL, PostgreSQL).',
        'Understanding of RESTful APIs and authentication systems.',
        'Ability to write clean, maintainable, and scalable code.'
      ],
      logo: 'https://res.cloudinary.com/dr5pehdsw/image/upload/v1757432039/5b594e4f6d581159efb8566685e7b3b8c31feb04_kqewvy.png',
      about: 'Softindo provides comprehensive IT solutions, from software development to system integration, for businesses of all sizes.',
      social: {
        linkedin: 'https://linkedin.com/company/softindo',
        twitter: 'https://twitter.com/softindo'
      }
    },
    {
      id: 4,
      title: 'Fullstack Developer',
      company: 'Innovatech',
      location: 'Jakarta, Indonesia',
      type: 'Full-time',
      experience: 'Mid Level',
      workMode: 'Hybrid',
      datePosted: 'Last 7 days',
      salary: 'Rp8.000.000 - Rp12.000.000',
      status: 'Active 3 days ago',
      description: "Join Innovatech as a Fullstack Developer where you'll be responsible for developing scalable web applications from frontend to backend. You will work on building robust features, integrating APIs, and ensuring overall system performance.",
      skills: ['JavaScript', 'React.js', 'Node.js', 'REST API', 'Database Management'],
      qualifications: [
        'Proven experience as a Fullstack Developer or similar role.',
        'Strong knowledge of frontend technologies (React, Vue, or Angular).',
        'Proficiency in backend development with Node.js or similar frameworks.',
        'Experience working with databases such as MySQL or MongoDB.',
        'Good understanding of software development best practices.'
      ],
      logo: 'https://res.cloudinary.com/dr5pehdsw/image/upload/v1757432039/5b594e4f6d581159efb8566685e7b3b8c31feb04_kqewvy.png',
      about: 'Innovatech is at the forefront of technology, creating powerful and scalable web applications that redefine digital experiences.',
      social: {
        linkedin: 'https://linkedin.com/company/innovatech',
        twitter: 'https://twitter.com/innovatech'
      }
    },
    {
      id: 5,
      title: 'Blockchain Engineer',
      company: 'ChainLabs',
      location: 'Bali, Indonesia',
      type: 'Contract',
      experience: 'Senior Level',
      workMode: 'Remote',
      datePosted: 'Last 30 days',
      salary: 'Rp12.000.000 - Rp20.000.000',
      status: 'Active 5 days ago',
      description: "ChainLabs is looking for an experienced Blockchain Engineer to design, implement, and optimize decentralized applications and smart contracts. You will work on cutting-edge blockchain solutions and contribute to the development of our core blockchain infrastructure.",
      skills: ['Solidity', 'Ethereum', 'Smart Contracts', 'Web3.js/Ethers.js', 'Cryptography'],
      qualifications: [
        '3+ years of experience in blockchain development.',
        'Strong understanding of Ethereum and other blockchain platforms.',
        'Proficiency in Solidity and smart contract development.',
        'Familiarity with Web3.js, Ethers.js, or similar libraries.',
        'Knowledge of blockchain security best practices.'
      ],
      logo: 'https://res.cloudinary.com/dr5pehdsw/image/upload/v1757432039/5b594e4f6d581159efb8566685e7b3b8c31feb04_kqewvy.png',
      about: 'ChainLabs is a leading innovator in blockchain technology, building decentralized applications and secure smart contracts for a digital future.',
      social: {
        linkedin: 'https://linkedin.com/company/chainlabs',
        twitter: 'https://twitter.com/chainlabs'
      }
    },
    {
      id: 6,
      title: 'Security Engineer',
      company: 'CyberGuard',
      location: 'Jakarta, Indonesia',
      type: 'Full-time',
      experience: 'Senior Level',
      workMode: 'On-site',
      datePosted: 'Last 24 hours',
      salary: 'Rp10.000.000 - Rp15.000.000',
      status: 'Active 10 hours ago',
      description: "CyberGuard is seeking a Security Engineer to strengthen our security posture by designing secure systems, performing penetration tests, and implementing robust defenses against cyber threats. You will work with developers and IT teams to ensure compliance and safety of our infrastructure.",
      skills: ['Cybersecurity', 'Penetration Testing', 'Network Security', 'Incident Response', 'SIEM Tools'],
      qualifications: [
        '5+ years of experience in security engineering or related field.',
        'Strong knowledge of security frameworks and standards.',
        'Experience with penetration testing tools and methodologies.',
        'Familiarity with cloud security and DevSecOps practices.',
        'Relevant certifications (CEH, CISSP, OSCP) are a plus.'
      ],
      logo: 'https://res.cloudinary.com/dr5pehdsw/image/upload/v1757432039/5b594e4f6d581159efb8566685e7b3b8c31feb04_kqewvy.png',
      about: 'CyberGuard is a cybersecurity firm dedicated to protecting digital assets through proactive defense strategies and expert threat analysis.',
      social: {
        linkedin: 'https://linkedin.com/company/cyberguard',
        twitter: 'https://twitter.com/cyberguard'
      }
    },
    {
      id: 7,
      title: 'Software Engineer',
      company: 'FreelanceHub',
      location: 'Remote',
      type: 'Freelance',
      experience: 'Mid Level',
      workMode: 'Remote',
      datePosted: 'Last 7 days',
      salary: 'Rp5.000.000 - Rp10.000.000',
      status: 'Active 2 days ago',
      description: "FreelanceHub is seeking a versatile Software Engineer to contribute to multiple client projects. You will develop, test, and deploy software solutions while collaborating with cross-functional teams. This role offers flexibility and the chance to work on diverse projects.",
      skills: ['JavaScript', 'Python', 'API Development', 'Agile Methodology', 'Problem Solving'],
      qualifications: [
        '2+ years of experience as a software engineer.',
        'Proficiency in at least one backend (Node.js, Python) and frontend framework.',
        'Experience with version control systems like Git.',
        'Ability to work independently and manage time effectively.',
        'Good communication skills for remote collaboration.'
      ],
      logo: 'https://res.cloudinary.com/dr5pehdsw/image/upload/v1757432039/5b594e4f6d581159efb8566685e7b3b8c31feb04_kqewvy.png',
      about: 'FreelanceHub connects talented software engineers with a wide range of exciting and challenging projects from clients worldwide.',
      social: {
        linkedin: 'https://linkedin.com/company/freelancehub',
        twitter: 'https://twitter.com/freelancehub'
      }
    },
    {
      id: 8,
      title: 'Data Scientist',
      company: 'AI Freelance Network',
      location: 'Remote',
      type: 'Freelance',
      experience: 'Senior Level',
      workMode: 'Remote',
      datePosted: 'Last 30 days',
      salary: 'Rp15.000.000 - Rp25.000.000',
      status: 'Active 1 week ago',
      description: "AI Freelance Network is hiring a Data Scientist to analyze complex datasets, build predictive models, and deliver data-driven insights. You will collaborate with business stakeholders to design AI/ML solutions that improve decision-making and optimize business performance.",
      skills: ['Python', 'Machine Learning', 'Deep Learning', 'Data Visualization', 'Statistical Analysis'],
      qualifications: [
        '5+ years of experience as a Data Scientist or similar role.',
        'Strong knowledge of Python and ML libraries (TensorFlow, scikit-learn, PyTorch).',
        'Proficiency in SQL and data manipulation tools.',
        'Experience in building predictive models and deploying ML pipelines.',
        'Excellent problem-solving and analytical skills.'
      ],
      logo: 'https://res.cloudinary.com/dr5pehdsw/image/upload/v1757432039/5b594e4f6d581159efb8566685e7b3b8c31feb04_kqewvy.png',
      about: 'AI Freelance Network is a platform for top-tier data scientists to find flexible, high-impact projects that leverage their expertise in machine learning and data analysis.',
      social: {
        linkedin: 'https://linkedin.com/company/aifreelancenetwork',
        twitter: 'https://twitter.com/aifreelancenetwork'
      }
    }
  ];

  // Fungsi untuk memuat data dari localStorage
  const loadFavorites = () => {
    try {
      const storedFavorites = localStorage.getItem('jobFavorites');
      return storedFavorites ? JSON.parse(storedFavorites) : Array(jobs.length).fill(false);
    } catch (error) {
      console.error("Failed to load favorites from localStorage", error);
      return Array(jobs.length).fill(false);
    }
  };

  const [favorites, setFavorites] = useState(loadFavorites);
  const [selectedJob, setSelectedJob] = useState(null);

  // useEffect untuk menyimpan data ke localStorage setiap kali 'favorites' berubah
  useEffect(() => {
    try {
      localStorage.setItem('jobFavorites', JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites to localStorage", error);
    }
  }, [favorites]);

  // State untuk filter
  const [datePosted, setDatePosted] = useState('');
  const [experience, setExperience] = useState('');
  const [jobType, setJobType] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [location, setLocation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // ambil unique values dari jobs
  const uniqueValues = (key) => [...new Set(jobs.map((job) => job[key]))];

  const toggleFavorite = (index) => {
    const newFavorites = [...favorites];
    newFavorites[index] = !newFavorites[index];
    setFavorites(newFavorites);
  };

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    const matchSearch = searchTerm
      ? (
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
      : true;

    const matchDate = datePosted ? job.datePosted === datePosted : true;
    const matchExp = experience ? job.experience === experience : true;
    const matchType = jobType ? job.type === jobType : true;
    const matchWorkMode = workMode ? job.workMode === workMode : true;
    const matchLocation = location ? job.location === location : true;

    return matchSearch && matchDate && matchExp && matchType && matchWorkMode && matchLocation;
  });

  if (selectedJob) {
    return <JobDetails job={selectedJob} onBack={() => setSelectedJob(null)} />;
  }

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <select
            value={datePosted}
            onChange={(e) => setDatePosted(e.target.value)}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">Date posted</option>
            {uniqueValues("datePosted").map((val) => (
              <option key={val}>{val}</option>
            ))}
          </select>

          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">Experience Level</option>
            {uniqueValues("experience").map((val) => (
              <option key={val}>{val}</option>
            ))}
          </select>

          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">Job Type</option>
            {uniqueValues("type").map((val) => (
              <option key={val}>{val}</option>
            ))}
          </select>

          <select
            value={workMode}
            onChange={(e) => setWorkMode(e.target.value)}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">Work Mode</option>
            {uniqueValues("workMode").map((val) => (
              <option key={val}>{val}</option>
            ))}
          </select>

          <div className="flex items-center bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 text-sm">
            <MapPin size={16} className="mr-2" />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent outline-none"
            >
              <option value="" className="bg-gray-800">Location</option>
              {uniqueValues("location").map((val) => (
                <option key={val} className="bg-gray-800">{val}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <div
                key={job.id}
                className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-750 transition-colors duration-200 cursor-pointer border border-gray-700"
                onClick={() => setSelectedJob(job)}
              >
                {/* Header with avatar and favorite */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden">
                      <img src={job.logo} alt={`${job.company} logo`} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                      <p className="text-gray-400 text-sm">{job.company}</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(index);
                    }}
                    className={`p-2 rounded-full ${favorites[index] ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                  >
                    <Heart className={`w-5 h-5 ${favorites[index] ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Job Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Briefcase size={14} className="text-gray-400" />
                    <span className="text-gray-300 text-sm">{job.type}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-gray-400" />
                    <span className="text-gray-300 text-sm">{job.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <DollarSign size={14} className="text-gray-400" />
                    <span className="text-gray-300 text-sm">{job.salary}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-gray-400" />
                    <span className="text-gray-400 text-sm">{job.status}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400">No jobs found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <JobNearby />
    </div>
  );
}

export default App;
