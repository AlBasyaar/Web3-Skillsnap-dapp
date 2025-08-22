import React, { useState } from 'react';
import { FiBell, FiCheck, FiX, FiChevronDown, FiChevronUp, FiExternalLink } from 'react-icons/fi';

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Course Available',
      message: 'Blockchain Development 101 has been added to your recommended courses.',
      time: '2h ago',
      read: false,
      type: 'course',
      link: '/course/blockchain-101'
    },
    {
      id: 2,
      title: 'Certificate Earned',
      message: 'Congratulations! You have completed the Web3 Fundamentals course.',
      time: '1d ago',
      read: false,
      type: 'achievement',
      link: '/profile/certificates'
    },
    {
      id: 3,
      title: 'Skill Assessment',
      message: 'Your skills in JavaScript have been updated based on recent activities.',
      time: '2d ago',
      read: true,
      type: 'skill',
      link: '/profile/skills'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const [showAll, setShowAll] = useState(false);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({
      ...n,
      read: true
    })));
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-300 hover:text-white"
      >
        <FiBell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 text-xs font-bold text-white bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-xl z-50 border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Notifications</h3>
              <div className="flex space-x-2">
                <button 
                  onClick={markAllAsRead}
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  Mark all as read
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-700 max-h-96 overflow-y-auto">
            {notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`p-4 hover:bg-gray-700 ${!notification.read ? 'bg-gray-750' : ''}`}
              >
                <div className="flex items-start">
                  <div className="text-2xl mr-3">
                    {notification.type === 'course' ? '📚' : 
                     notification.type === 'achievement' ? '🏆' : '🔔'}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium text-white">
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-300">
                      {notification.message}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {notification.time}
                      </span>
                      <a 
                        href={notification.link}
                        className="text-xs text-blue-400 hover:text-blue-300 flex items-center"
                        onClick={() => markAsRead(notification.id)}
                      >
                        View <FiExternalLink className="ml-1 w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
