import React, { useEffect, useState } from 'react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { useTheme } from './Themes';

function ToggleTheme() {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Check if the code is running on the client side
    if (typeof window !== 'undefined') {
      // Access the document object only on the client side
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    }
  }, [theme]);

  return (
    <div onClick={toggleTheme} className='flex items-center gap-2 cursor-pointer'>
      {theme === 'dark' ? (
        <BsFillMoonFill className='text-textBW text-lg sm:text-lg text-violet' />
      ) : (
        <BsFillSunFill className='text-textBW text-lg sm:text-lg text-orange' />
      )}
      <p className='text-textBW sm:text-lg'>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
    </div>
  );
}

export default ToggleTheme;
