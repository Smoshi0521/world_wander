import React from 'react'
import { useEffect, useState, SetStateAction } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'
type Props = {
  setRegions: React.Dispatch<SetStateAction<string>>
}
function Filter({ setRegions }: Props) {

  const [filterValue, setFilterValue] = useState('')
  const [showOption, setShowOption] = useState(false)
  const [none, setNone] = useState(false)
  const getOption = (region: string) => {
    setRegions(region)
    setFilterValue(region)
    setNone(true)
  }
  const clearFilter = () => {
    setShowOption(false)
    setFilterValue('')
    setRegions('')
    setNone(false)
  }
  const open = () => {
    setShowOption(!showOption)

  }
  const allRegions = ["Africa", "Americas", "Asia", "Europe", "Oceania"]
  return (
    <div className='flex flex-col w-full max-w-[240px] gap-1 mt-5 sm:mt-8 shadow-lg relative'>
      <button onClick={open} className='bg-elements flex items-center justify-between px-4 py-4 w-full text-textBW rounded-md z-10'>
        <p className='font-medium text-md md:text-lg'> {filterValue === '' ? "Filter by Region" : filterValue}</p>
        <div className='flex items-center gap-1 relative z-20'>
          <BiChevronDown className={`text-lg transition duration-200 ${showOption ? "rotate-1" : "rotate-180"}`} />
        </div>
      </button>
      <button onClick={clearFilter} className={`p-1  ${none ? "opacity-100 z-20" : "opacity-0 z-0"} absolute right-10 top-[17px]`}>
        <AiOutlineClose className={`hover:text-red text-md text-textBW  duration-200 z-20`} />
      </button>
      {
        showOption ?
          <div className='bg-elements w-full rounded-md text-textBW absolute z-20 top-[65px] shadow-xl'>
            <ul className='space-y-2 py-4 px-4'>
              {
                allRegions.map((title) => (
                  <li
                    key={title}
                    className="block px-4 py-2 text-sm sm:text-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => { getOption(title), setShowOption(!showOption) }}
                  >
                    {title}
                  </li>
                ))
              }
            </ul>
          </div>
          :
          null
      }
    </div>
  )
}

export default Filter