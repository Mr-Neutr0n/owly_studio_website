import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ message: '', error: false });
  const [activeTab, setActiveTab] = useState('create');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const demoRef = useRef(null);
  const featuresRef = useRef(null);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const features = [
    {
      title: "One-Click Video Creation",
      description: "Generate any length, full HD videos from a single prompt.",
      icon: "🎬",
      color: "#FF8A8A"
    },
    {
      title: "Custom Styling",
      description: "Control the look and feel of your videos with personalized style settings.",
      icon: "🎨",
      color: "#64DFDF"
    },
    {
      title: "Character Consistency",
      description: "Maintain consistent character personalities and styles throughout your videos automatically.",
      icon: "🎭",
      color: "#FFD166"
    }
  ];

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setSubmitStatus({ message: 'Please enter your email address', error: true });
      return;
    }

    try {
      // Using mailto link to open the user's email client
      window.location.href = `mailto:hari@owly.kids?subject=Waitlist Signup&body=Please add ${email} to the Owly Studio waitlist.`;
      
      // Clear the form and show success message
      setEmail('');
      setSubmitStatus({ message: 'Thank you for joining our waitlist!', error: false });
      
      // Close the modal after a short delay
      setTimeout(() => {
        setShowModal(false);
        setSubmitStatus({ message: '', error: false });
      }, 3000);
      
    } catch (error) {
      setSubmitStatus({ message: 'Something went wrong. Please try again.', error: true });
    }
  };

  // Function to toggle the modal
  const toggleModal = () => {
    setShowModal(!showModal);
    // Reset the form when opening the modal
    if (!showModal) {
      setEmail('');
      setSubmitStatus({ message: '', error: false });
    }
  };

  // Scroll to section
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Video control functions
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Head>
        <title>Owly Studio</title>
        <meta name="description" content="Turn anything into video with Owly Studio" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </Head>

      {/* Navigation */}
      <nav className="bg-[#0f0f0f] shadow-sm py-4 px-6 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src="/owly_logo_big.png" alt="Owly Studio" className="h-10" />
          </div>
          <div className="hidden md:flex space-x-8">
            <button onClick={toggleModal} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:opacity-90 transition-all">
              Join Waitlist
            </button>
          </div>
          <button onClick={toggleModal} className="md:hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:opacity-90 transition-all">
            Join
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-16 pb-24 px-6">
        <div className="container mx-auto">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="order-2 md:order-1">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-300"
              >
                Redefine Video Creation with AI
              </motion.h1>
              <motion.p variants={fadeIn} className="text-xl text-white mb-8 opacity-90">
                Turn a single prompt into high-quality, full-length videos in minutes. Create captivating content for any purpose, faster and better than ever before.
              </motion.p>
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={toggleModal}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all shadow-lg"
                >
                  Get Early Access
                </button>
                <button 
                  onClick={() => scrollToSection(demoRef)}
                  className="bg-[#0f0f0f] text-white border border-[#222222] px-6 py-3 rounded-lg hover:bg-black transition-all"
                >
                  See How It Works
                </button>
              </motion.div>
            </motion.div>
            <motion.div variants={fadeIn} className="order-1 md:order-2 flex justify-center">
              <div className="relative w-full max-w-lg md:max-w-xl lg:max-w-xl">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-50"></div>
                <div className="relative">
                  <video 
                    ref={videoRef}
                    src="/demo.mp4" 
                    className="w-full rounded-lg shadow-2xl bg-[#0f0f0f] p-1"
                    autoPlay
                    muted
                    playsInline
                    loop
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/500x300?text=Owly+Studio+Demo";
                    }}
                  />
                  <div className="absolute bottom-3 right-3 flex space-x-2">
                    <button 
                      onClick={togglePlay} 
                      className="bg-black/70 p-2 rounded-full text-white hover:bg-black transition-colors"
                    >
                      {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    <button 
                      onClick={toggleMute} 
                      className="bg-black/70 p-2 rounded-full text-white hover:bg-black transition-colors"
                    >
                      {isMuted ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section ref={demoRef} className="py-20 px-6 bg-[#0f0f0f]">
        <div className="container mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeIn} className="text-3xl font-bold mb-4 text-white">See Owly in Action</motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-white max-w-2xl mx-auto opacity-80">
              Experience how easy it is to create professional videos with our AI-powered platform
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-black rounded-xl p-6 shadow-inner"
          >
            <div className="mb-6 flex border-b border-[#222222]">
              <button 
                onClick={() => setActiveTab('marketing')}
                className={`px-4 py-2 font-medium ${activeTab === 'create' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-white opacity-70 hover:opacity-100'}`}
              >
                Marketing
              </button>
              <button 
                onClick={() => setActiveTab('education')}
                className={`px-4 py-2 font-medium ${activeTab === 'customize' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-white opacity-70 hover:opacity-100'}`}
              >
                Education
              </button>
              <button 
                onClick={() => setActiveTab('fantasy')}
                className={`px-4 py-2 font-medium ${activeTab === 'export' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-white opacity-70 hover:opacity-100'}`}
              >
                Fantasy
              </button>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-[#0f0f0f] rounded-lg shadow-sm p-6"
              >
                {activeTab === 'marketing' && (
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-semibold mb-4 text-white">Describe Your Vision</h3>
                      <p className="text-white opacity-80 mb-4">
                        Simply describe what you want to create and our AI will generate the perfect video based on your prompt.
                      </p>
                      <div className="bg-black border border-[#222222] rounded-lg p-4">
                        <p className="text-white opacity-80 italic">
                          "Create a 2-minute product showcase for our new fitness app with energetic music and outdoor scenes"
                        </p>
                      </div>
                    </div>
                    <div className="bg-black h-64 rounded-lg flex items-center justify-center">
                      <p className="text-white opacity-50 font-medium">Demo Video Placeholder</p>
                    </div>
                  </div>
                )}
                
                {activeTab === 'education' && (
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-semibold mb-4 text-white">Describe Your Vision</h3>
                      <p className="text-white opacity-80 mb-4">
                        Simply describe what you want to create and our AI will generate the perfect video based on your prompt.
                      </p>
                      <div className="bg-black border border-[#222222] rounded-lg p-4">
                        <p className="text-white opacity-80 italic">
                          "Create a 2-minute product showcase for our new fitness app with energetic music and outdoor scenes"
                        </p>
                      </div>
                    </div>
                    <div className="bg-black h-64 rounded-lg flex items-center justify-center">
                      <p className="text-white opacity-50 font-medium">Demo Video Placeholder</p>
                    </div>
                  </div>
                )}
                
                {activeTab === 'fantasy' && (
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-semibold mb-4 text-white">Describe Your Vision</h3>
                      <p className="text-white opacity-80 mb-4">
                        Simply describe what you want to create and our AI will generate the perfect video based on your prompt.
                      </p>
                      <div className="bg-black border border-[#222222] rounded-lg p-4">
                        <p className="text-white opacity-80 italic">
                          "Create a 2-minute product showcase for our new fitness app with energetic music and outdoor scenes"
                        </p>
                      </div>
                    </div>
                    <div className="bg-black h-64 rounded-lg flex items-center justify-center">
                      <p className="text-white opacity-50 font-medium">Demo Video Placeholder</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 px-6 bg-[#0f0f0f]">
        <div className="container mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeIn} className="text-3xl font-bold mb-4 text-white">Powerful Features</motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-white opacity-80 max-w-2xl mx-auto">
              Everything you need to create amazing videos with AI
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="bg-black rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow relative overflow-hidden group border border-[#222222]"
              >
                <div 
                  className="absolute top-0 left-0 w-1 h-full" 
                  style={{ backgroundColor: feature.color }}
                ></div>
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${feature.color}30` }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-white opacity-80">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-6 bg-[#0f0f0f]">
        <div className="container mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-black rounded-2xl p-8 md:p-12 shadow-sm border border-[#222222]"
          >
            <div className="grid md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-3">
                <h2 className="text-3xl font-bold mb-6 text-white">Ready to transform your video creation?</h2>
                <p className="text-xl text-white opacity-80 mb-8">
                  Join the waitlist today and be among the first to experience the future of AI-powered video creation with Owly Studio.
                </p>
                <button 
                  onClick={toggleModal}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all shadow-md"
                >
                  Join the Waitlist
                </button>
              </div>
              <div className="md:col-span-2 flex justify-center">
                <div className="bg-[#0f0f0f] p-6 rounded-lg shadow-md max-w-sm border border-[#222222]">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-black rounded-full">
                      <img src="/man_icon.webp" alt="Aadith VA" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Aadith VA</p>
                      <p className="text-white opacity-60 text-sm">CEO @ Owly Studio</p>
                    </div>
                  </div>
                  <p className="text-white opacity-80 italic">
                    "We're building Owly Studio to empower creators to produce better videos faster than ever before. Our AI understands your vision and brings it to life in seconds."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-6 border-t border-[#222222]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <img src="/owly_logo_big.png" alt="Owly Studio" className="h-10 mb-4" />
              <p className="text-white opacity-60 max-w-xs">
                AI-powered video creation platform for literally anyone.
              </p>
            </div>
            <div className="text-center md:text-right">
              <button onClick={toggleModal} className="text-white hover:text-purple-300 transition-colors mb-2 inline-block">
                Join Waitlist
              </button>
              <p className="text-white opacity-40 text-sm">
                © {new Date().getFullYear()} All rights reserved. Owly Studio.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Waitlist Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            {/* Modal Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80" 
              onClick={toggleModal}
            ></motion.div>
            
            {/* Modal Content */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-[#0f0f0f] p-8 rounded-xl shadow-xl z-10 max-w-md w-full mx-4 relative border border-[#222222]"
            >
              {/* Close Button */}
              <button 
                className="absolute top-4 right-4 text-white opacity-60 hover:opacity-100"
                onClick={toggleModal}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-black border border-[#222222]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-white">Get Early Access</h3>
                <p className="text-white opacity-80">Join the waitlist and be among the first to experience Owly Studio.</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full px-4 py-3 rounded-lg bg-black border border-[#222222] text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-all"
                >
                  Join Waitlist
                </button>
                {submitStatus.message && (
                  <p className={`mt-4 text-sm text-center ${submitStatus.error ? 'text-red-400' : 'text-green-400'}`}>
                    {submitStatus.message}
                  </p>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
