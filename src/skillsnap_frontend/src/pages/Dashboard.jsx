import React, { useState, useEffect } from 'react';

const WelcomeScreen = ({ onClose, description, showImage = false }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          aria-label="Close welcome screen"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {showImage ? (
          <div className="space-y-4">
            <div className="flex items-start gap-6">
              <img
                src="https://res.cloudinary.com/dr5pehdsw/image/upload/v1755496797/ca51bcdee897ec6168c6693b95a013d3380a53ef_znl5pq.png"
                className="w-28 h-28 object-cover"
                alt="Job Analysis Creative Field"
              />

              <div className="flex flex-col gap-4 flex-1">
                <div>
                  <h2 className="text-2xl font-bold text-purple-400">Creative</h2>
                  <h3 className="text-sm text-gray-400">Job related</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {['Graphics Design', 'Motion Graphics', 'UI/UX Designer', 'Art'].map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-900 text-purple-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description Full Width */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                The creative field offers diverse career opportunities for individuals who are passionate about design and innovation.
                Roles in Graphic Design, Motion Graphics, UI/UX Design, and Art allow professionals to transform concepts into visual
                solutions that support business goals and enhance user engagement. Graphic designers develop impactful branding and
                communication materials, motion graphic specialists create dynamic visuals for media, UI/UX designers build intuitive
                digital experiences, and artists contribute originality and expression. These careers combine technical expertise with
                creativity, making them essential in industries such as advertising, technology, entertainment, and digital media.
                Pursuing this path provides strong growth and relevance.
              </p>
            </div>
          </div>
        ) : (
          /* Original layout when showImage is false */
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-purple-400">Creative</h2>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Job related</h3>
              <div className="flex flex-wrap gap-2">
                {['Graphics Design', 'Motion Graphics', 'UI/UX Designer', 'Art'].map((tag) => (
                  <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-900 text-purple-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Komponen Ikon SVG untuk menggantikan react-icons dan menghindari error
const Icon = ({ name, className }) => {
  const icons = {
    search: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>,
    bell: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
    zap: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>,
    layers: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>,
    map: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>,
    bookOpen: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>,
    briefcase: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>,
    mapPin: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
    dollarSign: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>,
    clock: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
    x: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  };
  return icons[name] || null;
};

const NavigationBar = ({ searchTerm, onSearchChange }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="bg-gray-900 border-b border-gray-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="search" className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-600 rounded-lg leading-5 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                placeholder="Search for jobs, courses, and more"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Upgrade Button */}
            <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-100 text-black rounded-lg transition-colors duration-200 font-medium text-sm">
              <Icon name="zap" className="h-4 w-4 text-yellow-500" />
              Upgrade
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
              >
                <Icon name="bell" className="h-5 w-5" />
                {/* Notification dot */}
                <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <h3 className="text-sm font-semibold text-white">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="px-4 py-3 hover:bg-gray-700 cursor-pointer">
                      <p className="text-sm text-white">New job opportunity: Senior UI Designer</p>
                      <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                    </div>
                    <div className="px-4 py-3 hover:bg-gray-700 cursor-pointer">
                      <p className="text-sm text-white">Course reminder: Complete your design fundamentals</p>
                      <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                    </div>
                    <div className="px-4 py-3 hover:bg-gray-700 cursor-pointer">
                      <p className="text-sm text-white">Application update: Your portfolio was viewed</p>
                      <p className="text-xs text-gray-400 mt-1">3 days ago</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);

  const [jobAnalysisDescription] = useState('The creative field offers diverse career opportunities for individuals who are passionate about design and innovation. Roles in Graphic Design, Motion Graphics, UI/UX Design, and Art allow professionals to transform concepts into visual solutions that support business goals and enhance user engagement. Graphic designers develop impactful branding and communication materials, motion graphics specialists create dynamic visuals for media, UI/UX designers build intuitive digital experiences, and artists contribute originality and expression. These careers combine technical expertise with creativity, making them essential in industries such as advertising, technology, entertainment, and digital media. Pursuing this path provides strong growth and relevance.');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
  };

  const handleOpenVideo = () => {
    setShowVideoModal(true);
  };

  const handleCloseVideo = () => {
    setShowVideoModal(false);
  };

  const handleOpenDetail = () => {
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
  };

  const [roadmapItems] = useState([
    { id: 1, title: 'Design Hierarchy', status: 'completed' },
    { id: 2, title: 'Space', status: 'in-progress' },
    { id: 3, title: 'Grid System', status: 'upcoming' },
    { id: 4, title: 'Hi-Fi Prototyping', status: 'upcoming' },
  ]);

  const [jobs] = useState([
    { id: 1, title: 'UI Designer Internship', company: 'Opowerk', location: 'Jakarta', salary: 'Rp 1.000.000 – Rp 3.000.000', status: 'Active 5h ago', isFavorite: false },
    { id: 2, title: 'UX Designer Internship', company: 'TechCorp', location: 'Depok', salary: 'Rp 1.500.000 – Rp 3.500.000', status: 'Active 1d ago', isFavorite: true },
    { id: 3, title: 'Product Design Intern', company: 'DigitalLabs', location: 'Online', salary: 'Rp 1.200.000 – Rp 3.200.000', status: 'Active 2d ago', isFavorite: false },
    { id: 4, title: 'UI/UX Designer', company: 'WebCraft', location: 'Jakarta', salary: 'Rp 1.800.000 – Rp 4.000.000', status: 'Active 3h ago', isFavorite: true },
    { id: 5, title: 'Junior UI Designer', company: 'PixelForge', location: 'Depok', salary: 'Rp 2.000.000 – Rp 3.800.000', status: 'Active 1d ago', isFavorite: false },
    { id: 6, title: 'UX Research Intern', company: 'DataMinds', location: 'Online', salary: 'Rp 1.300.000 – Rp 3.000.000', status: 'Active 4h ago', isFavorite: false },
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
      }, 60);
      return interval;
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  const filteredJobs = searchTerm ? jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  ) : jobs;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation Bar */}
      <NavigationBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Main Content */}
      <div className="p-4 md:p-6">
        {/* Welcome Screen - no image shown */}
        {showWelcome && <WelcomeScreen onClose={handleCloseWelcome} description={jobAnalysisDescription} showImage={false} />}

        {/* Detail Modal - image is shown */}
        {showDetailModal && <WelcomeScreen onClose={handleCloseDetail} description={jobAnalysisDescription} showImage={true} />}

        {showVideoModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-full overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold">The Secret Science of Perfect Spacing</h3>
                <button onClick={handleCloseVideo} className="text-gray-400 hover:text-white transition-colors">
                  <Icon name="x" className="w-6 h-6" />
                </button>
              </div>
              <div className="p-4">
                <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/nqeVL5VSK7M"
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
                    Duration: 9:40 • Progress: 3:53
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-2">
            <h2 className="text-xl font-bold text-[#B383E7] flex items-center">
              <Icon name="layers" className="mr-2 w-5 h-5" />
              Job Analysis
            </h2>
            <h2 className="text-xl font-bold text-[#B383E7] flex items-center">
              <Icon name="layers" className="mr-2 w-5 h-5" />
              Job Skill's Percentage
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            <div className="bg-gray-800 p-4 rounded-xl shadow-lg flex flex-col h-full relative">
              <div className="flex-grow flex items-center justify-center">
                <img
                  src="https://res.cloudinary.com/dr5pehdsw/image/upload/v1755496797/ca51bcdee897ec6168c6693b95a013d3380a53ef_znl5pq.png"
                  className="w-32 h-auto rounded-lg"
                  alt="Job Analysis"
                />
              </div>
              <div className="flex justify-around items-center mt-auto">
                <div className="text-center">
                  <p className="text-[10px] text-gray-400">Selected Field</p>
                  <p className="text-sm font-medium">UI/UX Design</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-gray-400">Type</p>
                  <p className="text-sm font-medium">Creative</p>
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <button
                  onClick={handleOpenDetail}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors duration-200 text-xs font-medium"
                  aria-label="Detail analysis"
                >
                  Detail
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl shadow-lg lg:col-span-4">
              <div className="flex flex-nowrap justify-center items-center gap-8 overflow-x-auto pb-2 -mx-2">
                {skills.map((skill, index) => (
                  <div key={index} className="text-center px-4 flex-shrink-0">
                    <div className="relative w-28 h-28 mx-auto mb-3">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#2D3748" strokeWidth="3" />
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={index % 2 === 0 ? '#4FD1C5' : '#4299E1'} strokeWidth="3" strokeDasharray={`${animatedPercentages[index]}, 100`} strokeLinecap="round" />
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-2 mt-8">
            <h2 className="text-xl font-bold text-[#B383E7] flex items-center lg:col-span-2">
              <Icon name="map" className="mr-2 w-5 h-5" />
              Learning Roadmap
            </h2>
            <h2 className="text-xl font-bold text-[#B383E7] flex items-center justify-center lg:justify-end">
              <Icon name="bookOpen" className="mr-2 w-5 h-5" />
              Continue Learning
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg lg:col-span-2">
              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-600"></div>
                <div className="space-y-6">
                  {roadmapItems.map((item) => (
                    <div key={item.id} className="relative pl-10">
                      <div className={`absolute left-0 w-3 h-3 rounded-full ${item.status === 'completed' ? 'bg-green-500' : item.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-500'}`}></div>
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
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mr-4 bg-gray-800">
                  <img src="https://res.cloudinary.com/dr5pehdsw/image/upload/v1755498557/0b1b520b3e24d492a1d71d58b50cb5e21b1d92a3_bryuub.png" alt="Spacing" className="w-40 h-40 object-contain" />
                </div>
                <div className="flex-1">
                  <div className="mb-2">
                    <h1 className="text-white text-base font-bold leading-tight line-clamp-2">The Secret Science of Perfect Spacing</h1>
                  </div>
                  <div className="text-white text-sm opacity-90">3:53 / 9:40</div>
                </div>
                <div className="flex items-center ml-4">
                  <button className="text-white opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-black hover:bg-opacity-20 transform hover:translate-y-1" onClick={handleOpenVideo}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold text-[#B383E7] flex items-center mt-8 mb-2">
            <Icon name="briefcase" className="mr-2 w-5 h-5" />
            Job Nearby
          </h2>

          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredJobs.length > 0 && filteredJobs.map((job, index) => (
                <div key={job.id} className="bg-gray-700 rounded-lg p-4 relative">
                  <button onClick={() => toggleFavorite(index)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors">
                    <svg className={`w-5 h-5 ${favorites[index] ? 'fill-current text-red-500' : ''}`} stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  </button>
                  <h3 className="font-bold text-blue-400">{job.title}</h3>
                  <p className="text-sm text-gray-300">{job.company}</p>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center text-xs text-gray-400">
                      <Icon name="mapPin" className="mr-1 w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-xs text-gray-400">
                      <Icon name="dollarSign" className="mr-1 w-4 h-4" />
                      {job.salary}
                    </div>
                    <div className="flex items-center text-xs text-green-400">
                      <Icon name="clock" className="mr-1 w-4 h-4" />
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
    </div>
  );
};

export default Dashboard;