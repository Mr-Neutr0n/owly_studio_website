import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const AboutPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ message: '', error: false });

  useEffect(() => {
    // Check for saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };

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
      // Option 1: Using mailto link to open the user's email client
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

  return (
    <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 font-sans min-h-screen transition-colors duration-200">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-6 shadow-md sticky top-0 bg-white dark:bg-slate-800/90 backdrop-blur-sm z-50 transition-colors duration-200 border-b border-transparent dark:border-slate-700/50">
        <Link href="/" className="text-2xl font-bold tracking-tight hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
          Owly Studio
        </Link>
        <nav className="flex items-center space-x-6 text-base font-medium">
          <Link href="/about" className="text-indigo-600 dark:text-indigo-400">
            About
          </Link>
          <button 
            onClick={toggleDarkMode}
            className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          <button
            onClick={toggleModal}
            className="text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 px-5 py-3 rounded-lg text-base font-medium shadow-sm hover:shadow-md transition-all duration-200"
          >
            Join Waitlist
          </button>
        </nav>
      </header>

      {/* About Content */}
      <section className="px-6 py-20 bg-gray-50 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-800 text-center transition-colors duration-200">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">About Owly Studio</h1>
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-slate-700">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-300">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-200 mb-6 leading-relaxed">
              Owly is built by a team of creatives and engineers obsessed with making video generation intuitive and powerful. We're leveraging open source models with our proprietary engine for lightning-fast generation at an extremely low cost.
            </p>
            <p className="text-gray-600 dark:text-gray-200 leading-relaxed">
              Our goal is to democratize video creation, allowing anyone to bring their ideas to life without specialized skills or expensive equipment.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-slate-700">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-300">Our Team</h2>
            <p className="text-gray-600 dark:text-gray-200 mb-6 leading-relaxed">
              We're a diverse team of AI researchers, designers, and filmmakers united by our passion for creative technology.
            </p>
            <p className="text-gray-600 dark:text-gray-200 leading-relaxed">
              With backgrounds spanning computer vision, natural language processing, and cinematic arts, we're uniquely positioned to build the future of AI-powered video creation.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-slate-700">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-300">Our Technology</h2>
            <p className="text-gray-600 dark:text-gray-200 mb-6 leading-relaxed">
              Owly combines state-of-the-art open source models with our proprietary optimization techniques to deliver video generation that's both fast and affordable.
            </p>
            <p className="text-gray-600 dark:text-gray-200 leading-relaxed">
              We're constantly researching and improving our systems to provide the highest quality output with the most intuitive user experience.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 dark:text-gray-400 py-10 border-t border-gray-200 dark:border-slate-700/50 bg-white dark:bg-slate-800 transition-colors duration-200">
        © {new Date().getFullYear()} Owly Studio. All rights reserved.
      </footer>

      {/* Waitlist Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Modal Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={toggleModal}
          ></div>
          
          {/* Modal Content */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl z-10 max-w-md w-full mx-4 relative border dark:border-slate-700">
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={toggleModal}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Get Early Access</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Join the waitlist and be among the first to experience prompt-based video generation.</p>
            
            <form onSubmit={handleSubmit}>
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 mb-4 transition-all duration-200"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white py-3 rounded-lg font-medium shadow-sm hover:shadow transition-all duration-200"
              >
                Join Waitlist
              </button>
              {submitStatus.message && (
                <p className={`mt-4 text-sm ${submitStatus.error ? 'text-red-500' : 'text-green-500'}`}>
                  {submitStatus.message}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage; 