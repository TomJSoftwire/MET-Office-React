import React from 'react';
//import jsonImport from './jsonDefinition'

type weatherDataInput = {
    SiteRep : {
        DV :{
            type:string
        }
    }
}

export default function LocationWeatherDisplay(props: {locationData:weatherDataInput}){
    
    return (<p>{props.locationData.SiteRep.DV.type}</p>)
    //const forecastData;
    
}
