import React, { useState } from 'react';
import { FiMapPin, FiClock, FiHeart, FiArrowLeft, FiInfo, FiX } from 'react-icons/fi';

const ApplyModal = ({ onAccept, onDecline }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-[300px] relative shadow-lg">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
          onClick={onDecline}
        >
          <FiX size={20} />
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
    // Logic for accepting and proceeding with apply can be added here
    console.log('Apply accepted');
  };

  const handleDecline = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <button onClick={onBack} className="text-gray-400 hover:text-white mb-4 flex items-center">
              <FiArrowLeft className="mr-2" /> Back
            </button>
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <p className="text-lg text-gray-300">{job.company}</p>
            <div className="flex items-center text-gray-400 mt-2">
              <FiMapPin className="mr-1" />
              <span>{job.location}</span>
            </div>
            <p className="text-yellow-400 font-medium mt-2">{job.salary}</p>
            <p className="text-gray-400 text-sm mt-1">Posted {job.datePosted.toLowerCase().replace('last ', '')} ago</p>
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="bg-gray-700 text-gray-300 px-4 py-1 rounded-full">{job.workMode}</span>
          <span className="bg-gray-700 text-gray-300 px-4 py-1 rounded-full">{job.type}</span>
          <span className="bg-gray-700 text-gray-300 px-4 py-1 rounded-full">{job.experience}</span>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-xl font-semibold text-blue-400 mb-4">Description</h2>
          <p className="text-gray-300 leading-relaxed">{job.description}</p>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-xl font-semibold text-blue-400 mb-4">Skill requirement ({job.skills.length})</h2>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <span key={index} className="bg-gray-700 text-gray-300 px-4 py-1 rounded-full">{skill}</span>
            ))}
          </div>
        </div>

        {/* Qualifications */}
        <div>
          <h2 className="text-xl font-semibold text-blue-400 mb-4">Qualification</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            {job.qualifications.map((qual, index) => (
              <li key={index}>{qual}</li>
            ))}
          </ul>
        </div>

        {/* About Company */}
        <div>
          <h2 className="text-xl font-semibold text-blue-400 mb-4">About this company</h2>
          <div className="bg-gray-800 rounded-lg p-4 flex items-center">
            <div className="w-12 h-12 bg-pink-500 rounded-full mr-4 flex items-center justify-center">
              {/* Placeholder for logo */}
              <span className="text-white font-bold">OW</span>
            </div>
            <div>
              <h3 className="font-semibold">{job.company}</h3>
              <p className="text-gray-400">IT Solutions</p>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <ApplyModal onAccept={handleAccept} onDecline={handleDecline} />
      )}
    </div>
  );
};

const JobNearby = ({ searchTerm = '' }) => {
  const jobs = [
    {
      id: 1,
      title: 'UI Designer',
      company: 'Openworks',
      location: 'DKI Jakarta',
      type: 'Contract',
      experience: '1 year experience',
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
      description: "Join Innovatech as a Fullstack Developer where you’ll be responsible for developing scalable web applications from frontend to backend. You will work on building robust features, integrating APIs, and ensuring overall system performance.",
      skills: ['JavaScript', 'React.js', 'Node.js', 'REST API', 'Database Management'],
      qualifications: [
        'Proven experience as a Fullstack Developer or similar role.',
        'Strong knowledge of frontend technologies (React, Vue, or Angular).',
        'Proficiency in backend development with Node.js or similar frameworks.',
        'Experience working with databases such as MySQL or MongoDB.',
        'Good understanding of software development best practices.'
      ],
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
    }
  ];

  const [favorites, setFavorites] = useState(Array(jobs.length).fill(false));
  const [selectedJob, setSelectedJob] = useState(null);

  // State untuk filter
  const [datePosted, setDatePosted] = useState('');
  const [experience, setExperience] = useState('');
  const [jobType, setJobType] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [location, setLocation] = useState('');

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
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={datePosted}
          onChange={(e) => setDatePosted(e.target.value)}
          className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Date posted</option>
          {uniqueValues("datePosted").map((val) => (
            <option key={val}>{val}</option>
          ))}
        </select>

        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Experience Level</option>
          {uniqueValues("experience").map((val) => (
            <option key={val}>{val}</option>
          ))}
        </select>

        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Job Type</option>
          {uniqueValues("type").map((val) => (
            <option key={val}>{val}</option>
          ))}
        </select>

        <select
          value={workMode}
          onChange={(e) => setWorkMode(e.target.value)}
          className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Work Mode</option>
          {uniqueValues("workMode").map((val) => (
            <option key={val}>{val}</option>
          ))}
        </select>

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Choose Location</option>
          {uniqueValues("location").map((val) => (
            <option key={val}>{val}</option>
          ))}
        </select>
      </div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <div
              key={job.id}
              className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700 cursor-pointer"
              onClick={() => setSelectedJob(job)}
            >
              <div className="flex justify-between items-start" onClick={(e) => e.stopPropagation()}>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>
                  <p className="text-gray-300 mb-2">{job.company}</p>
                  <div className="flex items-center text-sm text-gray-400 mb-3">
                    <span className="bg-blue-900 text-blue-300 text-xs px-2 py-1 rounded-full">
                      {job.type}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm mb-3">
                    <FiMapPin className="mr-1" />
                    <span>{job.location}</span>
                  </div>
                  <div className="text-yellow-400 font-medium mb-3">{job.salary}</div>
                  <div className="flex items-center text-gray-400 text-xs">
                    <FiClock className="mr-1" />
                    <span>{job.status}</span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(index);
                  }}
                  className={`p-2 rounded-full ${favorites[index] ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                >
                  <FiHeart className={favorites[index] ? 'fill-current' : ''} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default JobNearby;