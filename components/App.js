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
    
    // Mouse wheel scrolling - improved to allow vertical scrolling when needed
    const handleWheel = (e) => {
      // Allow natural vertical scrolling in these cases:
      // 1. When explicitly scrolling down with high intensity
      // 2. When carousel is at its leftmost position and trying to scroll left
      // 3. When carousel is at its rightmost position and trying to scroll right
      const isAtLeftEdge = scrollContainer.scrollLeft <= 0;
      const isAtRightEdge = scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10;
      const isScrollingDown = e.deltaY > 0;
      const isScrollingHorizontally = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const isHighIntensityVerticalScroll = Math.abs(e.deltaY) > 80;
      
      // Allow natural (vertical) scrolling when:
      if (
        (isScrollingDown && isHighIntensityVerticalScroll) || // Explicit downward scroll
        (isAtLeftEdge && e.deltaY < 0) || // At left edge and trying to scroll more left
        (isAtRightEdge && e.deltaY > 0) || // At right edge and trying to scroll more right
        isScrollingHorizontally // Already scrolling horizontally
      ) {
        // Don't prevent default to allow natural page scrolling
        return;
      }
      
      // Otherwise, convert to horizontal scroll
      e.preventDefault();
      scrollContainer.scrollLeft += e.deltaY;
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
      
      const scrollPosition = scrollContainer.scrollLeft;
      const containerWidth = scrollContainer.clientWidth;
      const totalWidth = scrollContainer.scrollWidth;
      
      // Calculate index based on scroll percentage
      const scrollPercentage = scrollPosition / (totalWidth - containerWidth);
      const index = Math.min(
        Math.floor(scrollPercentage * carouselContent.length),
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

  // New carousel content with size and row information
  const carouselContent = [
    // First row
    { 
      title: "Nature",
      description: "Lush green landscapes",
      size: "small",
      row: 1,
      bgColor: "#1e6643",
      bgImage: "url('/green-leaf.jpg')"
    },
    { 
      title: "Immersive Videos", 
      description: "Interactive storytelling", 
      size: "medium",
      row: 1,
      bgColor: "#4259a3",
      bgImage: "url('/head-fishbowl.jpg')"
    },
    { 
      title: "Silhouettes", 
      description: "Dramatic contrasts", 
      size: "large",
      row: 1, 
      bgColor: "#404347",
      bgImage: "url('/person-fish.jpg')"
    },
    { 
      title: "Clouds", 
      description: "Ethereal atmospheres", 
      size: "small",
      row: 1, 
      bgColor: "#a7bbc5",
      bgImage: "url('/clouds.jpg')"
    },
    // Second row
    { 
      title: "Pink Fluff", 
      description: "Soft cotton candy aesthetics", 
      size: "medium",
      row: 2, 
      bgColor: "#f9c5d1",
      bgImage: "url('/pink-cats.jpg')"
    },
    { 
      title: "Portraits", 
      description: "Capturing human emotions", 
      size: "small",
      row: 2, 
      bgColor: "#6a7d7f",
      bgImage: "url('/profile-girl.jpg')"
    },
    { 
      title: "Fashion", 
      description: "Bold style statements", 
      size: "large",
      row: 2, 
      bgColor: "#f2703c",
      bgImage: "url('/yellow-hat.jpg')"
    },
    { 
      title: "Meadows", 
      description: "Peaceful countryside", 
      size: "small",
      row: 2, 
      bgColor: "#7cad70",
      bgImage: "url('/meadow.jpg')"
    }
  ];

  // Generate masonry grid carousel items
  const renderCarouselItems = () => {
    // Split by rows
    const firstRow = carouselContent.filter(item => item.row === 1);
    const secondRow = carouselContent.filter(item => item.row === 2);
    
    const generateItems = (items) => {
      return items.map((item, i) => {
        // Set dynamic widths based on item size
        const getWidth = () => {
          switch(item.size) {
            case 'small': return 'w-[30vw] sm:w-[28vw] md:w-[22vw] lg:w-[18vw]';
            case 'medium': return 'w-[36vw] sm:w-[34vw] md:w-[28vw] lg:w-[24vw]';
            case 'large': return 'w-[50vw] sm:w-[45vw] md:w-[38vw] lg:w-[34vw]';
            default: return 'w-[30vw] sm:w-[25vw] md:w-[20vw]';
          }
        };
        
        return (
          <motion.div
            key={`${item.row}-${i}`}
            custom={i}
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className={`carousel-item flex-shrink-0 h-[32vh] rounded-xl relative overflow-hidden mx-2 ${getWidth()}`}
            style={{
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
              backgroundImage: item.bgImage || 'none',
              backgroundColor: item.bgColor,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-4 z-10">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + (i * 0.1), duration: 0.8 }}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-white">{item.title}</h3>
                <p className="text-white/80 text-sm sm:text-base">{item.description}</p>
              </motion.div>
            </div>
          </motion.div>
        );
      });
    };
    
    // Return both rows of items
    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">{generateItems(firstRow)}</div>
        <div className="flex gap-2 items-center">{generateItems(secondRow)}</div>
      </div>
    );
  };

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

      {/* Hero Section with Masonry Grid Carousel */}
      <section className="relative">
        {/* Horizontal Masonry Grid Carousel */}
        <div 
          ref={carouselRef}
          className="overflow-x-auto hide-scrollbar px-6 py-4 cursor-grab active:cursor-grabbing"
          style={{ 
            scrollSnapType: 'x mandatory', 
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth'
          }}
        >
          {renderCarouselItems()}
        </div>
        
        {/* Navigation Dots */}
        <div className="flex justify-center space-x-3 mt-6 mb-10">
          {Array.from({ length: Math.ceil(carouselContent.length / 4) }).map((_, i) => (
            <motion.button
              key={i}
              variants={dotVariants}
              initial="inactive"
              animate={activeIndex === i ? "active" : "inactive"}
              className={`w-4 h-4 rounded-full ${activeIndex === i ? 'bg-white' : 'bg-white/30'}`}
              onClick={() => {
                if (carouselRef.current) {
                  const scrollWidth = carouselRef.current.scrollWidth;
                  const viewportWidth = carouselRef.current.clientWidth;
                  const scrollableWidth = scrollWidth - viewportWidth;
                  const segmentWidth = scrollableWidth / (Math.ceil(carouselContent.length / 4) - 1 || 1);
                  
                  carouselRef.current.scrollTo({
                    left: i * segmentWidth,
                    behavior: 'smooth'
                  });
                }
              }}
            />
          ))}
        </div>
        
        {/* Vertical Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute left-1/2 bottom-2 transform -translate-x-1/2 flex flex-col items-center text-white/40 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-sm mb-1">Scroll Down</span>
          <svg 
            className="animate-bounce" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 4L12 20M12 20L18 14M12 20L6 14" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </section>
    </div>
  );
};

export default App;
