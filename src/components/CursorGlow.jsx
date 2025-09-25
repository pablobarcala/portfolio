"use client"
import React, { useState, useEffect } from 'react';

const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', () => setIsVisible(true));

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', () => setIsVisible(true));
    };
  }, []);

  return (
    <div
      className={`cursor-glow ${isVisible ? 'visible' : ''} ${isClicking ? 'clicking' : ''}`}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      {/* Núcleo principal */}
      <div className="cursor-core" />
      {/* Ondas expansivas */}
      {/* <div className="cursor-ring ring-1" />
      <div className="cursor-ring ring-2" />
      <div className="cursor-ring ring-3" /> */}
    </div>
  );
};

export default CursorGlow;