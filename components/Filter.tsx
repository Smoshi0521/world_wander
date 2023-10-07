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
    <div className='flex flex-col w-full max-w-[240px] gap-1 mt-5 sm:mt-8 shadow-lg relative  z-0'>
      <button onClick={open} className='bg-elements flex items-center justify-between px-4 py-4 w-full text-textBW rounded-md'>
        <p className='font-medium text-lg'> {filterValue === '' ? "Filter by Region" : filterValue}</p>
        <div className='flex items-center gap-1 relative z-20'>
          <button onClick={clearFilter} className='z-0 p-1 hover:text-red'>
            <AiOutlineClose className={`${none ? "opacity-100" : "opacity-0"} text-md  duration-200 z-20`} />
          </button>
          <BiChevronDown className="text-lg" />
        </div>
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