import React from 'react'
import ToggleTheme from './ToggleTheme'
import { SetStateAction } from 'react'
type Props = {
  setThemeColor: React.Dispatch<SetStateAction<boolean>>
}
function Navbar({ setThemeColor }: Props) {
  return (
    <div className='flex items-center w-full h-24 bg-elements justify-between px-3 sm:px-8 xl:px-[80px] shadow-lg'>
      <h1 className='text-textBW font-nunito font-semibold text-lg sm:text-2xl'>Where in the world?</h1>
      <ToggleTheme />
    </div>
  )
}

export default Navbar