import React from 'react';
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMoon,faSun,faCloudMoon,faCloud,faCloudSun,faCloudShowersHeavy,faSnowflake,faBolt,faSmog} from '@fortawesome/free-solid-svg-icons'



export type ForecastBlockData = {
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

export type ForecastDayData = {
    value:string,
    Rep: ForecastBlockData[]
}

export type WeatherDataInput = {
    SiteRep : {
        DV :{
            Location:{
                name:string,
                Period: ForecastDayData[]
            }
        }
    }
}

const FORMATTED_WEATHER_ICON_INDEX = [
faMoon,
faSun,
faCloudMoon,
faCloudSun,
faSun,
faSmog,
faSmog,
faCloud,
faCloudSun,
faCloudShowersHeavy,
faCloudShowersHeavy,
faCloudShowersHeavy,
faCloudShowersHeavy,
faCloudShowersHeavy,
faCloudShowersHeavy,
faCloudShowersHeavy,
faCloudShowersHeavy,
faCloudShowersHeavy,
faCloudShowersHeavy,
faCloudShowersHeavy,
faCloudShowersHeavy,
faCloudShowersHeavy,
faSnowflake,
faSnowflake,
faSnowflake,
faSnowflake,
faSnowflake,
faSnowflake,
faBolt,
faBolt,
faBolt
]

const Content = styled.div`
    display:flex;
    flex-direction: column;
    justify-content:space-around;
    align-items:center;
`
const Td = styled.div`
    height:60px;
    text-align:center;
`
const Tw = styled(Td)`
    padding-top:15px;
    height:120px;
`
const Th = styled.div`
    //display:flex;
    width:15vw;
    text-align:left;    
    font-weight:bold;
    height:60px;
    white-space: nowrap;
`
const Thw = styled(Th)`
    height:118px;
    padding-top:17px;
`
const Table = styled.div`
    display:flex;
    flex-flow:row;
    justify-content:space-between;
    height:15vh;
    width:70vw;
`
const Spacer = styled.div`
    display:flex;
    flex-flow:row;
    justify-content:right;
    height:15vh;
    width:80vw;
`
const Tr = styled.div`
    height:100%;
    width:7vw;
    display:flex;
    flex-flow:column;
    flex-basis:100%;
`

export default function LocationWeatherDisplay(props: {locationData:WeatherDataInput}){
    const data = props.locationData.SiteRep.DV.Location
    const locationName = data.name
                            .toLowerCase()
                            .split(" ")
                            .map(i => i[0].toUpperCase() + i.slice(1))
                            .join(" ")
    const forecastData = data.Period
    const Days = forecastData.map(day => {return(
            <ForecastDay data={day} key={day.value}/>
    )})
    return (
        <div>
                {Days}
        </div>
    )
}

function ForecastDay(props: {data: ForecastDayData}){
    const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const dayData = props.data;
    const rawDateArr:number[] = dayData.value.slice(0,10).split("-").map(j => parseInt(j))
    const forecastDate = new Date (rawDateArr[0],rawDateArr[1]-1,rawDateArr[2])
    const formattedDate = daysOfWeek[forecastDate.getDay()] + " " + forecastDate.getDate() +"/" + (forecastDate.getMonth()+1) + "/" +forecastDate.getFullYear()
    const Blocks = dayData.Rep.map(i => <ForecastBlock propData={i} key={i.$}/> )
    return(
        <Content key={formattedDate}>
            <h3>{formattedDate}</h3>
            <Table>
                <Tr>
                    <Th key="time">Time</Th>
                    <Thw key="weatherType">Weather</Thw>
                    <Th key="temperature">Temperature</Th>
                    <Th key="feelsLike">Feels Like</Th>
                    <Th key="precipChance">Precipitation Chance</Th>
                </Tr>
                <Spacer>
                    {Blocks}
                </Spacer>
            </Table>
        </Content>
    )                                      
}

function ForecastBlock(props: {propData:ForecastBlockData}){
    const data = props.propData;
    const hrsOverMidnight = (data["$"]/60).toString()
    const time = (hrsOverMidnight.length === 1 ? "0" : "") + hrsOverMidnight + ":00"
    const temperature = data.T
    const feelsLike = data.F
    const weatherType = data.W
    const precipChance = data.Pp
    return(
        <Tr key={time}>
            <Td key="time">{time}</Td>
            <Tw key="weatherType"><FontAwesomeIcon icon={FORMATTED_WEATHER_ICON_INDEX[weatherType]} size="2x"/></Tw>
            <Td key="temperature">{temperature} °C</Td>
            <Td key="feelsLike">{feelsLike} °C</Td>
            <Td key="precipChance">{precipChance} %</Td>
        </Tr>
    )
}
