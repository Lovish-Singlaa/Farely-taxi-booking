"use client"
import { useContext, useEffect, useState } from "react";
import Cars from "./Cars";
import { SourceCoordsContext } from "@/context/SourceCoordsContext";
import { DestiCoordsContext } from "@/context/DestiCoordsContext";
import { DirectionRouteContext } from "@/context/DirectionRouteContext";
import Link from "next/link";
import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext";

const Booking = () => {
  const [source, setSource] = useState<any>();
  const [sourceChange, updateSource] = useState<any>(false);
  const [addressList, setAddressList] = useState<any>([]);
  const [destinationChange, updateDestination] = useState<any>(false);
  const [destination, setDestination] = useState<any>();
  const{sourceCoords, setSourceCoords} = useContext<any>(SourceCoordsContext);
  const{destiCoords, setDestiCoords} = useContext<any>(DestiCoordsContext);
  const{direction,setDirection} = useContext<any>(DirectionRouteContext)
  // const[amount, setAmount] = useState();
  const{carAmount, setCarAmount} = useContext<any>(SelectedCarAmountContext);

  const MAPBOX_LOCATION_URL = "https://api.mapbox.com/search/searchbox/v1/retrieve/";
  const session_id = "5ccce4a4-ab0a-4a7c-943d-580e55542363"
  const mapboxToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;


  const addSearch = (e:any) => {
    sourceChange ? setSource(e.target.outerText) : setDestination(e.target.outerText);
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      getAddressList();
    }, 1000)
    return () => clearTimeout(delay);
  }, [source, destination])

  const getAddressList = async () => {
    const query = sourceChange ? source : destination;
    const res = await fetch('/api/search-address?q=' + query, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await res.json();
    setAddressList(result.searchResult);
  }

  const onSourceAddressClick = async (e:any,item:any)=>{
    addSearch(e); 
    updateSource(false);
    
    const res = await fetch(MAPBOX_LOCATION_URL + item.mapbox_id + "?session_token=" + session_id + "&access_token=pk.eyJ1IjoibG92aXNoMDAyIiwiYSI6ImNsenYxZHBidDAybzcycHNnODk2NGJuaDYifQ.2DssplaCeX1wOj6FWg-QiA")
    const result = await res.json();
    setSourceCoords({
      long: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    })
  }
  const onDestiAddressClick = async (e:any,item:any)=>{
    addSearch(e); 
    updateDestination(false);
    
    const res = await fetch(MAPBOX_LOCATION_URL + item.mapbox_id + "?session_token=" + session_id + "&access_token=pk.eyJ1IjoibG92aXNoMDAyIiwiYSI6ImNsenYxZHBidDAybzcycHNnODk2NGJuaDYifQ.2DssplaCeX1wOj6FWg-QiA")
    const result = await res.json();
    setDestiCoords({
      long: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    })
    
    if(sourceCoords && destiCoords){
      getDirectionRoute();
    }
  }

  const getDirectionRoute = async ()=>{
    const res = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${sourceCoords.long},${sourceCoords.lat};${destiCoords.long},${destiCoords.lat}?overview=full&geometries=geojson&access_token=pk.eyJ1IjoibG92aXNoMDAyIiwiYSI6ImNsenYxZHBidDAybzcycHNnODk2NGJuaDYifQ.2DssplaCeX1wOj6FWg-QiA`,{
      headers:{
        "Content-Type" : "application/json",
      }
    })
    const result = await res.json();
    setDirection(result);
    console.log(result);
  }

  return (
    <div className="relative ">
      <h1 className="font-bold text-xl mb-2">Booking</h1>
      <div className="border rounded-md p-2">
        <div className="flex flex-col mt-2 ">
          <label className="text-gray-500">Pickup Point</label>
          <input className="px-2 py-1 rounded-md border-2 outline-none focus:border-yellow-200" onChange={(e) => { setSource(e.target.value); updateSource(true) }} value={source} type="text" name="" id="" />
        </div>

        {addressList && addressList.suggestions && sourceChange && addressList.suggestions.length > 0 ? (
          <div>
            {addressList.suggestions.map((item: any) => (
              <div key={item.mapbox_id} className="p-2 w-full hover:bg-gray-100 cursor-pointer" onClick={(e) => { onSourceAddressClick(e,item) }}>
                <h2 className="font-semibold">{item.full_address ? item.full_address : null}</h2>
                {/* <p className="text-sm text-gray-500">
                {item.context.place ? item.full_address + ', ' : ''}
                {item.context.locality ? item.context.locality.name + ', ' : ''}
                {item.context.region ? item.context.region.name : ''}
              </p> */}
              </div>
            ))}
          </div>
        ) : null}

        <div className="flex flex-col mt-2">
          <label className="text-gray-500">Drop Point</label>
          <input className="px-2 py-1 rounded-md border-2 outline-none focus:border-yellow-200" onChange={(e) => { setDestination(e.target.value); updateDestination(true) }} value={destination} type="text" name="" id="" />
        </div>

        {addressList && addressList.suggestions && destinationChange && addressList.suggestions.length > 0 ? (
          <div>
            {addressList.suggestions.map((item: any) => (
              <div key={item.mapbox_id} className="p-2 w-full hover:bg-gray-100 cursor-pointer" onClick={(e) => { onDestiAddressClick(e,item) }}>
                <h2 className="font-semibold">{item.full_address}</h2>
                {/* <p className="text-sm text-gray-500">
                {item.context.place ? item.full_address + ', ' : ''}
                {item.context.locality ? item.context.locality.name + ', ' : ''}
                {item.context.region ? item.context.region.name : ''}
              </p> */}
              </div>
            ))}
          </div>
        ) : null}

        <div>
          <Cars />
        </div>
      </div>
      <Link href="./payment"><button className={`w-full ${carAmount?'bg-yellow-400 hover:bg-yellow-300':'bg-gray-300'} rounded-md mt-4 p-2 font-bold `}>Book</button>
      </Link>
        
    </div>
  )
}

export default Booking