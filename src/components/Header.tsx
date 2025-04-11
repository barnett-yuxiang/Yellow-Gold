import { FC, useState } from 'react';

interface HeaderProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const Header: FC<HeaderProps> = ({ isDarkTheme, toggleTheme }) => {
  const [avatarError, setAvatarError] = useState(false);

  return (
    <header className="p-4 flex items-center justify-between">
      <div className="w-0 md:w-24"></div> {/* Spacer - hidden on mobile */}
      <h1 className="text-xl md:text-2xl font-bold text-center">Yellow Gold Color Mixer</h1>
      <div className="flex items-center space-x-3 md:space-x-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-1.5 md:p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label={isDarkTheme ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkTheme ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
          )}
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white p-0.5">
          <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
            {avatarError ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-400 p-1">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
              </svg>
            ) : (
              <img
                src="/lorene.png"
                alt="User avatar"
                className="w-full h-full object-cover"
                onError={() => setAvatarError(true)}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;