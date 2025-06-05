'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Sono } from 'next/font/google';

const sono = Sono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prompt, setPrompt] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const handlePromptSubmit = (e) => {
    e.preventDefault();
    // Process the prompt input - for now just log it
    console.log('Prompt submitted:', prompt);
    // This could trigger a video generation process in the future
  };

  // Hide nextjs-portal via CSS
  useEffect(() => {
    // Add a style tag to hide nextjs-portal or adjust its position
    const style = document.createElement('style');
    style.innerHTML = `
      nextjs-portal {
        position: absolute !important;
        z-index: -1 !important;
        top: 0 !important;
        left: 0 !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        /* Make sure our content isn't affected by Next.js system elements */
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        
        nextjs-portal {
          position: absolute !important;
          z-index: -1 !important;
        }
      `}</style>
      
      <div className={`min-h-screen w-full bg-white ${sono.className}`}>
        {/* Header with logo and waitlist button */}
        <header className="fixed top-0 left-0 z-50 w-full mx-auto px-[10%] py-2 flex justify-between items-center bg-[rgba(255,255,255,0.38)]">
            <div className="logo">
              <Image 
                src="/images/owly-logo.png" 
                alt="OWLY" 
                width={90} 
                height={30} 
                priority
              />
            </div>
            <button 
              onClick={openModal}
              className="bg-[#1A2A3B] text-white px-5 py-1.5 rounded-md font-medium hover:bg-[#253c56] transition-colors"
            >
              JOIN WAITLIST
            </button>
        </header>

        {/* Hero section with video */}
        <section className="relative h-screen w-full overflow-hidden bg-teal-900">
          <div className="absolute inset-0">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              preload="auto"
              className="object-cover h-full w-full"
              poster="/images/video-poster.jpg"
            >
              <source src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
        
        {/* Content section below video */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 tracking-tighter">
              REDEFINE VIDEO CREATION WITH AI
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Turn a single prompt into high-quality, full-length videos in minutes. Create captivating content for any purpose.
            </p>
            
            <form onSubmit={handlePromptSubmit} className="w-full max-w-2xl mx-auto relative">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your video prompt here..."
                className="w-full px-6 py-4 rounded-full bg-white text-gray-900 pr-12 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#1A2A3B] text-white p-2 rounded-full hover:bg-[#253c56] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>
        </section>

        {/* Waitlist Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black bg-opacity-70" onClick={closeModal}></div>
            <div className="relative z-10 bg-black/80 p-8 rounded-lg max-w-md w-full backdrop-blur-sm">
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold mb-6 text-center text-white">Join Our Waitlist</h1>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1 text-white">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 bg-gray-800 rounded-md border border-gray-700 text-white"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1 text-white">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 bg-gray-800 rounded-md border border-gray-700 text-white"
                    placeholder="your@email.com"
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-[#1A2A3B] text-white font-medium py-2 rounded-md mt-4 hover:bg-[#253c56] transition-colors"
                >
                  Join Waitlist
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
} 