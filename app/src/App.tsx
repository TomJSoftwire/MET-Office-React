import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import LocationWeatherDisplay,{WeatherDataInput} from './LocationWeatherDisplay';


type locationDataInput = {
  Locations: {
    Location: locationMetaData[]
  }
}

type locationMetaData = {
  elevation: string,
  id: number,
  latitude: number,
  longitude: number,
  name: string,
  region: string,
  unitaryAuthArea: string
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
  locationId: number,
  locationMetaData: locationDataInput,
  location: string,
  locationData: WeatherDataInput|undefined
}


export default class App extends Component<IProps,IState> { 
  constructor(props:any){
    super(props);
    this.state = {
      locationId: 0,
      location: "",
      locationMetaData: {
        Locations: {
          Location: []
        }
      },
      locationData: undefined
    }
  }
fetchLocationData(){
  console.log("Fetching data...")
  const key = "33668077-5e60-4413-b22c-e4a5795397d7"
    const targetUrl = 
        "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/" + this.state.locationId + "?res=3hourly&key=" + key
  fetch(targetUrl)
        .then(response => response.json())
        .then((json:WeatherDataInput) => {
            this.setState({locationData:json})
        })
}

fetchLocationsMetadata(){
  console.log("Fetching location metadata...")
  const targetUrl = "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=33668077-5e60-4413-b22c-e4a5795397d7"
  fetch(targetUrl)
    .then(response => response.json())
    .then((json:locationDataInput) => {
      this.setState({locationMetaData:json})
    })
}

componentDidUpdate(){
  //this.fetchLocationData()
}

componentDidMount(){
  //this.fetchLocationData()
  this.fetchLocationsMetadata()
}

handleClick(){
  let i: number
  for(i = 0; i < this.state.locationMetaData.Locations.Location.length; i++){
    this.matchLocation(this.state.locationMetaData.Locations.Location[i])
  }
}

handleLocationClick(locationName: string){
  this.setState({location: locationName}, () => this.handleClick())
}

matchLocation(data: locationMetaData){
  console.log("Matching: " + this.state.location + " with " + data.name)
  if (data.name === this.state.location){
    return this.setState({locationId: data.id}, () => this.fetchLocationData()) 
  }
}

handleChange(event: React.ChangeEvent<HTMLInputElement>){
  this.setState({
    location: event.target.value
  });
}

  public render(){
  const {links,brand} = navigation;
  return (    
    <div className="App">
      <Header brand={brand} links={links} />

      <div>
        <Forecast 
          handleClick={(name: string) => this.handleLocationClick(name)} 
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleChange(event)}
          location={this.state.location}
          locations={this.state.locationMetaData.Locations.Location}
        />
        {this.state.locationData && <LocationWeatherDisplay locationData={this.state.locationData}/>}

      </div>
    </div>
  );
  }
}

class LocationInput extends React.Component<{handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void}, {}> {

  render(){
    return (
      <div>
        <label>Location:</label>
        <input 
          type="text" 
          placeholder="Enter Location" 
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.props.handleChange(event)}>
        </input>
      </div>
    );
  }
}

class LocationMatches extends React.Component <{location: string, locations: locationMetaData[],
  handleClick: (name: string) => void}, {}>{

  render(){
    let i: number;
    let matches: string[] = [];

    for(i = 0; i < this.props.locations.length; i++){
      if (this.props.locations[i].name.toLowerCase().startsWith(this.props.location.toLowerCase())){
        matches.push(this.props.locations[i].name)
      }
    }

    return(
      <div>
        <p>Potential Matches:</p>
        {matches.sort().slice(0, 5).map( match => (
          <button onClick={() => this.props.handleClick(match)}>{match}</button>
        ))}        
      </div>
    ); 
  }
}

class Forecast extends React.Component<{handleClick: (name: string) => void, 
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void, location:string,
  locations: locationMetaData[]}, {}> {


  render(){
    return (
      <div>
        <LocationInput handleChange={(event: React.ChangeEvent<HTMLInputElement>) => this.props.handleChange(event)}/>
        <LocationMatches 
          location={this.props.location} 
          locations={this.props.locations} 
          handleClick={(name: string) => this.props.handleClick(name)}/>
      </div>
    );
  }

}
