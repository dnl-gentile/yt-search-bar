/**
 * ============================================================================
 * ENTRY POINT - main.jsx
 * ============================================================================
 * This is the entry point of our React application
 * It's the first JavaScript file that runs when the app loads
 * 
 * Think of it as the "main" function that starts everything
 */

/**
 * React: Core React library
 * ReactDOM: React's DOM (Document Object Model) rendering library
 *          This is what actually puts our React components on the webpage
 */
import React from 'react'
import ReactDOM from 'react-dom/client'

/**
 * App: Our main application component (imported from App.jsx)
 *      The "./" means "current directory" (src folder)
 */
import App from './App.jsx'

/**
 * index.css: Global CSS styles (including Tailwind CSS directives)
 *            This file is imported here so it applies to the entire app
 */
import './index.css'

/**
 * ReactDOM.createRoot()
 * ---------------------
 * Creates a React root container
 * 
 * document.getElementById('root'): Finds the <div id="root"> element
 *                                    in our index.html file
 *                                    This is where React will render our app
 * 
 * .render(): Actually renders (displays) our React component in the DOM
 * 
 * React.StrictMode:
 * - Development tool that helps catch potential problems
 * - Doesn't render anything visible, just wraps components
 * - Highlights potential issues in development mode
 * - Doesn't affect production builds
 * 
 * <App />: JSX syntax for rendering our App component
 *          This is equivalent to <App></App>
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

