import { DirectionRouteContext } from "@/context/DirectionRouteContext";
import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext";
import carList from "@/data/carList"
import Image from "next/image"
import { useContext, useState } from "react"
const cars = () => {

  const[selectedCar, setSelectedCar] = useState<any>();
  const{direction, setDirection} = useContext<any>(DirectionRouteContext);
  const{carAmount, setCarAmount} = useContext<any>(SelectedCarAmountContext);

  const getCost:any = (charges:any)=>{
    return (direction.routes && (charges*direction?.routes[0]?.distance*0.001*0.4).toFixed(2))
  }

  return (
    <div className="mt-2">
        <h1 className="text-xl font-semibold mb-2">Select Cars</h1>
        <div className="grid grid-cols-3 gap-3 grid-rows-2">
            {carList.map((item)=>(
              <>
                {/* <div key={item.id} className={`border-2 p-1 text-xs rounded-md hover:border-yellow-400 font-semibold ${selectedCar==item.id ? 'border-3 border-yellow-600' :''}`} onClick={()=>{setSelectedCar(item.id); setCarAmount(getCost(item.charges))}}>
                  
                    <Image className="w-full h-full object-contain" src={item.image} alt={item.name} width={105} height={165}/>
                    <div className="flex justify-between">
                    <h2 className="text-gray-500">{item.name}</h2>
                    {direction.routes?<span>{getCost(item.charges)}$</span>:null}
                    </div>
                </div> */}

                

<div key={item.id} 
     className={`border-2 p-2 text-xs rounded-md hover:border-yellow-400 font-semibold flex flex-col justify-between h-full ${selectedCar == item.id ? 'border-3 border-yellow-600' : ''}`} 
     onClick={() => { setSelectedCar(item.id); setCarAmount(getCost(item.charges)) }}
>
    {/* Image Container */}
    <div className="w-full h-12 flex items-center justify-center overflow-hidden">
        <Image
            className="object-contain w-full h-full" 
            src={item.image} 
            alt={item.name} 
            width={165} 
            height={165}
        />
    </div>

    {/* Text Container */}
    <div className="mt-2">
        <div className="flex justify-between">
            <h2 className="text-gray-500">{item.name}</h2>
            {direction.routes ? <span>{getCost(item.charges)}$</span> : null}
        </div>
    </div>
</div>

                </>
            ))}
        </div>
    </div>
  )
}

export default cars
