import React, { SetStateAction, useState, useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'
type Props = {
  setSearchValue: React.Dispatch<SetStateAction<string>>
}
function Search({ setSearchValue }: Props) {
  const [search, setSearch] = useState<string>('');

  const getSearchValue = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setSearchValue(search)
  }

  useEffect(() =>{
    if(search === ''){
      setSearchValue(search)
    }
  },[search])
  
  const emptySearch = () => {
    setSearch('')
    console.log(search, "here")
  }

  return (
    <form onSubmit={getSearchValue} className='mt-8 w-full max-w-[500px] flex items-center gap-1'>
      <div className='flex items-center bg-elements pl-3 pr-5 w-full rounded-lg py-2 shadow-2xl border border-transparent duration-100 focus-within:border focus-within:border-violet'>
        {
          search === "" ?
            <button type='button'>
              <HiSearch className="text-textBW mx-5 text-xl md:text-[28px]" />
            </button>
            :
            <button onClick={() => emptySearch()} type='button'>
              <AiOutlineClose type="button" className="text-textBW mx-5 text-xl md:text-[20px]" />
            </button>
        }
        <input onChange={(e) => setSearch(e.target.value)} value={search} type='text' name='searchCountry' className='bg-transparent outline-none py-3 w-full text-textBW h-full' placeholder='Search for a country...' />
      </div>
    </form>
  )
}

export default Search