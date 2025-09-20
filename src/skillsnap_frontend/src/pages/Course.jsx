import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CourseDetail from './CourseDetail';

const courses = [
  {
    id: 1,
    title: 'JavaScript Programming Full Course',
    description: 'Master JavaScript from the ground up with our comprehensive course. Learn everything from basic syntax to advanced concepts.',
    duration: '120 hours',
    lessons: '80 course',
    rating: 4.7,
    level: 'Beginner',
    thumbnail: 'https://img.youtube.com/vi/W6NZfCO5SIk/maxresdefault.jpg',
    sessions: [
      {
        title: 'JavaScript Mastery',
        description: 'Learn JavaScript from scratch with our comprehensive tutorial series.',
        videos: [
          { 
            title: 'JavaScript Tutorial for Beginners', 
            url: 'https://youtu.be/W6NZfCO5SIk',
            thumbnail: 'https://img.youtube.com/vi/W6NZfCO5SIk/maxresdefault.jpg',
            embedUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk'
          },
          { 
            title: 'JavaScript Crash Course', 
            url: 'https://youtu.be/SqcY0GlETPk',
            thumbnail: 'https://img.youtube.com/vi/SqcY0GlETPk/maxresdefault.jpg',
            embedUrl: 'https://www.youtube.com/embed/SqcY0GlETPk'
          },
          { 
            title: 'JavaScript DOM Manipulation', 
            url: 'https://youtu.be/_6Tl2_eM0DE',
            thumbnail: 'https://img.youtube.com/vi/_6Tl2_eM0DE/maxresdefault.jpg',
            embedUrl: 'https://www.youtube.com/embed/_6Tl2_eM0DE'
          },
          { 
            title: 'JavaScript Asynchronous Programming', 
            url: 'https://youtu.be/5U6IjWXq0Yw',
            thumbnail: 'https://img.youtube.com/vi/5U6IjWXq0Yw/maxresdefault.jpg',
            embedUrl: 'https://www.youtube.com/embed/5U6IjWXq0Yw'
          },
          { 
            title: 'JavaScript ES6+ Features', 
            url: 'https://youtu.be/fF_yTe7h1hQ',
            thumbnail: 'https://img.youtube.com/vi/fF_yTe7h1hQ/maxresdefault.jpg',
            embedUrl: 'https://www.youtube.com/embed/fF_yTe7h1hQ'
          }
        ],
        tests: 3,
        hours: 4
      }
    ]
  },
  {
    id: 2,
    title: 'Advanced JavaScript',
    description: 'Master modern JavaScript concepts including ES6+, async/await, closures, and design patterns. Build complex applications with confidence.',
    duration: '150 hours',
    lessons: '95 course',
    rating: 4.7,
    level: 'Intermediate',
    thumbnail: 'https://res.cloudinary.com/dr5pehdsw/image/upload/v1755702051/Advanced_JavaScript_eff1nh.webp'
  },
  {
    id: 3,
    title: 'React Masterclass',
    description: 'Become a React expert by building real-world applications. Learn hooks, context API, and advanced state management techniques.',
    duration: '180 hours',
    lessons: '110 course',
    rating: 4.8,
    level: 'Advanced',
    thumbnail: 'https://res.cloudinary.com/dr5pehdsw/image/upload/v1755702051/React_Masterclass_j1rmj1.webp'
  },
  {
    id: 4,
    title: 'Node.js Backend Development',
    description: 'Build scalable server-side applications with Node.js. Learn Express, REST APIs, authentication, and database integration.',
    duration: '160 hours',
    lessons: '90 course',
    rating: 4.6,
    level: 'Intermediate',
    thumbnail: 'https://res.cloudinary.com/dr5pehdsw/image/upload/v1755702051/Node.js_Backend_Development_zpstbw.webp'
  },
  {
    id: 5,
    title: 'Blockchain Fullcourse',
    description: 'Comprehensive guide to blockchain technology. Learn how decentralized systems work, explore smart contracts, consensus mechanisms, and build your own blockchain-based applications from scratch.',
    duration: '140 hours',
    lessons: '85 course',
    rating: 4.9,
    level: 'Beginner',
    thumbnail: 'https://res.cloudinary.com/dr5pehdsw/image/upload/v1755702051/Blockchain_Fullcourse_qihhwm.webp'
  },
  {
    id: 6,
    title: 'Mobile App Development',
    description: 'Build cross-platform mobile applications using React Native. Learn to create performant apps for both iOS and Android.',
    duration: '200 hours',
    lessons: '120 course',
    rating: 4.7,
    level: 'Advanced',
    thumbnail: 'https://res.cloudinary.com/dr5pehdsw/image/upload/v1755702051/Mobile_App_Development_atiije.webp'
  },
];

const Course = () => {
  const [showAll, setShowAll] = React.useState(false);
  
  const toggleShowAll = (e) => {
    e.preventDefault();
    setShowAll(!showAll);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          {showAll ? 'All Courses' : 'My Course'}
        </h1>
        {!showAll && (
          <button 
            onClick={toggleShowAll}
            className="text-white hover:text-purple-400 transition-colors duration-300 flex items-center group"
          >
            See all
            <svg 
              className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {showAll ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={toggleShowAll}
              className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300"
            >
              Show Less
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* My Courses Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6">Continue Learning</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.slice(0, 1).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>

          {/* Personalized Certification Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-white mb-6">Personalized for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.slice(1).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Helper function to get the first video URL for a course
const getFirstVideoUrl = (courseId) => {
  const course = courses.find(c => c.id === courseId);
  if (course && course.sessions && course.sessions.length > 0 && 
      course.sessions[0].videos && course.sessions[0].videos.length > 0) {
    return course.sessions[0].videos[0].url;
  }
  return null;
};

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleCourseClick = (e) => {
    e.preventDefault();
    navigate(`/course/${course.id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(`/course/${course.id}`);
    }
  };

  return (
    <div
      onClick={handleCourseClick}
      onKeyDown={handleKeyDown}
      className="group bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col cursor-pointer border border-gray-700/50 hover:border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
      role="button"
      tabIndex={0}
    >
      {/* Thumbnail */}
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-40 object-cover"
      />

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-grow">
          <h3 className="text-xl font-semibold mb-2 text-white">{course.title}</h3>
          <p className="text-gray-300 mb-4 text-sm">{course.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
            <div className="space-x-4">
              <span>{course.duration}</span>
              <span>{course.lessons}</span>
            </div>
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              <span className="mr-2">{course.rating}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  course.level === 'Beginner'
                    ? 'bg-purple-100 text-purple-800'
                    : course.level === 'Intermediate'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {course.level}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-700">
          <button
            className="w-full py-2 border-2 border-purple-500 text-purple-500 rounded-lg font-medium hover:bg-purple-500 hover:text-white transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              // Redirect to the first video in the course
              const firstVideoUrl = getFirstVideoUrl(course.id);
              if (firstVideoUrl) {
                window.open(firstVideoUrl, '_blank');
              } else {
                // Fallback to course detail page if no video URL is found
                navigate(`/course/${course.id}`);
              }
            }}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Course;