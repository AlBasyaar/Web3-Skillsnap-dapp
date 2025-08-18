import React, { useState } from 'react';

// Use this for icons instead of image URLs
const SVG = {
  Home: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  Chat: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  ),
  Course: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a2 2 0 00.963-1.574V6.216l-9 5-9-5v3.89a2 2 0 00.963 1.574L12 14z" />
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a2 2 0 00.963-1.574V6.216l-9 5-9-5v3.89a2 2 0 00.963 1.574L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v4.881c0 .12.02.239.059.352l-.841.467a1 1 0 00-.418.892V20h12v-5.238a1 1 0 00-.418-.892l-.84-.467a1.002 1.002 0 01.06-.352V7" />
    </svg>
  ),
  Job: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.186 0-6.195-.733-8.875-2.045M21 13.255A23.931 23.931 0 0112 15c-3.186 0-6.195-.733-8.875-2.045m-2.228 1.487l-.022-.012m14.288-.415l-.022.012" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3-4a5 5 0 100 10 5 5 0 000-10z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7.255A23.931 23.931 0 0112 9c-3.186 0-6.195-.733-8.875-2.045M20 7.255A23.931 23.931 0 0112 9c-3.186 0-6.195-.733-8.875-2.045m-2.228 1.487l-.022-.012m14.288-.415l-.022.012" />
    </svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Bell: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  Upgrade: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8m-4-6a6 6 0 11-12 0 6 6 0 0112 0z" />
    </svg>
  ),
  ChevronRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  ),
  ThreeDots: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4z" />
    </svg>
  ),
  CheckCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Time: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  upcoming: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Play: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
  )
};

const App = () => {
  // State to manage whether the sidebar is collapsed or not
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Function to toggle the sidebar's state
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Mock data for the dashboard content
  const dashboardData = {
    jobAnalysis: {
      path: 'UI/UX Design',
      type: 'Creative',
    },
    jobSkills: [
      { skill: 'Research', percentage: 40 },
      { skill: 'UI Design', percentage: 65 },
      { skill: 'Communication', percentage: 90 },
      { skill: 'HCI Principle', percentage: 50 },
      { skill: 'Web Development', percentage: 50 },
    ],
    learningRoadmap: [
      { title: 'Design Hierarchy', status: 'Completed' },
      { title: 'Space', status: 'In Progress' },
      { title: 'Grid System', status: 'Upcoming' },
      { title: 'Hi-Fi Prototyping', status: 'Upcoming' },
    ],
    learningModule: {
      title: 'The Secret Science of Perfect Spacing',
      progress: '3:53 / 9:40',
      thumbnail: 'https://placehold.co/150x80/2f3a4b/ffffff?text=Video+Thumbnail',
    },
    nearbyJobs: [
      {
        title: 'UI Designer Internship',
        company: 'Openworks',
        type: 'Contract',
        location: 'DKI Jakarta, Onsite',
        salary: 'Rp1.000.000 - Rp2.000.000',
        active: '8 hours ago'
      },
      {
        title: 'UI Designer Internship',
        company: 'Openworks',
        type: 'Contract',
        location: 'DKI Jakarta, Onsite',
        salary: 'Rp1.000.000 - Rp2.000.000',
        active: '8 hours ago'
      },
      {
        title: 'UI Designer Internship',
        company: 'Openworks',
        type: 'Contract',
        location: 'DKI Jakarta, Onsite',
        salary: 'Rp1.000.000 - Rp2.000.000',
        active: '8 hours ago'
      },
    ],
    user: {
      name: 'Jane Doe',
      avatar: 'https://placehold.co/40x40/5e6777/ffffff?text=JD',
      walletAddress: '0xDc16b_648Aa',
    },
  };

  // Helper function to render the percentage circles
  const renderPercentageCircle = (percentage, colorClass) => {
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    return (
      <svg className="w-20 h-20 -rotate-90">
        <circle
          className="text-gray-700"
          strokeWidth="5"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
        />
        <circle
          className={colorClass}
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="text-white text-sm font-bold -rotate-270"
          transform="rotate(90 40 40)"
        >
          {percentage}%
        </text>
      </svg>
    );
  };

  return (
    <div className="bg-[#121417] text-white min-h-screen flex font-[Inter] overflow-hidden">
      {/* Sidebar - Using transitions and conditions for width */}
      <aside className={`bg-[#1e2025] flex flex-col justify-between p-6 rounded-r-3xl transition-all duration-300 ease-in-out ${isCollapsed ? 'w-24' : 'w-64'}`}>
        <div>
          <div className="flex items-center mb-10 pl-2">
            {/* Logo container and text, only hide the text on collapse */}
            <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden">
              <img
                src="https://res.cloudinary.com/dr5pehdsw/image/upload/v1755493528/Icon_-_Square_ouv0ti.png"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className={`text-xl font-bold overflow-hidden whitespace-nowrap ml-2 ${isCollapsed ? 'hidden' : 'block'}`}>Skillsnap</h1>
            <button
              className={`ml-auto text-gray-400 hover:text-white transition-colors flex-shrink-0 ${isCollapsed ? 'rotate-180' : ''}`}
              onClick={toggleSidebar}
            >
              {isCollapsed ? <SVG.ChevronRight /> : <SVG.ChevronLeft />}
            </button>
          </div>
          <nav>
            <ul>
              {/* Home link with hover classes */}
              <li className="mb-2">
                {/* Updated to be the active link */}
                <a href="#" className="flex items-center p-3 rounded-lg bg-[#27292f] text-[#7252ff]">
                  <SVG.Home />
                  <span className={`ml-4 font-semibold overflow-hidden whitespace-nowrap ${isCollapsed ? 'hidden' : 'block'}`}>Home</span>
                </a>
              </li>
              {/* AI Chat link with permanent active classes */}
              <li className="mb-2">
                {/* Updated to be the inactive link */}
                <a href="#" className="flex items-center p-3 rounded-lg text-gray-400 hover:bg-[#27292f] hover:text-white transition-colors">
                  <SVG.Chat />
                  <span className={`ml-4 font-semibold overflow-hidden whitespace-nowrap ${isCollapsed ? 'hidden' : 'block'}`}>AI Chat</span>
                </a>
              </li>
              {/* Course link with hover classes */}
              <li className="mb-2">
                <a href="#" className="flex items-center p-3 rounded-lg text-gray-400 hover:bg-[#27292f] hover:text-white transition-colors">
                  <SVG.Course />
                  <span className={`ml-4 font-semibold overflow-hidden whitespace-nowrap ${isCollapsed ? 'hidden' : 'block'}`}>Course</span>
                </a>
              </li>
              {/* Job nearby link with hover classes */}
              <li className="mb-2">
                <a href="#" className="flex items-center p-3 rounded-lg text-gray-400 hover:bg-[#27292f] hover:text-white transition-colors">
                  <SVG.Job />
                  <span className={`ml-4 font-semibold overflow-hidden whitespace-now-wrap ${isCollapsed ? 'hidden' : 'block'}`}>Job nearby</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        {/* User Profile - Using conditions for display */}
        <div className={`bg-[#27292f] rounded-xl p-4 flex items-center transition-all duration-300 ease-in-out ${isCollapsed ? 'flex-col justify-center' : 'flex-row'}`}>
          <img src={dashboardData.user.avatar} alt="User Avatar" className={`w-10 h-10 rounded-full flex-shrink-0 ${isCollapsed ? '' : 'mr-3'}`} />
          {/* Hide text when collapsed */}
          <div className={`flex-1 overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${isCollapsed ? 'hidden' : 'block'}`}>
            <div className="text-sm font-semibold">{dashboardData.user.name}</div>
            <div className="text-xs text-gray-400">{dashboardData.user.walletAddress}</div>
          </div>
          <button className={`text-gray-400 ${isCollapsed ? 'mt-2' : ''}`}>
            <SVG.ThreeDots />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search for jobs, courses, and more"
              className="w-full bg-[#1e2025] text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <SVG.Search />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-3 bg-[#1e2025] rounded-xl text-gray-400 hover:text-white transition-colors">
              <SVG.Bell />
            </button>
            <button className="bg-[#7252ff] hover:bg-[#6242e0] text-white font-semibold py-2 px-4 rounded-xl flex items-center">
              <SVG.Upgrade />
              <span>Upgrade</span>
            </button>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Job Analysis */}
          <div className="bg-[#1e2025] rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4 text-[#7ab0ff]">Job Analysis</h2>
            <div className="relative bg-[#27292f] rounded-2xl p-6 flex flex-col items-center">
              {/* Gambar */}
              <img
                src="https://placehold.co/220x160/5e6777/ffffff?text=Design+Image"
                alt="Job Path"
                className="rounded-xl"
              />
              {/* Text inside the card */}
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-sm text-gray-400">Selected Path</div>
                <div className="text-lg font-bold">{dashboardData.jobAnalysis.path}</div>
              </div>
              <div className="absolute bottom-4 right-4 text-white text-right">
                <div className="text-sm text-gray-400">Type</div>
                <div className="text-lg font-bold">{dashboardData.jobAnalysis.type}</div>
              </div>
            </div>
          </div>
          {/* Job Skill's Percentage */}
          <div className="col-span-1 md:col-span-2 bg-[#1e2025] rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6 text-[#7ab0ff]">
              Job skill's percentage
            </h2>
            {/* Flex row with long horizontal bar */}
            <div className="flex flex-wrap justify-between items-center gap-12 w-full">
              {dashboardData.jobSkills.map((skill, index) => (
                <div key={index} className="flex flex-col items-center">
                  {/* Circle progress */}
                  <div className="w-32 h-32 flex items-center justify-center">
                    <svg width="130" height="130" className="transform -rotate-90">
                      <circle
                        stroke="#2d2f36"
                        fill="transparent"
                        strokeWidth="10"
                        r="55"
                        cx="65"
                        cy="65"
                      />
                      <circle
                        stroke="#3b82f6"
                        fill="transparent"
                        strokeWidth="10"
                        strokeDasharray={2 * Math.PI * 55}
                        strokeDashoffset={
                          2 * Math.PI * 55 - (skill.percentage / 100) * (2 * Math.PI * 55)
                        }
                        strokeLinecap="round"
                        r="55"
                        cx="65"
                        cy="65"
                      />
                    </svg>
                  </div>
                  {/* Percentage (only outside the circle) */}
                  <span className="mt-2 text-lg font-bold text-white">
                    {skill.percentage}%
                  </span>
                  {/* Skill name */}
                  <span className="text-sm text-gray-400 mt-1 text-center">
                    {skill.skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Learning & Jobs Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Learning Roadmap */}
          <div className="col-span-1 md:col-span-1 bg-[#1e2025] rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Learning Roadmap</h2>
              <button className="text-blue-400 text-sm font-semibold">More details</button>
            </div>
            {dashboardData.learningRoadmap.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-4 border-b border-gray-700 last:border-b-0">
                <div className="flex items-center">
                  {item.status === 'Completed' && <SVG.CheckCircle />}
                  {item.status === 'In Progress' && <SVG.Time />}
                  {item.status === 'Upcoming' && <SVG.upcoming />}
                  <span className="ml-3 text-sm">{item.title}</span>
                </div>
                <button className="text-gray-400">
                  <SVG.ChevronRight />
                </button>
              </div>
            ))}
          </div>
          {/* Continue Learning */}
          <div className="col-span-1 md:col-span-2 bg-[#1e2025] rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Continue learning</h2>
            <div className="bg-[#27292f] rounded-2xl p-4 flex items-center space-x-4">
              <img src={dashboardData.learningModule.thumbnail} alt="Learning Module Thumbnail" className="rounded-lg w-24 h-16 object-cover" />
              <div className="flex-1">
                <div className="text-sm text-gray-400">SPACING</div>
                <div className="font-bold">{dashboardData.learningModule.title}</div>
                <div className="text-xs text-gray-400 mt-1">{dashboardData.learningModule.progress}</div>
              </div>
              <button className="w-12 h-12 flex-shrink-0 bg-[#7252ff] rounded-full flex items-center justify-center">
                <SVG.Play />
              </button>
            </div>
          </div>
        </div>
        {/* Job Nearby Section */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Job nearby</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardData.nearbyJobs.map((job, index) => (
              <div key={index} className="bg-[#1e2025] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-8 h-8 rounded-full bg-[#27292f] flex items-center justify-center text-xs font-bold text-gray-400">
                      OW
                    </span>
                    <span className="text-sm text-gray-400">{job.company}</span>
                  </div>
                  <div className="text-gray-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-bold">{job.title}</h3>
                <div className="text-sm text-gray-400 mb-2">{job.type}</div>
                <div className="flex items-center text-sm text-gray-400 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-400 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v1a1 1 0 01-1 1H9a1 1 0 01-1-1v-1a1 1 0 011-1h1zm4 11h-4m2 2l-2 2h4l-2-2z" />
                  </svg>
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Active {job.active}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
