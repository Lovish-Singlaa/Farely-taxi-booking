"use client"
import { Map,Marker,useMap } from "react-map-gl"
import 'mapbox-gl/dist/mapbox-gl.css';
import { useContext, useEffect, useRef } from "react";
import { UserLocation } from "@/context/UserLocation";
import Markers from "@/components/Markers";
import { SourceCoordsContext } from "@/context/SourceCoordsContext";
import { DestiCoordsContext } from "@/context/DestiCoordsContext";
import MapboxRoute from "./MapboxRoute";
import { DirectionRouteContext } from "@/context/DirectionRouteContext";
import DistanceTime from "@/components/DistanceTime";

const Mapbox = () => {
    const mapRef = useRef<any>();

    const{sourceCoords, setSourceCoords} = useContext<any>(SourceCoordsContext);
    const{destiCoords, setDestiCoords} = useContext<any>(DestiCoordsContext);
    const{userLocation,setUserLocation} = useContext(UserLocation);
    const{direction,setDirection} = useContext<any>(DirectionRouteContext)

    // const {current: map} = useMap();
    useEffect(()=>{
        if(sourceCoords){
            mapRef.current?.flyTo({
                center: [sourceCoords.long,sourceCoords.lat],
                duration: 2500,
            })
    }
        
    },[sourceCoords])

    useEffect(()=>{
        if(destiCoords){
            mapRef.current?.flyTo({
                center: [destiCoords.long,destiCoords.lat],
                duration: 2500,
            })
    }
        
    },[destiCoords])

    return (
        <div>
            <div className="rounded-lg overflow-hidden p-1 mx-2">
                {userLocation?<Map
                ref={mapRef}
                    mapboxAccessToken="pk.eyJ1IjoibG92aXNoMDAyIiwiYSI6ImNsenYxZHBidDAybzcycHNnODk2NGJuaDYifQ.2DssplaCeX1wOj6FWg-QiA"
                    initialViewState={{
                        longitude: 77.1,
                        latitude: 28.65,
                        zoom: 11
                    }}
                    style={{ width: '100%', height: 500, borderRadius: 10 }}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                >
                <Markers/>
                {direction?.routes?(
                    <MapboxRoute coordinates={direction?.routes[0]?.geometry?.coordinates}/>
                ):null}

                </Map> : null}
            </div>
            <div className="float-right"><DistanceTime/></div>
        </div>
    )
}

export default Mapbox
