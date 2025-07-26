import { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Palette } from 'lucide-react';

// Create Dark Mode Context
const DarkModeContext = createContext();

// Dark Mode Provider
export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState('default');

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (savedTheme) {
      setTheme(savedTheme);
    }
    
    if (savedDarkMode) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      // Check system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemPrefersDark) {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  // Update document class and localStorage when dark mode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  // Update theme in localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const value = {
    isDarkMode,
    theme,
    toggleDarkMode,
    changeTheme
  };

  return (
    <DarkModeContext.Provider value={value}>
      <div className={`min-h-screen transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gray-900 text-white' 
          : 'bg-white text-gray-900'
      }`}>
        {children}
      </div>
    </DarkModeContext.Provider>
  );
};

// Custom hook to use dark mode context
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

// Dark Mode Toggle Button Component
export const DarkModeToggle = ({ className = "" }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <motion.button
      onClick={toggleDarkMode}
      className={`relative p-3 rounded-full transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      } ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle dark mode"
    >
      <AnimatePresence mode="wait">
        {isDarkMode ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Sun className="w-5 h-5" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Moon className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// Theme Selector Component
export const ThemeSelector = ({ className = "" }) => {
  const { theme, changeTheme, isDarkMode } = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { 
      id: 'default', 
      name: 'Default', 
      colors: ['#ec4899', '#8b5cf6'],
      description: 'Classic pink & purple'
    },
    { 
      id: 'sunset', 
      name: 'Sunset', 
      colors: ['#f59e0b', '#ef4444'],
      description: 'Warm orange & red'
    },
    { 
      id: 'ocean', 
      name: 'Ocean', 
      colors: ['#06b6d4', '#3b82f6'],
      description: 'Cool cyan & blue'
    },
    { 
      id: 'forest', 
      name: 'Forest', 
      colors: ['#10b981', '#059669'],
      description: 'Natural green tones'
    },
    { 
      id: 'monochrome', 
      name: 'Monochrome', 
      colors: ['#6b7280', '#374151'],
      description: 'Elegant grayscale'
    }
  ];

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 rounded-full transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gray-800 text-purple-400 hover:bg-gray-700' 
            : 'bg-gray-100 text-purple-600 hover:bg-gray-200'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Select theme"
      >
        <Palette className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Theme Selector Panel */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`absolute right-0 top-full mt-2 w-80 rounded-2xl shadow-2xl z-50 overflow-hidden ${
                isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              }`}
            >
              <div className="p-4">
                <h3 className={`font-semibold text-lg mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Choose Theme
                </h3>

                <div className="space-y-2">
                  {themes.map((themeOption) => (
                    <motion.button
                      key={themeOption.id}
                      onClick={() => {
                        changeTheme(themeOption.id);
                        setIsOpen(false);
                      }}
                      className={`w-full p-3 rounded-xl text-left transition-all duration-200 ${
                        theme === themeOption.id
                          ? (isDarkMode ? 'bg-gray-700 ring-2 ring-purple-500' : 'bg-gray-50 ring-2 ring-purple-500')
                          : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50')
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        {/* Theme Colors Preview */}
                        <div className="flex gap-1">
                          {themeOption.colors.map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>

                        <div className="flex-1">
                          <div className={`font-medium ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {themeOption.name}
                          </div>
                          <div className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {themeOption.description}
                          </div>
                        </div>

                        {theme === themeOption.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-purple-500 rounded-full"
                          />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className={`mt-4 pt-4 border-t ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <p className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Themes change the accent colors throughout the site
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// Theme-aware Component Wrapper
export const ThemedComponent = ({ children, className = "" }) => {
  const { isDarkMode, theme } = useDarkMode();

  const getThemeClasses = () => {
    const baseClasses = isDarkMode 
      ? 'bg-gray-900 text-white' 
      : 'bg-white text-gray-900';

    const themeClasses = {
      default: 'theme-default',
      sunset: 'theme-sunset',
      ocean: 'theme-ocean',
      forest: 'theme-forest',
      monochrome: 'theme-monochrome'
    };

    return `${baseClasses} ${themeClasses[theme]} ${className}`;
  };

  return (
    <div className={getThemeClasses()}>
      {children}
    </div>
  );
};

// Theme-aware Card Component
export const ThemedCard = ({ children, className = "", variant = "default" }) => {
  const { isDarkMode } = useDarkMode();

  const getCardClasses = () => {
    const baseClasses = `transition-all duration-300 ${className}`;
    
    if (variant === "glass") {
      return `${baseClasses} ${
        isDarkMode 
          ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' 
          : 'bg-white/50 backdrop-blur-sm border border-gray-200/50'
      }`;
    }

    if (variant === "elevated") {
      return `${baseClasses} ${
        isDarkMode 
          ? 'bg-gray-800 shadow-2xl shadow-black/20 border border-gray-700' 
          : 'bg-white shadow-2xl shadow-gray-900/10 border border-gray-100'
      }`;
    }

    return `${baseClasses} ${
      isDarkMode 
        ? 'bg-gray-800 border border-gray-700' 
        : 'bg-white border border-gray-200'
    }`;
  };

  return (
    <div className={getCardClasses()}>
      {children}
    </div>
  );
};

// System Theme Detector
export const SystemThemeDetector = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only auto-switch if user hasn't manually set a preference
      const hasManualPreference = localStorage.getItem('darkMode') !== null;
      if (!hasManualPreference) {
        if (e.matches && !isDarkMode) {
          toggleDarkMode();
        } else if (!e.matches && isDarkMode) {
          toggleDarkMode();
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isDarkMode, toggleDarkMode]);

  return null;
};
export const ThemeStylesGenerator = () => {
  const { theme } = useDarkMode();

  useEffect(() => {
    const themeColors = {
      default: {
        '--theme-primary': '#ec4899',
        '--theme-secondary': '#8b5cf6',
        '--theme-accent': '#f97316'
      },
      sunset: {
        '--theme-primary': '#f59e0b',
        '--theme-secondary': '#ef4444',
        '--theme-accent': '#ec4899'
      },
      ocean: {
        '--theme-primary': '#06b6d4',
        '--theme-secondary': '#3b82f6',
        '--theme-accent': '#10b981'
      },
      forest: {
        '--theme-primary': '#10b981',
        '--theme-secondary': '#059669',
        '--theme-accent': '#6366f1'
      },
      monochrome: {
        '--theme-primary': '#6b7280',
        '--theme-secondary': '#374151',
        '--theme-accent': '#1f2937'
      }
    };

    const colors = themeColors[theme];
    Object.entries(colors).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });
  }, [theme]);

  return null;
};

// Complete Dark Mode Setup Component
export const DarkModeSetup = () => {
  return (
    <>
      <SystemThemeDetector />
      <ThemeStylesGenerator />
    </>
  );
};

export default {
  DarkModeProvider,
  DarkModeToggle,
  ThemeSelector,
  ThemedComponent,
  ThemedCard,
  SystemThemeDetector,
  ThemeStylesGenerator,
  DarkModeSetup,
  useDarkMode
};