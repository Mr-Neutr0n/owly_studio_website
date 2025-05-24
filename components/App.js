import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';

const App = () => {
  const firstCarouselRef = useRef(null);
  const secondCarouselRef = useRef(null);
  const containerRef = useRef(null);
  const mouseTrailerRef = useRef(null);

  // Mouse trailer effect
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mouseTrailer = mouseTrailerRef.current;
    if (!mouseTrailer) return;
    
    const handleMouseMove = (e) => {
      // Smooth follow of mouse cursor
      mouseTrailer.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    
    const handleMouseEnter = () => {
      mouseTrailer.style.width = '60px';
      mouseTrailer.style.height = '60px';
      mouseTrailer.style.opacity = '0.2';
    };
    
    const handleMouseLeave = () => {
      mouseTrailer.style.width = '40px';
      mouseTrailer.style.height = '40px';
      mouseTrailer.style.opacity = '0.1';
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

  // Smooth horizontal scrolling with mouse wheel
  useEffect(() => {
    const containers = [firstCarouselRef.current, secondCarouselRef.current];
    
    const handleWheel = (container, evt) => {
      if (evt.deltaY !== 0) {
        if (container.scrollWidth > container.clientWidth) {
          evt.preventDefault();
          container.scrollLeft += evt.deltaY * 2;
        }
      }
    };
    
    containers.forEach(container => {
      if (container) {
        container.addEventListener('wheel', (evt) => handleWheel(container, evt), { passive: false });
      }
    });
    
    return () => {
      containers.forEach(container => {
        if (container) {
          container.removeEventListener('wheel', (evt) => handleWheel(container, evt));
        }
      });
    };
  }, []);

  // First row carousel items
  const firstRowItems = [
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnTi9ObB6CKmdepWh5YemACNwr1geXV366evtU1rBMQ26a3WtqF0UivgRASZMa3mkvUwugbeafKgRCQWy5O1Z9E5ZFjYTuNWz3JgDOe6CyfTlOz0G7JhW83x91JQ-zhuZhlGOSnUv-zTYQBQdwLRYzgQ5g8dYOeR4w8tNAdf0cbS6j0V-dUYfpe7rTXRKyp-v_BS9bDc3xCitYWhmgMsbZIwSGdTOX17p-Rd9TYQIDmabc0juElRPJ7AvF-g0wycZpzvq3c1-i7K6K',
      alt: 'Close-up of large green tropical leaves',
      width: 'auto'
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqRdgaNO1FwUtfztaYm15aleqA6C8JGSiVSiP2nML9BXRjUX3xdsCcAq6Fcn47q4uphNqHgM6RNaGv3EQTRG87x6oqFhPTRpPF7QOl6HRH5Y3d5G7EOCLdYApMEAnNOG5sgwaVD_IqogOLGt2A5KsnpcwUV0HCIFFttaBOcqJX6S2hKpR-R0_8_72Z4Z30IFDdBwmQvksAn8iTaxEQUJ0oPu5R6O8iBE4dD6N4Dfc1Yi7QqtnBEuF31cVbTJ9jT3FrfA9NWaGnixpL',
      alt: 'Woman with a goldfish bowl helmet',
      width: 'auto'
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2G3qqjfSeGow42ageSW482tAYG9ChYH0xbY3xipZHysw5ss6k7-ae5Kt-q_jGrACeWomXJr--pVQCSkieSggAjYruaJGKWIRChHOk5RUAt9viVJz6DwF-eWp7w0cEkg0_qDKT6zuIOLELVeJJQFVvqxwR7Po4PelMljikMRldIBnVqqzljDitveBrBv3tKjHtUxyjVxH9hCAeqYrd37Zudh-c8Cm27QagMuL0seUuWMhMgjWwTFEH8JPCZElmDvPdNcPuDKGLmBSf',
      alt: 'Silhouette of a man in an aquarium surrounded by sharks',
      width: '400px',
      maxWidth: '600px'
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFFq1uv3hnPUf-yc0UGdKKxK4cKpC4rUgtvGuZ7RBoqpk0nvxn8Ey07AyZ6ETmhSibycKcKA6HyGVzDl6-4Z3A6IKcfwOhtTI086mhcN8CSlNW2dmDPue0Hfg6sWsY_3TsOM4yWxF_-y7A40lPcRznUfl6xdB0ULr4fhr7qi5a7LeYcDk7AGJx1e-60ITBgTCQT5zIHpwBsruhdkE8KSwNp5VwdRyACMbbcl-2eohJsgtIdVK7CRChrBn2hOfyDdsOw0Bko_qpWa-w',
      alt: 'Person sitting among fluffy white clouds',
      width: 'auto'
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQkKKAvpbcU89BahG62w2jKoweRLLQq3A_bMCLvdQLNvu626yb5_cq-0P87T2n9H6wmcKD9-OzhVMLcMMrSa9kGz27U3NzvtEz1oJe6lWjH-70C_ZiWTNqOXOE_XYRTGAHC-hqeav1viAeojGijgHT9tVPhDshwXFxKAzd4v0ljX2dH2Tco1iq3Y1khPEX-wgmPJZvgxFX2GT8adPaqPZ81Zksnx603G3Fgf0vmzybGsidY6_SC3ziwaqXcSHQPXbf2w9TW2Kak9zA',
      alt: 'Lush green field with flowers',
      width: 'auto'
    }
  ];

  // Second row carousel items
  const secondRowItems = [
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa1SD7x3iR6c7yme_DfzCL-mTLuGKYxbrgp57wGgaEzTrgWopqqQ0Il8eEtAf3MyOkoJeMw4lH_cgpuPNJbcsTN9cbsvPIcTNCJrHqVvUUPT6TuDrMVBDEHZLOW9lDHR1CgIDz9FcutImyl4E5G93ZcrHFfWa2yJtp-7zjpm5hahqmxIGaJvZr2rhKSImXVs8cGh-s0QlppfVtcorcUGzLWK55XvGQB34p1zW4crA69_0KiDMHsSwGGyqTV21K5Kxo0Q84Q8foHfqM',
      alt: 'Woman with pink sunglasses and two fluffy white cats',
      width: 'auto'
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDM7oO9Rqk6_KYa8NBAXVwPklLk_XPHTp0cCWQR7CxzVMloFk3-2rnuI-bMkSRo4grDLefCnVPV-v2koRWUVAMDf-ofOB1oLiCbvc5DwDR0WajuZ2L35Eps5xwygIprc2IrB0G6G_92RQ67XeAD0fbJ7UJv__xAkYI10IQzqiBvTW8CsM1FphP05gBA-mr7K9rXyNe5joNhPLFMzXpMZklyXEscImapGE3omJ-4-4-qeW1tZVC2zQVoqbYkPp7KzeKOr7hk5XCMMwSm',
      alt: 'Woman looking up with soft lighting',
      width: 'auto'
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYuwewZ8sToUbmQowdvDNFCafHsRa0SOozDTUByP1jiLDUMLOYkNKEWRfrkLah3nxiGcGP4bmB8ZJNBrlsb5PXoIGkuzPBYVXleR3GW-N1vquocU7_6-KrOTQg2Rgiy1l8hx9RHhMD263vP2qp1mrtKzBlNJRccCYOKlrXdbTdDioeGYWf_eR1h0VQXH2xWpPtJZANbL6_Eiik8jbRV4-mVSmPBWVFDbR3BiNt5tMkzPQPrF52D2w58fO8tR-kPUEjCRmyxdzlJaj7',
      alt: 'Woman in a colorful puffer jacket holding flower props',
      width: '400px',
      maxWidth: '600px'
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaZ0R2oirq472m7HvohhsLlF59RIxzsBEOLDWIiGOxYRFMUtCgFrXLcC3Xv1bGRw-pGVfgO-FI_jpB9C5bXq3KBCfCjEY6xCka6rqwNcfkpDgJ9Cpq10rdDpQJb5OijY8Ha3Zenq4qcUWz3ssml5ycjaagPjE3GPjsPrF7lCITcs4Xg5UE8r9AlhwMdCjg977yQCxF5E6Phixrd6etqXBYRhUfw-hfrcPbraqZiEubY0B0x8BHcJ036AZcg8IqoyfJqRwT7nODFCCI',
      alt: 'Lush green field with flowers',
      width: 'auto'
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDKDSBslR7OaqUvCViEDUMvPpyBLrl0Un3lI_osVTcTcnoKslaAMAWVn-qT5LLPydFcOlry7LyPKbJh6xlgD2avobvwK2MLkRMq7EoUwbiPh3AqvPhnzts9iSeggq88g4TRbnxJj7R1lbbCNuteuAmUwgvhtiwmKk6819ecikJJcnA660YNtY2b-aYwvcoKXElmNRBS-Jz4AJPRXnwzqwwsXztvbCGPcZR-xhiy3obo0EikXOwYdTav6aV04Es6ZwiRMejeV7UhItW',
      alt: 'Close-up of large green tropical leaves',
      width: 'auto'
    }
  ];

  return (
    <div className="bg-gray-100 text-gray-800 font-sans" ref={containerRef}>
      <Head>
        <title>OWLY | Creative Studio</title>
        <meta name="description" content="Transforming ideas into visual experiences" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Mouse Trailer */}
      <div 
        ref={mouseTrailerRef} 
        className="hidden md:block pointer-events-none fixed w-10 h-10 rounded-full bg-white/10 mix-blend-difference z-50"
        style={{ transform: 'translate(-50%, -50%)', transition: 'width 0.3s, height 0.3s, opacity 0.3s' }}
      ></div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">OWLY</h1>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2">JOIN</button>
            <button className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">WAITLIST</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* First Carousel */}
        <div className="py-8">
          <div 
            ref={firstCarouselRef}
            className="flex overflow-x-auto pl-4 sm:pl-6 lg:pl-8 scrollbar-hide" 
            style={{ 
              scrollBehavior: 'smooth', 
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {firstRowItems.map((item, index) => (
              <div 
                key={`first-${index}`} 
                className="flex-none mr-4 rounded-xl overflow-hidden"
                style={{ 
                  width: item.width,
                  minWidth: item.width === 'auto' ? '250px' : item.width,
                  maxWidth: item.maxWidth,
                  height: '16rem',
                  transition: 'transform 0.3s ease'
                }}
              >
                <img 
                  src={item.image} 
                  alt={item.alt} 
                  className="w-full h-full object-cover"
                  style={{ transition: 'transform 0.3s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Second Carousel */}
        <div className="pb-8">
          <div 
            ref={secondCarouselRef}
            className="flex overflow-x-auto pl-4 sm:pl-6 lg:pl-8 scrollbar-hide" 
            style={{ 
              scrollBehavior: 'smooth', 
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {secondRowItems.map((item, index) => (
              <div 
                key={`second-${index}`} 
                className="flex-none mr-4 rounded-xl overflow-hidden"
                style={{ 
                  width: item.width,
                  minWidth: item.width === 'auto' ? '250px' : item.width,
                  maxWidth: item.maxWidth,
                  height: '20rem',
                  transition: 'transform 0.3s ease'
                }}
              >
                <img 
                  src={item.image} 
                  alt={item.alt} 
                  className="w-full h-full object-cover"
                  style={{ transition: 'transform 0.3s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Additional CSS for hiding scrollbars */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default App;
