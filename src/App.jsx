/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * React: The core React library - provides the framework for building UIs
 * useState: A React Hook that lets you add state to functional components
 *           State is data that can change over time and causes re-renders
 * 
 * youtubeLogoSvg: Importing the actual YouTube logo SVG file from assets
 *                 Using ?raw to get the SVG as a string so we can modify colors
 *                 This allows us to change the text color to white
 */
import React, { useState } from 'react';
import youtubeLogoSvg from './assets/YouTube_Logo_2017.svg?raw';

/**
 * ============================================================================
 * REUSABLE COMPONENTS
 * ============================================================================
 * Components are like custom HTML elements that you can reuse
 * They're JavaScript functions that return JSX (HTML-like syntax)
 */

/**
 * SearchIcon Component
 * --------------------
 * Magnifying glass icon for the search bar (filled version)
 * 
 * - fill="currentColor": Makes the icon use the text color from className
 *   This allows us to control the color via Tailwind's text-* classes (like text-white)
 * - pointer-events: none: Prevents the icon from blocking clicks on the input
 * - aria-hidden: true: Hides from screen readers (the input has its own label)
 */
const SearchIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    focusable="false"
    aria-hidden="true"
    className={className}
    style={{ pointerEvents: 'none', display: 'block' }}
  >
    <path
      clipRule="evenodd"
      d="M16.296 16.996a8 8 0 11.707-.708l3.909 3.91-.707.707-3.909-3.909zM18 11a7 7 0 00-14 0 7 7 0 1014 0z"
      fillRule="evenodd"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.5"
    />
  </svg>
);

/**
 * SearchIconOutline Component
 * --------------------
 * Magnifying glass icon with thin outline/stroke (for the search button)
 * 
 * - Uses stroke instead of fill for an outline effect
 * - stroke="currentColor": Makes the stroke use the text color from className
 * - strokeWidth="1": Thin stroke for a clean outline look (not thick)
 */
const SearchIconOutline = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    focusable="false"
    aria-hidden="true"
    className={className}
    style={{ pointerEvents: 'none', display: 'inherit', width: '100%', height: '100%' }}
  >
    <path
      clipRule="evenodd"
      d="M16.296 16.996a8 8 0 11.707-.708l3.909 3.91-.707.707-3.909-3.909zM18 11a7 7 0 00-14 0 7 7 0 1014 0z"
      fillRule="evenodd"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);

/**
 * YouTubeLogo Component
 * --------------------
 * This component displays the YouTube logo from the SVG asset file
 * 
 * Using the actual SVG file and processing it to make the text white
 * - dangerouslySetInnerHTML: React's way to inject raw HTML/SVG content
 * - We process the SVG string to change text colors to white
 * - The play button stays red (original color is preserved)
 * 
 * Approach:
 * 1. Import SVG as raw string using ?raw
 * 2. Process the SVG string to replace non-red fills with white
 * 3. Inject the processed SVG into the DOM
 * 4. Use CSS to ensure proper sizing and styling
 */
const YouTubeLogo = () => {
  /**
   * Check if the SVG was imported correctly
   * If it's undefined or not a string, return a fallback
   */
  if (!youtubeLogoSvg || typeof youtubeLogoSvg !== 'string') {
    console.error('YouTube logo SVG not loaded correctly');
    return null;
  }

  /**
   * Process the SVG string to make text white while keeping red play button
   * - Replace all fill colors except red with white
   * - This will make the "YouTube" text white while keeping the red play icon
   * - Also handles stroke colors and other color attributes
   */
  const processedSvg = youtubeLogoSvg
    // Add a class to the SVG element for potential CSS targeting
    .replace(/<svg([^>]*)>/, '<svg$1 class="youtube-logo-svg">')
    // Replace fill attributes with quoted values
    // Keep red colors (#FF0000, #ff0000, #F00, #f00, red, RED, rgb(255,0,0))
    .replace(/fill="([^"]*)"/g, (match, color) => {
      const colorUpper = color.trim().toUpperCase();
      // Keep red colors - these are for the play button
      if (
        colorUpper === '#FF0000' || 
        colorUpper === '#F00' || 
        colorUpper === 'RED' ||
        colorUpper.includes('RGB(255,0,0)') ||
        colorUpper.includes('RGB(255, 0, 0)') ||
        (colorUpper.startsWith('#FF') && colorUpper.includes('0000'))
      ) {
        return match; // Keep original red color
      }
      // Change everything else to white (text elements)
      return 'fill="#FFFFFF"';
    })
    // Also handle fill attributes without quotes
    .replace(/fill=([^"'\s>]+)/g, (match, color) => {
      const colorUpper = color.trim().toUpperCase();
      if (
        colorUpper === '#FF0000' || 
        colorUpper === '#F00' || 
        colorUpper === 'RED' ||
        colorUpper.includes('RGB(255,0,0)') ||
        (colorUpper.startsWith('#FF') && colorUpper.includes('0000'))
      ) {
        return match;
      }
      return 'fill="#FFFFFF"';
    })
    // Handle fill attributes in style attributes
    .replace(/fill:([^;"]+)/g, (match, color) => {
      const colorUpper = color.trim().toUpperCase();
      if (
        colorUpper === '#FF0000' || 
        colorUpper === '#F00' || 
        colorUpper === 'RED' ||
        colorUpper.includes('RGB(255,0,0)')
      ) {
        return match;
      }
      return 'fill:#FFFFFF';
    })
    // Also handle stroke colors (in case text uses stroke instead of fill)
    .replace(/stroke="([^"]*)"/g, (match, color) => {
      const colorUpper = color.trim().toUpperCase();
      if (
        colorUpper === '#FF0000' || 
        colorUpper === '#F00' || 
        colorUpper === 'RED'
      ) {
        return match;
      }
      return 'stroke="#FFFFFF"';
    });

  return (
    <div 
      className="w-auto h-[54px] sm:h-[72px] [&_svg]:h-full [&_svg]:w-auto"
      dangerouslySetInnerHTML={{ __html: processedSvg }}
    />
  );
};

/**
 * SearchHeader Component
 * ---------------------
 * A simple header component (currently empty but structure is ready)
 * 
 * Tailwind classes explained:
 * - w-full: Width 100%
 * - p-4: Padding of 1rem (16px) on all sides
 * - flex: Makes it a flexbox container
 * - justify-end: Aligns items to the right (end of flex container)
 * - items-center: Vertically centers items
 * - text-sm: Small text size
 */
const SearchHeader = () => (
  <header className="w-full p-4 flex justify-end items-center text-sm">
    {/* Header items removed as requested */}
  </header>
);

/**
 * ============================================================================
 * MAIN APP COMPONENT
 * ============================================================================
 * This is the root component of our application
 * It manages the main state and logic
 * 
 * export default: Makes this component available to other files that import it
 */
export default function App() {
  /**
   * useState Hook
   * ------------
   * useState is a React Hook that manages component state
   * 
   * Syntax: const [stateVariable, setStateFunction] = useState(initialValue)
   * 
   * - query: The current value of the search input (starts as empty string '')
   * - setQuery: Function to update the query value
   * 
   * When setQuery is called, React automatically re-renders the component
   * with the new value, updating the UI
   */
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  /**
   * handleSearch Function
   * --------------------
   * Event handler function that runs when the form is submitted
   * 
   * @param {Event} e - The form submission event object
   * 
   * e.preventDefault(): Prevents the default form submission behavior
   *                     (which would reload the page)
   * 
   * query.trim(): Removes whitespace from beginning and end of the string
   *               This prevents searching with just spaces
   * 
   * encodeURIComponent(): Safely encodes special characters in the URL
   *                      (e.g., spaces become %20, & becomes %26)
   *                      This prevents URL errors and security issues
   * 
   * Template literal: Backticks (`) allow string interpolation with ${}
   * 
   * window.location.href: Redirects the browser to a new URL
   */
  const handleSearch = (e) => {
    e.preventDefault(); // Stop the default form submission
    
    // Only search if there's actual text (not just spaces)
    if (query.trim()) {
      // Build the YouTube search URL with the user's query
      const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
        query
      )}`;
      // Redirect the current window to the YouTube search results
      window.location.href = youtubeSearchUrl;
    }
  };

  /**
   * JSX Return
   * ----------
   * JSX (JavaScript XML) looks like HTML but it's actually JavaScript
   * - className instead of class (because "class" is a reserved word in JS)
   * - Self-closing tags need /> (like <SearchIcon />)
   * - Can embed JavaScript with { } (like {query} or {setQuery})
   * 
   * The return statement defines what gets rendered to the screen
   * 
   * Main container div - Tailwind classes:
   * - flex: Makes it a flexbox container
   * - flex-col: Stack children vertically (column direction)
   * - min-h-screen: Minimum height of 100vh (full viewport height)
   * - bg-[#0F0F0F]: YouTube's actual background color (very dark, almost black)
   * - text-white: White text color
   * - font-sans: Sans-serif font family
   */
  return (
    <div className="flex flex-col min-h-screen bg-[#0F0F0F] text-white font-sans">
      {/* Render the header component */}
      <SearchHeader />

      {/* 
        Main content area
        Tailwind classes:
        - flex-grow: Takes up remaining vertical space
        - flex: Flexbox container
        - items-center: Center items horizontally
        - justify-center: Center items vertically
        - px-4: Horizontal padding of 1rem
      */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-4">
        {/* 
          Container for searchbar - searchbar is centered independently
          - relative: Allows absolute positioning of logo relative to this container
          - flex: Flexbox container
          - items-center: Center items horizontally
          - justify-center: Center items vertically
        */}
        <div className="relative flex items-center justify-center">
          {/* 
          YouTube Logo Link - positioned above the searchbar
          - absolute: Positioned relative to the searchbar container
          - bottom-full: Positioned above the container
          - mb-8 sm:mb-12: Spacing between logo and search bar (smaller on mobile)
          - left-1/2 -translate-x-1/2: Centers the logo horizontally
          - w-full max-w-md sm:max-w-lg: Logo size constraints
          - aria-label: Accessibility label for screen readers
        */}
          <a
            href="https://www.youtube.com"
            className="absolute bottom-full mb-8 sm:mb-12 left-1/2 -translate-x-1/2 w-full max-w-md sm:max-w-lg flex items-center justify-center"
            aria-label="YouTube Homepage"
          >
            {/* Render the YouTube logo component */}
            <YouTubeLogo />
          </a>

          {/* 
          Search Box - Centered independently on the page
          - flex: Makes container a flexbox to align input and button
          - items-center: Vertically centers the input and button
          - w-[90vw] sm:w-[70vw] md:w-[50vw]: Responsive width (90% mobile, 70% tablet, 50% desktop)
          - max-w-6xl: Maximum width constraint for very large screens
          - This is the centered reference point - stays fixed width
        */}
          <div className="w-[90vw] sm:w-[70vw] md:w-[50vw] max-w-6xl flex items-center">
          {/* 
            Input Box Container - Separate div for the input (matching YouTube's structure)
            - flex: Flexbox container for the input
            - items-center: Vertically centers content
            - bg-[#121212]: YouTube's input box background color
            - border: Border around the input box
            - border-[#303030]: YouTube's border color
            - rounded-l-full: Rounded left corners (pill shape on left)
            - rounded-r-none: Sharp right corners (connects to button)
            - h-11: Height of 2.75rem (44px) - slightly shorter than original
            - flex-1: Takes up remaining space
            - focus-within:border-[#1C62B9]: Blue border when focused
            - focus-within:outline: Blue outline when focused
            - focus-within:outline-1: Thin outline
            - focus-within:outline-[#1C62B9]: Blue outline color
            - Expands to the left when icon appears (negative margin) without affecting button
          */}
          <div className={`relative flex items-center bg-[#121212] border border-[#303030] rounded-l-full rounded-r-none h-12 sm:h-11 flex-1 focus-within:border-[#1C62B9] focus-within:outline focus-within:outline-1 focus-within:outline-[#1C62B9] transition-all duration-200 ${(isFocused || query) ? '-ml-8 sm:-ml-10' : ''}`}>
            {/* Magnifying glass icon on the left - only visible when focused or typing, positioned absolutely */}
            {(isFocused || query) && (
              <div className="absolute left-3 sm:left-4 flex-shrink-0 pointer-events-none z-10">
                <SearchIcon className="h-5 w-5 text-[#9AA0A6]" />
              </div>
            )}
            <form 
              onSubmit={handleSearch}
              className={`flex-1 transition-all duration-200 ${(isFocused || query) ? 'ml-5 sm:ml-6' : ''}`}
            >
              {/* 
              Text Input - With magnifying glass icon on the left when focused
              - type="text": Standard text input
              - value={query}: Controlled component - value is controlled by React state
              - onChange: Event handler that runs on every keystroke
                - e.target.value: The current value in the input field
                - setQuery(): Updates the state, which triggers a re-render
              - onFocus: Event handler when input is focused (clicked/selected)
              - onBlur: Event handler when input loses focus
              - placeholder: Placeholder text shown when input is empty
              - className: Styling classes matching YouTube
                - w-full: Full width of container
                - bg-transparent: No background (transparent)
                - text-white: White text
                - text-base: Base text size (16px) matching YouTube's input text size
                - placeholder:text-[#9AA0A6]: Lighter gray placeholder text matching YouTube
                - outline-none: Removes browser default focus outline
                - pl-3 sm:pl-4: Normal padding when no icon
                - pl-10 sm:pl-12: Extra left padding when icon appears
                - pr-3 sm:pr-4: Right padding
              */}
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search"
                className={`w-full bg-transparent text-white text-base outline-none placeholder:text-[#9AA0A6] pr-3 sm:pr-4 transition-all duration-200 ${(isFocused || query) ? 'pl-8 sm:pl-10' : 'pl-3 sm:pl-4'}`}
                aria-label="Search YouTube"
              />
            </form>
          </div>

          {/* 
            Search Button - Separate button (matching YouTube's structure)
            - type="button": Button type (form submission handled by form's onSubmit)
            - onClick: Handles the search when button is clicked
            - className: Styling matching YouTube's search button
              - bg-[#272727]: Slightly lighter gray than input box (visual distinction)
              - text-white: White text for the icon
              - px-6: Horizontal padding (more space around icon)
              - h-11: Same height as input box
              - rounded-r-full: Rounded right corners (connects to input)
              - rounded-l-none: Sharp left corners
              - border: Border matching input box
              - border-l-0: No left border (seamlessly connects)
              - border-[#303030]: Same border color
              - hover:bg-[#3F3F3F]: Lighter background on hover
              - focus:border-[#1C62B9]: Blue border when focused
              - flex items-center justify-center: Centers the icon
          */}
          <button
            type="button"
            onClick={handleSearch}
            className="bg-[#272727] text-white px-4 sm:px-6 h-12 sm:h-11 rounded-r-full rounded-l-none border border-l-0 border-[#303030] hover:bg-[#3F3F3F] focus:border-[#1C62B9] flex items-center justify-center"
            aria-label="Search"
            title="Search"
          >
            {/* White filled magnifying glass icon - matching YouTube's size (18px) */}
            <SearchIcon className="h-[26px] w-[26px] text-white" />
          </button>
          </div>
        </div>
      </main>
    </div>
  );
}

