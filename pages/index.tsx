import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import { useEffect, useState } from 'react'
import Search from '@/components/Search'
import Filter from '@/components/Filter'
import Country from '@/components/Country'
import { PulseLoader } from 'react-spinners'
const inter = Inter({ subsets: ['latin'] })
import { useTheme } from '@/components/Themes'
export default function Home() {
  const [itemToShow, setItemToShow] = useState<number>(10)
  const [countries, setCountries] = useState<any>([])
  const [filterCountries, setFilterCountries] = useState<any>([])
  const [regions, setRegions] = useState<string>('')
  const [searchValue, setSearchValue] = useState<any>('')
  const [reachBottom, setReachBottom] = useState(false)
  const [themeColor, setThemeColor] = useState(false)
  const [clickSearch, setClickSearch] = useState(false)
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    const loadMore = () => {

      if (reachBottom) {
        setTimeout(() => {
          let currentItemToShow = itemToShow + 10
          setItemToShow(currentItemToShow)
          setReachBottom(false)
        }, 2000)
      }

    }
    loadMore()
  }, [reachBottom])

  useEffect(() => {
    const getCountries = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region")
      const data = await response.json()
      setCountries(data)
      setFilterCountries(data)
    }
    getCountries()
  }, [])

  useEffect(() => {
    const filterRegion = () => {
      if (regions !== '') {
        let allCountries = filterCountries
        let newCountries = allCountries.filter((item: any) => item.region === regions)
        console.log(newCountries)
        setItemToShow(8)
        setCountries(newCountries)
      }
      else {
        setCountries(filterCountries)
      }
    }
    filterRegion()
  }, [regions])

  useEffect(() => {
    const handleSearchCountry = () => {
      let allCountries = filterCountries
      if (regions !== '') {
        let searchedCountry = allCountries.filter((item: any) => item?.name?.common.toLowerCase() === searchValue.toLowerCase() && regions === item.region)
        setCountries(searchedCountry)
      }
      else {
        let searchedCountry = allCountries.filter((item: any) => item?.name?.common.toLowerCase() === searchValue.toLowerCase())
        setCountries(searchedCountry)
      }
      if (searchValue === '') {
        setCountries(allCountries)
      }
    }
    handleSearchCountry()
  }, [searchValue])

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );

      const scrolledToBottom = window.scrollY + windowHeight >= documentHeight - 100;
      console.log(itemToShow > countries.length, itemToShow, countries.length)
      if (itemToShow > countries.length) {
        setReachBottom(false)
      }
      else if (scrolledToBottom && !reachBottom) {
        console.log('Reached the bottom of the page!');
        setReachBottom(true)
        // Perform actions when the bottom is reached, such as loading more content
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [reachBottom, countries]);


  return (
    <div className='flex flex-col overflow-x-hidden'>
      <Navbar setThemeColor={setThemeColor} />
      <div className='flex flex-col px-3 sm:px-8 xl:px-[80px] items-center '>
        {
          filterCountries.length !== 0 && (
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 w-full'>
              <Search setSearchValue={setSearchValue} />
              <Filter setRegions={setRegions} />
            </div>
          )
        }

        <div className='flex-1 flex-wrap pb-5 grid grid-cols-1 px-5 mt-10 gap-5 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 lg:gap-16 place-content-between sm:px-0 w-full'>
          {
            countries.length === 0 && searchValue !== '' ?
              <div className='w-full h-screen'>
                <p className='text-textBW font-bold text-2xl'>No result found</p>
              </div>
              :
              countries.slice(0, itemToShow).map((item: any) => (
                <Country key={item?.name?.common} itemToShow={itemToShow} name={item?.name?.common} population={item?.population} region={item?.region} capital={item.capital} flags={item.flags.png} />
              ))
          }
        </div>

        <div className='w-full flex justify-center py-3'>
          <PulseLoader size={15} loading={reachBottom} color={theme === 'dark' ? "#ffffff" : "#2b3945"} />
        </div>
      </div>
    </div>
  )


}
