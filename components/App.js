import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Head from 'next/head';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const App = () => {
  const carouselRef = useRef(null);
  const containerRef = useRef(null);
  const mouseTrailerRef = useRef(null);
  const controls = useAnimation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  // Mouse trailer effect
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mouseTrailer = mouseTrailerRef.current;
    if (!mouseTrailer) return;
    
    const handleMouseMove = (e) => {
      // Smooth follow of mouse cursor
      gsap.to(mouseTrailer, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: 'power2.out'
      });
    };
    
    const handleMouseEnter = () => {
      gsap.to(mouseTrailer, {
        width: 60,
        height: 60,
        opacity: 0.2,
        duration: 0.3
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(mouseTrailer, {
        width: 40,
        height: 40,
        opacity: 0.1,
        duration: 0.3
      });
    };
    
    // Add event listeners for mouse movements
    document.addEventListener('mousemove', handleMouseMove);
    
    // Modify mouse trailer on hovering over buttons/links
    const interactiveElements = document.querySelectorAll('button, a');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Horizontal scroll effect with improved drag functionality
  useEffect(() => {
    if (!carouselRef.current || typeof window === 'undefined') return;
    
    const scrollContainer = carouselRef.current;
    
    // Mouse wheel scrolling - make horizontal
    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY;
      }
      updateActiveIndex();
    };
    
    // Touch and mouse drag with improved sensitivity
    const handleTouchStart = (e) => {
      setIsDragging(true);
      setStartX(e.clientX || e.touches[0].clientX);
    };
    
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const x = e.clientX || e.touches[0].clientX;
      const walk = (startX - x) * 1.5; // Increased sensitivity
      scrollContainer.scrollLeft += walk;
      setStartX(x);
    };
    
    const handleTouchEnd = () => {
      setIsDragging(false);
      updateActiveIndex();
    };
    
    // Update the active index based on scroll position
    const updateActiveIndex = () => {
      if (!scrollContainer) return;
      
      const itemWidth = scrollContainer.querySelector('.carousel-item')?.offsetWidth || 0;
      const scrollPosition = scrollContainer.scrollLeft;
      const index = Math.min(
        Math.floor(scrollPosition / (itemWidth * 0.8)),
        carouselContent.length - 1
      );
      setActiveIndex(index);
    };
    
    // Add event listeners
    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
    scrollContainer.addEventListener('mousedown', handleTouchStart);
    scrollContainer.addEventListener('touchstart', handleTouchStart);
    scrollContainer.addEventListener('mousemove', handleTouchMove);
    scrollContainer.addEventListener('touchmove', handleTouchMove);
    scrollContainer.addEventListener('mouseup', handleTouchEnd);
    scrollContainer.addEventListener('touchend', handleTouchEnd);
    scrollContainer.addEventListener('mouseleave', handleTouchEnd);
    scrollContainer.addEventListener('scroll', updateActiveIndex);
    
    return () => {
      // Remove event listeners
      scrollContainer.removeEventListener('wheel', handleWheel);
      scrollContainer.removeEventListener('mousedown', handleTouchStart);
      scrollContainer.removeEventListener('touchstart', handleTouchStart);
      scrollContainer.removeEventListener('mousemove', handleTouchMove);
      scrollContainer.removeEventListener('touchmove', handleTouchMove);
      scrollContainer.removeEventListener('mouseup', handleTouchEnd);
      scrollContainer.removeEventListener('touchend', handleTouchEnd);
      scrollContainer.removeEventListener('mouseleave', handleTouchEnd);
      scrollContainer.removeEventListener('scroll', updateActiveIndex);
    };
  }, [isDragging, startX]);

  // Parallax effect for header text
  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      }
    });
    
    tl.to(".header-text", {
      y: 100,
      opacity: 0,
      ease: "power2.inOut"
    });
    
    return () => {
      tl.kill();
    };
  }, []);

  // Animate items into view
  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }
    }));
  }, [controls]);

  // Generate carousel content (placeholder for now)
  const carouselContent = [
    { title: "Immersive Videos", description: "Interactive storytelling", bgColor: "#240046" },
    { title: "Fashion Campaigns", description: "Elegant brand stories", bgColor: "#3C096C" },
    { title: "Product Showcases", description: "Highlight your innovations", bgColor: "#5A189A" },
    { title: "Nature Documentaries", description: "Experience the wild", bgColor: "#7B2CBF" },
    { title: "Urban Explorations", description: "Cities from new perspectives", bgColor: "#9D4EDD" },
    { title: "Abstract Art", description: "Visual experiments", bgColor: "#C77DFF" }
  ];

  // Generate carousel items with better styling
  const carouselItems = carouselContent.map((item, i) => (
    <motion.div
      key={i}
      custom={i}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className={`carousel-item flex-shrink-0 w-[90vw] md:w-[80vw] lg:w-[60vw] h-[70vh] rounded-3xl relative overflow-hidden ${activeIndex === i ? 'scale-100 z-10' : 'scale-[0.92] opacity-80'}`}
      style={{
        backgroundColor: item.bgColor,
        marginRight: '4vw',
        transition: 'all 0.4s ease-out',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/40"></div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 10 }).map((_, idx) => (
            <div 
              key={idx} 
              className="absolute rounded-full" 
              style={{
                width: Math.random() * 300 + 50 + 'px',
                height: Math.random() * 300 + 50 + 'px', 
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: `translate(-50%, -50%)`
              }}
            />
          ))}
        </div>
        
        <span className="text-[120px] font-bold text-white/5">{i + 1}</span>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full p-10 z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 + (i * 0.1), duration: 0.8 }}
          className="max-w-xl"
        >
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-3">{item.title}</h3>
          <p className="text-white/80 text-xl">{item.description}</p>
        </motion.div>
      </div>
    </motion.div>
  ));

  // Animation for the navigation dots
  const dotVariants = {
    inactive: { scale: 1, opacity: 0.5 },
    active: { scale: 1.2, opacity: 1 }
  };

  return (
    <div className="bg-black text-white" ref={containerRef}>
      <Head>
        <title>OWLY | Creative Studio</title>
        <meta name="description" content="Transforming ideas into visual experiences" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Mouse Trailer */}
      <div ref={mouseTrailerRef} className="mouse-trailer hidden md:block"></div>

      {/* Grain Overlay */}
      <div className="grain-overlay"></div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.6, 0.05, -0.01, 0.9] }}
        className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="text-3xl font-bold tracking-tighter"
        >
          OWLY
        </motion.div>
        <div className="flex items-center space-x-3">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="py-2 px-8 rounded-full bg-white text-black font-semibold"
          >
            JOIN
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="py-2 px-8 rounded-full border border-white/20 font-semibold"
          >
            WAITLIST
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section with Horizontal Carousel */}
      <section className="relative min-h-screen">
        {/* Hero Text */}
        <div className="px-8 pt-32 pb-12 max-w-6xl mx-auto">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.6, 0.05, -0.01, 0.9] }}
            className="header-text text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight max-w-5xl mb-8"
          >
            Transform <span className="text-gradient-1">ideas</span> into <span className="text-gradient-2">experiences</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.6, 0.05, -0.01, 0.9] }}
            className="header-text text-xl md:text-2xl text-white/70 max-w-2xl"
          >
            Create stunning videos with AI. One prompt, endless possibilities.
          </motion.p>
        </div>
        
        {/* Horizontal Carousel with improved scrolling */}
        <div 
          ref={carouselRef}
          className="overflow-x-auto hide-scrollbar pl-8 flex py-10 cursor-grab active:cursor-grabbing"
          style={{ 
            scrollSnapType: 'x mandatory', 
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth'
          }}
        >
          {carouselItems}
        </div>
        
        {/* Navigation Dots - made more prominent */}
        <div className="flex justify-center space-x-3 mt-8 mb-16">
          {carouselContent.map((_, i) => (
            <motion.button
              key={i}
              variants={dotVariants}
              initial="inactive"
              animate={activeIndex === i ? "active" : "inactive"}
              className={`w-4 h-4 rounded-full ${activeIndex === i ? 'bg-white' : 'bg-white/30'}`}
              onClick={() => {
                if (carouselRef.current) {
                  const itemWidth = carouselRef.current.querySelector('.carousel-item').offsetWidth;
                  const margin = parseInt(window.getComputedStyle(carouselRef.current.querySelector('.carousel-item')).marginRight);
                  carouselRef.current.scrollTo({
                    left: i * (itemWidth + margin),
                    behavior: 'smooth'
                  });
                }
              }}
            />
          ))}
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="hidden md:flex absolute bottom-8 right-8 items-center text-white/50"
        >
          <span className="mr-2">Scroll</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 12L7 22M17 12L7 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
        
        {/* Mobile Scroll Instructions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="md:hidden text-center text-white/50 text-sm mt-4"
        >
          Swipe left to explore more
        </motion.div>
      </section>
    </div>
  );
};

export default App;
