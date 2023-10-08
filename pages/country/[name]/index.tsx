import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import { useEffect, useState } from 'react'
import Search from '@/components/Search'
import Filter from '@/components/Filter'
import { PulseLoader } from 'react-spinners'
import { BsArrowLeftShort } from 'react-icons/bs'
import { useRouter } from 'next/router'
const inter = Inter({ subsets: ['latin'] })

export default function Country() {
  const [country, setCountry] = useState<any>([])
  const [allCountries, setAllCountries] = useState<any>([])
  const [borderCountries, setBorderCountries] = useState<any>([])
  const [currencies, setCurrencies] = useState('')
  const [themeColor, setThemeColor] = useState(false)
  const router = useRouter()
  const capitalName = router.query.name


  useEffect(() => {
    const getCountries = async () => {
      const response = await fetch("/data.json")
      const data = await response.json()
      setAllCountries(data)
      const filter = data.filter((item: any) => item.capital === capitalName)
      setCountry(filter[0])

    }
    getCountries()
  }, [capitalName])

  useEffect(() => {
    const getBorderName = () => {
      let bordersCountries: any = []
      country?.borders?.map((borderName: string) => {
        let getBorderCountryName = allCountries.filter((item: any) => item.alpha3Code === borderName)
        bordersCountries.push(getBorderCountryName[0])

      })
      console.log(borderCountries)
      setBorderCountries(bordersCountries)
    }
    getBorderName()
  }, [country])

  const checkBorderCountry = (capital: string) => {
    router.push(`/country/${capital}`)
  }
  useEffect(() => {
    if (country && country.currencies) {
      setCurrencies(country.currencies[0]?.code);
    }
  }, [country, capitalName]);

  return (
    <div className='flex flex-col overflow-x-hidden'>
      <Navbar setThemeColor={setThemeColor} />
      <div className='flex flex-col px-6 sm:px-8 xl:px-[80px] items-center w-full md:pb-10'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 w-full mt-8'>
          <button onClick={() => router.push('/')} className='bg-elements px-4 sm:px-6 flex items-center gap-3 w-fit text-textBW py-2 shadow-xl' >
            <BsArrowLeftShort className="text-[25px] sm:text-[30px]" />
            <p className='text-lg sm:text-lg'>Back</p>
          </button>
        </div>

        {
          country?.length !== 0 && (
            <div className='flex flex-col items-center w-full gap-10 text-textBW mt-14 pb-10 md:pb-0 lg:justify-between xl:justify-evenly xl:flex-row xl:items-center lg:gap-10 flex-1'>

              <img src={country?.flags?.png} className='w-full  max-w-[700px] lg:w-5/6 sm:min-h-[400px] max-h-[400px]' width={0} height={0} />


              <div className=' flex flex-col w-full max-w-[700px] gap-5 xl:px-12'>

                <h2 className='w-full font-bold text-2xl sm:text-[30px]'>{country?.name}</h2>

                <div className='flex flex-col sm:flex-row sm:justify-between mt-3 md:gap-20 truncate'>
                  <ul className='flex flex-col gap-2 sm:gap-4'>
                    <li className='flex items-center gap-1'>
                      <p className='font-medium text-md sm:text-lg font-nunito'>Native Name: </p>
                      <p className='font-thin text-md sm:text-lg'>{country?.nativeName}</p>
                    </li>
                    <li className='flex items-center gap-1'>
                      <p className='font-medium text-md sm:text-lg font-nunito'>Population: </p>
                      <p className='font-thin text-md sm:text-lg'>{Number(country?.population).toLocaleString()}</p>
                    </li>
                    <li className='flex items-center gap-1'>
                      <p className='font-medium text-md sm:text-lg font-nunito'>Region: </p>
                      <p className='font-thin text-md sm:text-lg'>{country?.region}</p>
                    </li>
                    <li className='flex items-center gap-1'>
                      <p className='font-medium text-md sm:text-lg font-nunito'>Sub Region: </p>
                      <p className='font-thin text-md sm:text-lg'>{country?.subregion}</p>
                    </li>
                    <li className='flex items-center gap-1'>
                      <p className='font-medium text-md sm:text-lg font-nunito'>Capital: </p>
                      <p className='font-thin text-md sm:text-lg'>{country?.capital}</p>
                    </li>
                  </ul>
                  <ul className='flex flex-col gap-2 sm:gap-4 mt-10 sm:mt-0'>
                    <li className='flex items-center gap-1'>
                      <p className='text-md sm:text-lg font-nunito'>Top Level Domain: </p>
                      <p className='font-thin text-md sm:text-lg'>{country?.topLevelDomain}</p>
                    </li>
                    <li className='flex items-center gap-1'>
                      <p className='font-medium text-md sm:text-lg font-nunito'>Currencies: </p>
                      <p className='font-thin text-md sm:text-lg'>{currencies}</p>
                    </li>
                    <li className='flex items-center gap-1'>
                      <p className='font-medium text-md sm:text-lg font-nunito'>Languages: </p>
                      {
                        country?.languages.map((item: any, index: number) => (
                          <p key={index} className='font-thin text-md sm:text-lg'>{`${item.name}${index !== country.languages.length - 1 ? ',' : ''}`}</p>
                        ))
                      }
                    </li>
                  </ul>
                </div>

                {
                  country?.borders && (
                    <div className='flex flex-col lg:flex-row mt-10  gap-5 lg:gap-2'>
                      <p className='text-xl font-medium w-full max-w-[160px]'>Border Countries:</p>
                      <div className='flex items-center gap-2 sm:gap-3 flex-wrap'>
                        {
                          borderCountries.map((country: any, index: number) => (
                            <button onClick={() => checkBorderCountry(country.capital)} key={country.name} style={{
                              boxShadow: "0px 5px 10px 5px rgba(0, 0, 0, 0.1)"
                            }} className='bg-elements text-center sm:text-md px-5 py-1 rounded-md hover:scale-95 hover:bg-hoverBG hover:text-hoverText transition duration-300'>
                              {country?.name}
                            </button>
                          ))
                        }
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
          )
        }
      </div>
    </div >
  )
}
