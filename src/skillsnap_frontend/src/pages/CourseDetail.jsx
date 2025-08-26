import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PaymentModal from '../components/PaymentModal';

const courses = [
  {
    id: 1,
    title: 'UI Design Fundamental',
    description: 'A beginner-friendly guide to UI design essentials. Learn how to create clean, user-friendly interfaces using core principles like layout, hierarchy, color, and typography.',
    duration: '120 hours',
    lessons: '80 course',
    rating: 4.5,
    level: 'Beginner',
    thumbnail: 'https://res.cloudinary.com/dr5pehdsw/image/upload/v1755737708/64c00daed63bef0e1a4cfc3dca3033760fa02447_aggnyq.png',
    fullDescription: 'Lorem ipsum dolor sit amet consectetur. Lobortis id mattis nibh mi semper nunc sit nulla magna. Mauris proin turpis ut pretium id est. Fringilla purus ornare lacus arcu et vitae bibendum donec euismod.',
    whatYoullLearn: [
      'UI/UX Design',
      'Prototyping',
      'Wireframe',
      'Storyboarding'
    ],
    tools: ['Figma', 'Sketch', 'Notion'],
    sessions: [
      {
        title: 'Introduction',
        description: 'Lorem ipsum dolor sit amet consectetur. Nam facilisis ultrices dapibus imperdiet tellus.',
        videos: [
          { title: 'Video 1: Welcome', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 2: Basics', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 3: Overview', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 4: Setup', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 5: First Steps', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ],
        tests: 3,
        hours: 4
      },
      {
        title: 'Design Principles',
        description: 'Learn the core principles of good design and how to apply them.',
        videos: [
          { title: 'Video 1: Principle 1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 2: Principle 2', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 3: Principle 3', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 4: Application', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 5: Examples', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 6: Practice', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ],
        tests: 2,
        hours: 5
      },
      {
        title: 'Advanced Techniques',
        description: 'Master advanced UI design techniques and workflows.',
        videos: [
          { title: 'Video 1: Technique 1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 2: Technique 2', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 3: Technique 3', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 4: Workflow 1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 5: Workflow 2', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 6: Advanced Tips', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 7: Case Study', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ],
        tests: 4,
        hours: 6
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
    thumbnail: 'https://res.cloudinary.com/dr5pehdsw/image/upload/v1755702051/Advanced_JavaScript_eff1nh.webp',
    fullDescription: 'Lorem ipsum dolor sit amet consectetur. Lobortis id mattis nibh mi semper nunc sit nulla magna. Mauris proin turpis ut pretium id est. Fringilla purus ornare lacus arcu et vitae bibendum donec euismod.',
    whatYoullLearn: [
      'ES6+ Features',
      'Async Programming',
      'Design Patterns',
      'Module Systems'
    ],
    tools: ['VS Code', 'Node.js', 'Webpack'],
    sessions: [
      {
        title: 'Introduction',
        description: 'Lorem ipsum dolor sit amet consectetur. Nam facilisis ultrices dapibus imperdiet tellus.',
        videos: [
          { title: 'Video 1: JS Basics Review', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 2: ES6 Intro', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 3: Setup', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 4: Environment', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 5: First Code', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ],
        tests: 3,
        hours: 4
      },
      {
        title: 'Core Concepts',
        description: 'Dive into advanced JavaScript fundamentals.',
        videos: [
          { title: 'Video 1: Closures', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 2: Async/Await', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 3: Promises', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 4: Modules', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 5: ES6 Features', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 6: Practice', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ],
        tests: 2,
        hours: 5
      },
      {
        title: 'Advanced Topics',
        description: 'Explore patterns and best practices.',
        videos: [
          { title: 'Video 1: Design Patterns', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 2: Singleton', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 3: Observer', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 4: Factory', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 5: Best Practices', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 6: Optimization', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 7: Case Study', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ],
        tests: 4,
        hours: 6
      }
    ]
  },
  {
    id: 3,
    title: 'React Masterclass',
    description: 'Become a React expert by building real-world applications. Learn hooks, context API, and advanced state management techniques.',
    duration: '180 hours',
    lessons: '110 course',
    rating: 4.8,
    level: 'Advanced',
    thumbnail: 'https://res.cloudinary.com/dr5pehdsw/image/upload/v1755702051/React_Masterclass_j1rmj1.webp',
    fullDescription: 'Lorem ipsum dolor sit amet consectetur. Lobortis id mattis nibh mi semper nunc sit nulla magna. Mauris proin turpis ut pretium id est. Fringilla purus ornare lacus arcu et vitae bibendum donec euismod.',
    whatYoullLearn: [
      'React Hooks',
      'Context API',
      'State Management',
      'Performance Optimization'
    ],
    tools: ['React', 'Redux', 'Vite'],
    sessions: [
      {
        title: 'Introduction',
        description: 'Lorem ipsum dolor sit amet consectetur. Nam facilibus ultrices dapibus imperdiet tellus.',
        videos: [
          { title: 'Video 1: React Basics', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 2: Setup', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 3: Components', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 4: Props', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 5: State', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ],
        tests: 3,
        hours: 4
      },
      {
        title: 'Core React',
        description: 'Master components and hooks.',
        videos: [
          { title: 'Video 1: Hooks Intro', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 2: useState', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 3: useEffect', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 4: Custom Hooks', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 5: Context API', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 6: Practice', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ],
        tests: 2,
        hours: 5
      },
      {
        title: 'Advanced React',
        description: 'Build complex apps with best practices.',
        videos: [
          { title: 'Video 1: Redux', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 2: State Management', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 3: Optimization', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 4: Routing', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 5: Testing', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 6: Deployment', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 7: Project', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ],
        tests: 4,
        hours: 6
      }
    ]
  },
  {
    id: 4,
    title: 'Node.js Backend Development',
    description: 'Build scalable server-side applications with Node.js. Learn Express, REST APIs, authentication, and database integration.',
    duration: '160 hours',
    lessons: '90 course',
    rating: 4.6,
    level: 'Intermediate',
    thumbnail: 'https://res.cloudinary.com/dr5pehdsw/image/upload/v1755702051/Node.js_Backend_Development_zpstbw.webp',
    fullDescription: 'Lorem ipsum dolor sit amet consectetur. Lobortis id mattis nibh mi semper nunc sit nulla magna. Mauris proin turpis ut pretium id est. Fringilla purus ornare lacus arcu et vitae bibendum donec euismod.',
    whatYoullLearn: [
      'Express Framework',
      'REST APIs',
      'Authentication',
      'Database Integration'
    ],
    tools: ['Node.js', 'Express', 'MongoDB'],
    sessions: [
      {
        title: 'Introduction',
        description: 'Lorem ipsum dolor sit amet consectetur. Nam facilitus ultrices dapibus imperdiet tellus.',
        videos: [
          { title: 'Video 1: Node Basics', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 2: Setup', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 3: Modules', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 4: Events', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 5: Streams', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ],
        tests: 3,
        hours: 4
      },
      {
        title: 'Server Basics',
        description: 'Set up Node.js servers and routes.',
        videos: [
          { title: 'Video 1: Express Intro', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 2: Routing', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 3: Middleware', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 4: REST APIs', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 5: Error Handling', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 6: Practice', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ],
        tests: 2,
        hours: 5
      },
      {
        title: 'Advanced Backend',
        description: 'Implement security and scaling.',
        videos: [
          { title: 'Video 1: Authentication', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 2: JWT', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 3: Database Integration', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 4: MongoDB', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 5: Scaling', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 6: Security', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 7: Deployment', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ],
        tests: 4,
        hours: 6
      }
    ]
  },
  {
    id: 5,
    title: 'Blockchain Fullcourse',
    description: 'Comprehensive guide to blockchain technology. Learn how decentralized systems work, explore smart contracts, consensus mechanisms, and build your own blockchain-based applications from scratch.',
    duration: '140 hours',
    lessons: '85 course',
    rating: 4.9,
    level: 'Beginner',
    thumbnail: 'https://res.cloudinary.com/dr5pehdsw/image/upload/v1755702051/Blockchain_Fullcourse_qihhwm.webp',
    fullDescription: 'Lorem ipsum dolor sit amet consectetur. Lobortis id mattis nibh mi semper nunc sit nulla magna. Mauris proin turpis ut pretium id est. Fringilla purus ornare lacus arcu et vitae bibendum donec euismod.',
    whatYoullLearn: [
      'Blockchain Basics',
      'Smart Contracts',
      'Decentralized Applications (DApps)',
      'Cryptocurrency & Tokens'
    ],
    tools: ['Solidity', 'Remix IDE', 'MetaMask'],
    sessions: [
      {
        title: 'Introduction',
        description: 'Lorem ipsum dolor sit amet consectetur. Nam facilisis ultrices dapibus imperdiet tellus.',
        videos: [
          { title: 'Video 1: Blockchain Intro', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 2: History', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 3: Concepts', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 4: Setup', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 5: First Block', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ],
        tests: 3,
        hours: 4
      },
      {
        title: 'Design Fundamentals',
        description: 'Learn basic principles and tools.',
        videos: [
          { title: 'Video 1: Consensus', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 2: Proof of Work', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 3: Proof of Stake', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 4: Smart Contracts', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 5: Solidity Basics', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 6: Practice', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ],
        tests: 2,
        hours: 5
      },
      {
        title: 'Advanced Design',
        description: 'Apply principles to real projects.',
        videos: [
          { title: 'Video 1: DApps', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 2: Tokens', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 3: ERC20', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 4: NFTs', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 5: Deployment', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 6: Security', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 7: Project', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ],
        tests: 4,
        hours: 6
      }
    ]
  },
  {
    id: 6,
    title: 'Mobile App Development',
    description: 'Build cross-platform mobile applications using React Native. Learn to create performant apps for both iOS and Android.',
    duration: '200 hours',
    lessons: '120 course',
    rating: 4.7,
    level: 'Advanced',
    thumbnail: 'https://res.cloudinary.com/dr5pehdsw/image/upload/v1755702051/Mobile_App_Development_atiije.webp',
    fullDescription: 'Lorem ipsum dolor sit amet consectetur. Lobortis id mattis nibh mi semper nunc sit nulla magna. Mauris proin turpis ut pretium id est. Fringilla purus ornare lacus arcu et vitae bibendum donec euismod.',
    whatYoullLearn: [
      'React Native Basics',
      'Cross-Platform Development',
      'Native Modules',
      'App Deployment'
    ],
    tools: ['React Native', 'Expo', 'Android Studio'],
    sessions: [
      {
        title: 'Introduction',
        description: 'Lorem ipsum dolor sit amet consectetur. Nam facilisis ultrices dapibus imperdiet tellus.',
        videos: [
          { title: 'Video 1: RN Intro', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 2: Setup', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 3: Components', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 4: Navigation', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 5: Styling', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ],
        tests: 3,
        hours: 4
      },
      {
        title: 'Core Development',
        description: 'Build mobile UIs and logic.',
        videos: [
          { title: 'Video 1: State Management', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 2: API Integration', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 3: Native Modules', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 4: Gestures', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 5: Animations', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 6: Practice', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ],
        tests: 2,
        hours: 5
      },
      {
        title: 'Advanced Mobile',
        description: 'Optimize and deploy apps.',
        videos: [
          { title: 'Video 1: Performance', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 2: Testing', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 3: Deployment iOS', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 4: Deployment Android', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 5: CI/CD', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 6: Security', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Video 7: Project', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ],
        tests: 4,
        hours: 6
      }
    ]
  }
];

const CourseDetail = () => {
  const { id } = useParams();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const course = courses.find(c => c.id === parseInt(id));

  const handleEnrollClick = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsPaymentModalOpen(false);
    setIsEnrolled(true);
    // Here you would typically make an API call to register the user for the course
  };

  const openVideoModal = (url) => {
    setSelectedVideo(url);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  if (!course) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-white">Course not found</h2>
        <Link to="/course" className="text-purple-400 hover:underline mt-4 inline-block">
          Back to courses
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-gray-800 rounded-xl p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold text-white mb-4">{course.title}</h1>
            <p className="text-gray-300 mb-6">{course.fullDescription}</p>
            <div className="flex items-center space-x-4 mb-6">
              <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
                {course.level}
              </span>
              <span className="text-gray-400">{course.duration}</span>
              <span className="text-gray-400">{course.lessons}</span>
            </div>
            {isEnrolled ? (
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium">
                You're enrolled in this course!
              </div>
            ) : (
              <button
                onClick={handleEnrollClick}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Enroll now!
              </button>
            )}

            <PaymentModal
              isOpen={isPaymentModalOpen}
              onClose={() => setIsPaymentModalOpen(false)}
              onSuccess={handlePaymentSuccess}
              courseTitle={course?.title}
              courseData={course}
              price="IDR 199,000"
            />
          </div>
          <div className="md:w-1/3">
            <div className="bg-gray-700 p-6 rounded-lg h-full">
              <h3 className="text-lg font-semibold text-white mb-4">Shareable Certificate</h3>
              <p className="text-gray-300 mb-4">Earn a certificate upon completion that you can share with your professional network.</p>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">★★★★★</span>
                <span className="text-gray-400">({course.rating})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
            <h3 className="text-xl font-semibold text-white mb-4">Improving skill for</h3>
            <p className="text-gray-300 mb-6">
              Lorem ipsum dolor sit amet consectetur. In est nulla arcu tempus sed id. Quisque pulvinar et lorem nunc pulvinar non facilisi ornare. Faucibus velit odio et ut. Montes mauris dignissim ultrices dui in ullamcorper sem vestibulum id. Iaculis sed orci sapien pulvinar donec scelerisque augue. In morbi tristique ornare fusce eu. Netus viverra eget sollicitudin lectus potenti sed id sollicitudin.
            </p>
            <p className="text-gray-300 mb-6">
              Laoreet quis vestibulum dui vitae sem. Tellus nulla ut rhoncus ipsum. Mauris adipiscing dui maecenas morbi ipsum ullamcorper fusce elementum. Condimentum fringilla nunc in cras risus convallis nunc massa. Aliquam blandit suspendisse faucibus arcu. Urna eget aliquam nec ullamcorper malesuada. Est et lacus pretium amet. Massa at natoque vivamus blandit egestas nunc quam dolor. Semper sed tempor enim ut massa diam nibh elementum. Sodales felis mattis elementum in aliquam urna quis dolor vehicula. Neque iaculis eget ultrices dictumst faucibus id in. Integer venenatis dolor in vel. Ultrices malesuada massa donec aliquam lectus orci sit.
            </p>
            <p className="text-gray-300">
              Tellus netus donec nascetur dictum commodo ultrices. Leo sed dis ultrices adipiscing pellentesque. Sagittis malesuada nisl tristique ultrices a. Ultrices lectus aliquam vitae amet mus in tincidunt ac. Urna est aliquet ut in nisi egestas ultricies. Quis id justo arcu tellus natoque. Eu at enim cras ut sed mauris tristique ornare. Amet ante aliquet augue dapibus et mauris adipiscing. Vitae sapien sit vel lacus nunc pellentesque faucibus. Lectus amet donec suspendisse velit. Id sapien scelerisque at in urna enim. Tempus tortor vitae lorem placerat. Risus vitae fermentum ut faucibus.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">What you'll learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.whatYoullLearn.map((skill, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Tools for learn</h2>
            <div className="flex flex-wrap gap-4">
              {course.tools.map((tool, index) => (
                <span key={index} className="px-4 py-2 bg-gray-700 text-white rounded-full">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-xl p-6 sticky top-6">
            <h2 className="text-xl font-bold text-white mb-6">Course session</h2>
            <div className="space-y-4">
              {course.sessions.map((session, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">{session.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{session.description}</p>
                  <div className="space-y-2 mb-3">
                    {session.videos.map((video, vIndex) => (
                      <button
                        key={vIndex}
                        onClick={() => openVideoModal(video.url)}
                        className="w-full text-left text-blue-400 hover:text-blue-300 text-sm"
                      >
                        {video.title}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{session.videos.length} Videos</span>
                    <span>{session.tests} Tests</span>
                    <span>{session.hours} Hours</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-4 rounded-lg max-w-4xl w-full">
            <div className="flex justify-end mb-2">
              <button onClick={closeVideoModal} className="text-white hover:text-gray-300">
                Close
              </button>
            </div>
            <iframe
              width="100%"
              height="500"
              src={selectedVideo}
              title="Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;