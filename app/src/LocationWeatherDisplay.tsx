import React from 'react';
//import jsonImport from './jsonDefinition'

export type ForecastBlock = {
    D:string,
    F:number,
    G:number,
    H:number,
    Pp:number,
    S:number,
    T:number,
    V:string,
    W:number,
    U:number,
    $:number,   
}

export type ForecastDay = {
    value:string,
    Rep: ForecastBlock[]
}

export type WeatherDataInput = {
    SiteRep : {
        DV :{
            Location:{
                name:string,
                Period: ForecastDay[]
            }
        }
    }
}

export default function LocationWeatherDisplay(props: {locationData:WeatherDataInput}){
    
    return (<p>{props.locationData.SiteRep.DV.Location.name}</p>)
    //const forecastData;
    
}
