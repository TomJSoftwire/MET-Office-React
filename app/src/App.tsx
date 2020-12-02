import React, { Component,useState,useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import LocationWeatherDisplay from './LocationWeatherDisplay';

type weatherDataInput = {
  SiteRep : {
      DV :{
          type:string
      }
  }
}

const navigation = {
  brand: {name:"The Weather Site",to:"/"},
  links: [
    {name: "Home", to:"/"},
    {name: "All Locations", to:"/alllocations"},
    {name: "Test",to:"/test"}
  ],
}
interface IProps {
}

interface IState {
  locationId : string,
  locationData: weatherDataInput
}


export default class App extends Component<IProps,IState> { 
  constructor(props:any){
    super(props);
    this.state = {
      locationId :"3840",
      locationData: {
        SiteRep : {
            DV :{
                type: "TEST"
            }
        }
      }
    }
  }
fetchLocationData(){
  console.log("Fetching data...")
  const key = "33668077-5e60-4413-b22c-e4a5795397d7"
    const targetUrl = 
        "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/" + this.state.locationId + "?res=3hourly&key=" + key
  fetch(targetUrl)
        .then(response => response.json())
        .then((json:weatherDataInput) => {
            this.setState({locationData:json})
        })
}
componentDidUpdate(){
  //this.fetchLocationData()
}
componentDidMount(){
  //this.fetchLocationData()
}

  public render(){
  const {links,brand} = navigation;
  return (    
    <div className="App">
      <Header brand={brand} links={links} />
        <LocationWeatherDisplay locationData={this.state.locationData}/>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
    </div>
  );
  }
}

