import React, { useState, useEffect } from 'react';

const TypingAnimation = ({ text, onComplete, speed = 30 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (isTyping) {
      setIsTyping(false);
      if (onComplete) onComplete();
    }
  }, [currentIndex, text, speed, isTyping, onComplete]);

  // Add blinking cursor effect
  const cursorClass = isTyping ? 'inline-block w-2 h-5 bg-blue-400 ml-1 animate-pulse' : 'hidden';

  return (
    <span>
      {displayedText}
      <span className={cursorClass} />
    </span>
  );
};

export default TypingAnimation;
