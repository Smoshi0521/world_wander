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
    <div onClick={() => MoveToCountryDetails()} className='cursor-pointer bg-elements min-w-[250px] max-w-[360px] w-full flex flex-col justify-between rounded-lg shadow-xl h-full max-h-[420px]'>
      <img src={flags} alt="flags" width={0} height={0} className='w-full h-full min-h-[200px] rounded-t-lg' />
      {
        <div className='flex flex-col text-textBW py-8 w-full px-6 gap-5 h-full min-h-[200px]'>
          <p className='font-bold font-nunito text-xl w-full'>{name}</p>

          <ul className='flex flex-col gap-2 pb-2'>
            <li className='flex items-center gap-1'>
              <p className='font-medium text-md font-nunito'>Population: </p>
              <p className='font-thin text-md'>{Number(population).toLocaleString()}</p>
            </li>
            <li className='flex items-center gap-1'>
              <p className='font-medium text-md font-nunito'>Region: </p>
              <p className='font-thin text-md'>{region}</p>
            </li>
            <li className='flex items-center gap-1'>
              <p className='font-medium text-md font-nunito'>Capital: </p>
              <p className='font-thin text-md'>{capital}</p>
            </li>

          </ul>
        </div>

      }
    </div>
  )
}

export default Country