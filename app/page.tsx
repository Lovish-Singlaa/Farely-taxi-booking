"use client"
import Booking from "@/components/Booking";
import Navbar from "@/components/Navbar";
import { DestiCoordsContext } from "@/context/DestiCoordsContext";
import { DirectionRouteContext } from "@/context/DirectionRouteContext";
import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext";
import { SourceCoordsContext } from "@/context/SourceCoordsContext";
import { UserLocation } from "@/context/UserLocation";
import Mapbox from "@/map/Mapbox";
import { useEffect, useState } from "react";

export default function Home() {

  const[userLocation, setUserLocation] = useState<any>();
  const[sourceCoords, setSourceCoords] = useState<any>([]);
  const[destiCoords, setDestiCoords] = useState<any>([]);
  const[direction, setDirection] = useState<any>([])
  const[carAmount, setCarAmount] = useState<any>([])


  useEffect(()=>{
    getUserLocation();
  },[]);

  const getUserLocation = ()=>{
    navigator.geolocation.getCurrentPosition(function(pos){
      setUserLocation({
        lat:pos.coords.latitude,
        long:pos.coords.longitude
      })
    })
  }

  return (
    <div>
      <UserLocation.Provider value={{userLocation,setUserLocation}}>
      <SourceCoordsContext.Provider value = {{sourceCoords,setSourceCoords}}>
      <DestiCoordsContext.Provider value={{destiCoords,setDestiCoords}}>
      <DirectionRouteContext.Provider value={{direction, setDirection}}>
      <SelectedCarAmountContext.Provider value={{carAmount,setCarAmount}}>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-3 m-2 mt-4 gap-4 max-h-[70vh]">
        <div className="min-h-[80vh] p-1 mx-1">
          <Booking />
        </div>
        <div className="col-span-2">
          <h2 className="font-bold text-xl mb-2">Map</h2>
          <Mapbox />
          
        </div>
      </div>
      </SelectedCarAmountContext.Provider>
      </DirectionRouteContext.Provider>
      </DestiCoordsContext.Provider>
      </SourceCoordsContext.Provider>
      </UserLocation.Provider>
    </div>
  );
}
