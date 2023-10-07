import { useRouter } from 'next/router'
type Props = {
  itemToShow: number;
  name: string;
  population: string;
  region: string;
  capital: string;
  flags: string
}

function Country({ itemToShow, name, population, region, capital, flags }: Props) {

  const router = useRouter()

  const MoveToCountryDetails = () =>{
    router.push(`/country/${capital}`)
  }

  return (
    <div onClick={() => MoveToCountryDetails()} className='cursor-pointer bg-elements min-w-[250px] max-w-[260px] w-[400px] flex flex-col justify-between rounded-md shadow-xl h-[340px]'>

      <img src={flags} alt="flags" width={0} height={0} className='w-full h-3/6 rounded-t-lg' />

      {
        <div className='flex flex-col text-textBW py-5 w-full px-6 gap-2 h-3/6 '>
          <p className='font-bold font-nunito text-lg w-full'>{name}</p>

          <ul className='flex flex-col gap-1 pb-2'>
            <li className='flex items-center gap-1'>
              <p className='font-medium text-sm font-nunito'>Population: </p>
              <p className='font-thin text-sm'>{Number(population).toLocaleString()}</p>
            </li>
            <li className='flex items-center gap-1'>
              <p className='font-medium text-sm font-nunito'>Region: </p>
              <p className='font-thin text-sm'>{region}</p>
            </li>
            <li className='flex items-center gap-1'>
              <p className='font-medium text-sm font-nunito'>Capital: </p>
              <p className='font-thin text-sm'>{capital}</p>
            </li>

          </ul>
        </div>

      }
    </div>
  )
}

export default Country