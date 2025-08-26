import React, { useState, useEffect } from 'react';
import { FiLayers, FiMonitor, FiHeart, FiMap, FiBookOpen, FiBriefcase, FiMapPin, FiDollarSign, FiClock, FiX, FiPlay } from 'react-icons/fi';
import WelcomeScreen from '../components/WelcomeScreen';

const Dashboard = ({ searchTerm = '' }) => {
  const [showWelcome, setShowWelcome] = useState(() => {
    // Check if the welcome screen has been shown before
    return !localStorage.getItem('welcomeShown');
  });

  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('welcomeShown', 'true');
  };

  const handleOpenVideo = () => {
    setShowVideoModal(true);
  };

  const handleCloseVideo = () => {
    setShowVideoModal(false);
  };

  const [roadmapItems] = useState([
    { id: 1, title: 'Design Hierarchy', status: 'completed' },
    { id: 2, title: 'Space', status: 'in-progress' },
    { id: 3, title: 'Grid System', status: 'upcoming' },
    { id: 4, title: 'Hi-Fi Prototyping', status: 'upcoming' },
  ]);

  const [jobs] = useState([
    {
      id: 1,
      title: 'UI Designer Internship',
      company: 'Opowerk',
      location: 'Jakarta',
      salary: 'Rp 1.000.000 â€" Rp 3.000.000',
      status: 'Active 5h ago',
      isFavorite: false
    },
    {
      id: 2,
      title: 'UX Designer Internship',
      company: 'TechCorp',
      location: 'Depok',
      salary: 'Rp 1.500.000 â€" Rp 3.500.000',
      status: 'Active 1d ago',
      isFavorite: true
    },
    {
      id: 3,
      title: 'Product Design Intern',
      company: 'DigitalLabs',
      location: 'Online',
      salary: 'Rp 1.200.000 â€" Rp 3.200.000',
      status: 'Active 2d ago',
      isFavorite: false
    },
    {
      id: 4,
      title: 'UI/UX Designer',
      company: 'WebCraft',
      location: 'Jakarta',
      salary: 'Rp 1.800.000 â€" Rp 4.000.000',
      status: 'Active 3h ago',
      isFavorite: true
    },
    {
      id: 5,
      title: 'Junior UI Designer',
      company: 'PixelForge',
      location: 'Depok',
      salary: 'Rp 2.000.000 â€" Rp 3.800.000',
      status: 'Active 1d ago',
      isFavorite: false
    },
    {
      id: 6,
      title: 'UX Research Intern',
      company: 'DataMinds',
      location: 'Online',
      salary: 'Rp 1.300.000 â€" Rp 3.000.000',
      status: 'Active 4h ago',
      isFavorite: false
    },
  ]);

  const [favorites, setFavorites] = useState(jobs.map(job => job.isFavorite));

  const toggleFavorite = (index) => {
    const newFavorites = [...favorites];
    newFavorites[index] = !newFavorites[index];
    setFavorites(newFavorites);
  };

  const skills = [
    { name: 'Research', percentage: 40 },
    { name: 'UI Design', percentage: 60 },
    { name: 'Communication', percentage: 90 },
    { name: 'HCI Principle', percentage: 50 },
    { name: 'Web Development', percentage: 50 },
  ];

  const [animatedPercentages, setAnimatedPercentages] = useState(skills.map(() => 0));

  useEffect(() => {
    const intervals = skills.map((skill, index) => {
      let current = 0;
      const step = skill.percentage / 100;
      const interval = setInterval(() => {
        current += step;
        if (current >= skill.percentage) {
          current = skill.percentage;
          clearInterval(interval);
        }
        setAnimatedPercentages(prev => {
          const newPrev = [...prev];
          newPrev[index] = current;
          return newPrev;
        });
      }, 20);
      return interval;
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  // Filter jobs based on search term
  const filteredJobs = searchTerm ? jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  ) : jobs;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6">
      {showWelcome && <WelcomeScreen onClose={handleCloseWelcome} />}

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-full overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold">The Secret Science of Perfect Spacing</h3>
              <button
                onClick={handleCloseVideo}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4">
              <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="The Secret Science of Perfect Spacing"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
              <div className="mt-4">
                <p className="text-gray-300 text-sm">
                  Learn the fundamental principles of spacing in design. This comprehensive tutorial covers
                  everything from basic spacing rules to advanced techniques used by professional designers.
                </p>
                <div className="mt-2 text-xs text-gray-400">
                  Duration: 9:40 â€¢ Progress: 3:53
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Section Titles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-2">
          <h2 className="text-xl font-bold text-[#B383E7] flex items-center">
            <FiLayers className="mr-2" />
            Job Analysis
          </h2>
          <h2 className="text-xl font-bold text-[#B383E7] flex items-center">
            <FiLayers className="mr-2" />
            Job Skill's Percentage
          </h2>
        </div>

        {/* Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          {/* Job Analysis - Side by Side */}
          <div className="bg-gray-800 p-4 rounded-xl shadow-lg flex flex-col h-full">
            <div className="flex-grow flex items-center justify-center">
              <div className="px-4 py-2 rounded-lg">
                <img
                  src="https://res.cloudinary.com/dr5pehdsw/image/upload/v1755496797/ca51bcdee897ec6168c6693b95a013d3380a53ef_znl5pq.png"
                  className="w-32 h-auto rounded-lg"
                />
              </div>
            </div>
            <div className="flex justify-around mt-auto">
              <div className="text-center">
                <p className="text-[10px] text-gray-400">Selected Field</p>
                <p className="text-sm font-medium">UI/UX Design</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-gray-400">Type</p>
                <p className="text-sm font-medium">Creative</p>
              </div>
            </div>
          </div>

          {/* Job Skill's Percentage - Centered and Larger */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg lg:col-span-4">
            <div className="flex flex-nowrap justify-center items-center gap-8 overflow-x-auto pb-2 -mx-2">
              {skills.map((skill, index) => (
                <div key={index} className="text-center px-4 flex-shrink-0">
                  <div className="relative w-28 h-28 mx-auto mb-3">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#2D3748"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={index % 2 === 0 ? '#4FD1C5' : '#4299E1'}
                        strokeWidth="3"
                        strokeDasharray={`${animatedPercentages[index]}, 100`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold">{Math.round(animatedPercentages[index])}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 whitespace-nowrap font-medium">{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section Titles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-2 mt-8">
          <h2 className="text-xl font-bold text-[#B383E7] flex items-center lg:col-span-2">
            <FiMap className="mr-2" />
            Learning Roadmap
          </h2>
          <h2 className="text-xl font-bold text-[#B383E7] flex items-center justify-center lg:justify-end">
            <FiBookOpen className="mr-2" />
            Continue Learning
          </h2>
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Learning Roadmap - Made larger */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg lg:col-span-2">
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-600"></div>
              <div className="space-y-6">
                {roadmapItems.map((item) => (
                  <div key={item.id} className="relative pl-10">
                    <div className={`absolute left-0 w-3 h-3 rounded-full ${item.status === 'completed' ? 'bg-green-500' :
                      item.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`}></div>
                    <div className="text-sm">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-gray-400 capitalize">Status: {item.status.replace('-', ' ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl shadow-lg w-full max-w-md h-32 overflow-hidden">
            <div className="p-4 h-full flex items-center justify-between">

              {/* Thumbnail Section */}
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mr-4 bg-gray-800">
                <img
                  src="https://res.cloudinary.com/dr5pehdsw/image/upload/v1755498557/0b1b520b3e24d492a1d71d58b50cb5e21b1d92a3_bryuub.png"
                  alt="Spacing"
                  className="w-40 h-40 object-contain"
                />
              </div>

              {/* Content Section */}
              <div className="flex-1">
                <div className="mb-2">
                  <h1 className="text-white text-base font-bold leading-tight line-clamp-2">
                    The Secret Science of Perfect Spacing
                  </h1>
                </div>

                <div className="text-white text-sm opacity-90">
                  3:53 / 9:40
                </div>
              </div>

              {/* Arrow Button - Only clickable area */}
              <div className="flex items-center ml-4">
                <button
                  className="text-white opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-black hover:bg-opacity-20 transform hover:translate-y-1"
                  onClick={handleOpenVideo}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Job Nearby Title */}
        <h2 className="text-xl font-bold text-[#B383E7] flex items-center mt-8 mb-2">
          <FiBriefcase className="mr-2" />
          Job Nearby
        </h2>

        {/* Job Nearby */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs.length > 0 && filteredJobs.map((job, index) => (
              <div key={job.id} className="bg-gray-700 rounded-lg p-4 relative">
                <button
                  onClick={() => toggleFavorite(index)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <FiHeart className={favorites[index] ? 'fill-current text-red-500' : ''} />
                </button>
                <h3 className="font-bold text-blue-400">{job.title}</h3>
                <p className="text-sm text-gray-300">{job.company}</p>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center text-xs text-gray-400">
                    <FiMapPin className="mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-xs text-gray-400">
                    <FiDollarSign className="mr-1" />
                    {job.salary}
                  </div>
                  <div className="flex items-center text-xs text-green-400">
                    <FiClock className="mr-1" />
                    {job.status}
                  </div>
                </div>
              </div>
            ))}

            {filteredJobs.length === 0 && (
              <div className="col-span-3 text-center py-8 text-gray-400">
                No jobs found matching your search. Try different keywords.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;