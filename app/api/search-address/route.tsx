import { NextResponse } from "next/server";
import { v4 } from "uuid";


const sessionToken = v4();
export async function GET(request:any) {
    const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";
    const {searchParams} = new URL(request.url);
    const searchText = searchParams.get('q');
    const res = await fetch(BASE_URL + '?q=' + searchText + '&language=en&limit=6&session_token=' + sessionToken + '&proximity=-83.748708,42.265837&country=IN&access_token=pk.eyJ1IjoibG92aXNoMDAyIiwiYSI6ImNsenYxZHBidDAybzcycHNnODk2NGJuaDYifQ.2DssplaCeX1wOj6FWg-QiA',
        {
            headers:{
                "Content-Type": "application/json"
            }
        }
    );
    const searchResult = await res.json();
    return NextResponse.json({searchResult});
}