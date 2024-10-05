import { DirectionRouteContext } from '@/context/DirectionRouteContext'
import React, { useContext } from 'react'

const DistanceTime = () => {
    const{direction,setDirection} = useContext(DirectionRouteContext);

  return direction?.routes &&(
    <div className='bg-yellow-400 p-3 font-bold absolute bottom-11 right-[16px] w-72 text-center text-sm'>
      {`Distance: ${(direction.routes[0]?.distance*0.001).toFixed(0)}km , Duration: ${(direction.routes[0]?.duration/60).toFixed(0)}Min`}
    </div>
  )
}

export default DistanceTime
