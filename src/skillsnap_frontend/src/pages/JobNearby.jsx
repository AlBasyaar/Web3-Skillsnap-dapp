import React, { useState } from 'react';
import { FiMapPin, FiClock, FiHeart } from 'react-icons/fi';

const JobNearby = ({ searchTerm = '' }) => {
  const jobs = [
    {
      id: 1,
      title: 'UI Designer Internship',
      company: 'Openworks',
      location: 'Jakarta, Indonesia',
      type: 'Contract',
      experience: 'Internship',
      workMode: 'On-site',
      datePosted: 'Last 24 hours',
      salary: 'Rp1.000.000 - Rp2.000.000',
      status: 'Active 8 hours ago',
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
    },
  ];

  const [favorites, setFavorites] = useState(Array(jobs.length).fill(false));

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
            <div key={job.id} className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700">
              <div className="flex justify-between items-start">
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
                  onClick={() => toggleFavorite(index)}
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
