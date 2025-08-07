import { useState, useRef, useEffect } from 'react';

export default function StoreLocator() {
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showError, setShowError] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Handle outside click + Escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsActive(false); // Animate text back down
        setInputValue(''); // Clear input when deactivating
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsActive(false);
        setInputValue(''); // Clear input when deactivating
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // Focus input when active
  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  return (
    <div className="relative w-[1680px] h-[204.5px] bg-white font-sans text-black flex flex-col items-center justify-center overflow-hidden">
      {/* Main container with fixed positioning */}
      <div className="w-[900px] relative flex flex-col items-center">
        {/* Grouped Find A Store elements */}
        <div className="relative flex flex-col items-center">
          {/* Animated Store Locator text */}
          <div
            ref={containerRef}
            onClick={() => {
              if (isActive) {
                setIsActive(false);
                setInputValue('');
              } else {
                setIsActive(true);
              }
            }}
            className={`transition-transform duration-500 ease-in-out cursor-pointer ${
              isActive ? 'translate-y-[-23px]' : 'translate-y-0'
            }`}
          >
            <h1 
              className="text-[32px] text-center"
              style={{ 
                color: inputValue.trim() !== '' ? 'rgba(128, 128, 128, 0.7)' : 'black',
                fontFamily: 'OldschoolGrotesk-CondensedLight, sans-serif'
              }}
            >
              Find A Store
            </h1>
          </div>
          
          {/* Fixed line position */}
          <div className="w-[900px] h-[1px] bg-black mt-4"></div>
          
          {/* Right arrow at the end of the line */}
          <div className="absolute top-[28px] right-0 w-9 h-9 flex items-center justify-center">
            <svg 
              viewBox="0 0 24 24" 
              className="w-[26px] h-[26px] fill-black cursor-pointer"
              onClick={() => {
                if (isActive) {
                  console.log('Arrow clicked, inputValue:', inputValue);
                  if (inputValue.trim() === '') {
                    console.log('Empty input detected, showing error');
                    setShowError(true);
                    setTimeout(() => setShowError(false), 3000); // Hide error after 3 seconds
                  } else {
                    // Handle enter action here
                    console.log('Arrow clicked with value:', inputValue);
                    setShowError(false);
                  }
                }
              }}
            >
              <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z"/>
            </svg>
          </div>
        </div>
        
        {/* Input field - positioned inside the line area */}
        {isActive && (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                console.log('Enter key pressed, inputValue:', inputValue);
                if (inputValue.trim() === '') {
                  console.log('Empty input detected, showing error');
                  setShowError(true);
                  setTimeout(() => setShowError(false), 3000);
                } else {
                  // Handle enter action here
                  console.log('Enter pressed with value:', inputValue);
                  setShowError(false);
                }
              }
            }}
            placeholder="Enter The Location"
            className="absolute top-[26px] left-0 w-[900px] bg-transparent text-white border-none outline-none text-center"
            style={{ 
              fontSize: '24px',
              fontWeight: '600',
              color: 'black',
              backgroundColor: 'transparent',
              fontFamily: 'Roboto, sans-serif'
            }}
          />
        )}
        
        {/* Error message */}
        {showError && (
          <div className="absolute top-[70px] left-0 w-[900px] flex justify-center z-50">
            <p 
              style={{ 
                fontSize: '16px',
                fontFamily: 'Roboto, sans-serif',
                color: '#DC2626'
              }}
            >
              This Field Can't Be Empty
            </p>
          </div>
        )}
        
        {/* Debug: Test button to show error */}
        <button 
          onClick={() => {
            console.log('Test button clicked, showError:', showError);
            setShowError(!showError);
          }}
          className="absolute top-[150px] left-0 bg-blue-500 text-white px-2 py-1 text-xs"
        >
          Test Error: {showError ? 'ON' : 'OFF'}
        </button>
      </div>
    </div>
  );
} 