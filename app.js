import React, { useState, useEffect } from 'react';
import Head from 'next/head';

const App = () => {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ message: '', error: false });

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

  return (
    <div className="min-h-screen bg-black text-white font-sans flex">
      <Head>
        <title>Owly Studio</title>
        <meta name="description" content="Turn anything into video with Owly Studio" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </Head>

      <div className="max-w-3xl mx-auto px-6 py-16 md:py-32">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-60 h-24">
            {/* Logo will be added by user later */}
            <img src="/owly_logo_big.png" alt="Owly Studio" className="w-full" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <p className="text-l">
              Join us on a journey to redefine how the world creates video.
            </p>

            <p className="text-l">
              AI will change this forever, and how we create and consume video will look completely different in 5 years time.
            </p>

            <p className="text-l">
              Not just more video, but better video – compelling, authentic, entertaining, and beautiful.
            </p>
          </div>

          <div className="space-y-8">
            <blockquote className="text-l">
              "Owly Studio is an AI-powered platform that turns a single prompt into high-quality, full-length videos in minutes. Whether you're creating for content, marketing, or education, we help you do it faster, cheaper, and better.

              <p className="mt-4">Any video, any length, powered by AI."</p>
            </blockquote>

            <div className="flex items-center space-x-4 mt-8">
              <div className="w-12 h-12 bg-gray-700 rounded-full"><img src="/man_icon.webp" alt="Hari Karunanidhi" className="w-full h-full object-cover rounded-full" /></div>
              <div>
                <p className="font-semibold">Aadith VA</p>
                <p className="text-gray-400">CEO @ Owly Studio</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8">
          <button 
            onClick={toggleModal}
            className="inline-flex text-lg border-b border-teal-400 text-teal-400 hover:text-teal-300 hover:border-teal-300 transition-colors duration-200"
          >
            Join the waitlist
          </button>
        </div>

        <div className="pt-16 text-gray-500 text-sm text-center">
          © {new Date().getFullYear()} All rights reserved. Owly Studio.
        </div>
      </div>

      {/* Waitlist Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Modal Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80" 
            onClick={toggleModal}
          ></div>
          
          {/* Modal Content */}
          <div className="bg-gray-900 p-8 rounded-lg shadow-xl z-10 max-w-md w-full mx-4 relative border border-gray-800">
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-300"
              onClick={toggleModal}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-2xl font-semibold mb-4 text-white">Get Early Access</h3>
            <p className="text-gray-400 mb-6">Join the waitlist and be among the first to experience AI-powered video generation.</p>
            
            <form onSubmit={handleSubmit}>
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <button 
                type="submit" 
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium"
              >
                Join Waitlist
              </button>
              {submitStatus.message && (
                <p className={`mt-4 text-sm ${submitStatus.error ? 'text-red-500' : 'text-teal-400'}`}>
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

export default App;
