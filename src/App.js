import React, { useState, useEffect } from 'react';
import './App.css';
import HorizontalScroll from './components/horizontal_scroll/HorizontalScroll';
import Earring from './components/motion/Earring';

const imageList = [
  { url: '/images/earring1.jpg', description: 'Earring 1' },
  { url: '/images/earring2.jpg', description: 'Earring 2' },
  { url: '/images/earring3.jpg', description: 'Earring 3' },
  
];

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length);
    }, 3000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <HorizontalScroll imageList={imageList} />
     
    </div>
  );
};

export default App;