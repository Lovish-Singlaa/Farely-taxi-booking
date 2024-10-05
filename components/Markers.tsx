import { Map,Marker } from "react-map-gl"
import { UserLocation } from "@/context/UserLocation";
import { useContext } from "react";
import { SourceCoordsContext } from "@/context/SourceCoordsContext";
import { DestiCoordsContext } from "@/context/DestiCoordsContext";

const Markers = () => {
    const{userLocation,setUserLocation} = useContext(UserLocation)
    const{sourceCoords, setSourceCoords} = useContext<any>(SourceCoordsContext);
    const{destiCoords, setDestiCoords} = useContext<any>(DestiCoordsContext);
  return (
    <div>
        {/* userMarker */}

      <Marker longitude={userLocation?.long} latitude={userLocation?.lat} anchor="bottom" className="w-10" >
            <img src="./pin.png" className="w-6"/>
        </Marker>

        {/* sourceMarker */}
        {sourceCoords.length!=0?<Marker longitude={sourceCoords?.long} latitude={sourceCoords?.lat} anchor="bottom" className="w-10" >
            <img src="./pin.png" className="w-6"/>
        </Marker>:null}

        {/* DestinationMarker */}
        {destiCoords.length!=0?<Marker longitude={destiCoords?.long} latitude={destiCoords?.lat} anchor="bottom" className="w-10" >
            <img src="./pin.png" className="w-6"/>
        </Marker>:null}


    </div>
  )
}

export default Markers
