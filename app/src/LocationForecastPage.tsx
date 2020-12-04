import React, { Component } from 'react';
import './LocationForecastPage.css';
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


interface IProps {
}

interface IState {
  locationId: number,
  locationMetaData: locationDataInput,
  location: string,
  locationData: WeatherDataInput|undefined
}


export default class LocationForecastPage extends Component<IProps,IState> { 

  forecast: React.RefObject<Forecast>;

  constructor(props:any){
    super(props);
    this.forecast = React.createRef();
    this.state = {
      locationId: 0,
      location: " ",
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
  this.resetInputField()
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

resetInputField(){
  if (this.forecast.current?.inputElement.current?.inputField.current){
    this.forecast.current.inputElement.current.inputField.current.value = this.state.location;
    this.setState({location: " "})
  }
}

handleLocationClick(locationName: string){
  let i: number
  for(i = 0; i < this.state.locationMetaData.Locations.Location.length; i++){
    this.matchLocation(this.state.locationMetaData.Locations.Location[i], locationName)
  }
}

matchLocation(data: locationMetaData, locationName: string){
  console.log("Matching: " + locationName + " with " + data.name)
  if (data.name === locationName){
    return this.setState({locationId: data.id, location: locationName}, () => this.fetchLocationData()) 
  }
}

handleChange(event: React.ChangeEvent<HTMLInputElement>){
  this.setState({
    location: event.target.value
  });
}

  public render(){
  return (    
    <div className="App">

      <div>
        <Forecast 
          ref={this.forecast}
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

  inputField: React.RefObject<HTMLInputElement>;

  constructor(props:any){
    super(props);
    this.inputField = React.createRef();
  }
  
  render(){
    return (
      <div>
        <input 
          ref = {this.inputField}
          className="LocationInput"
          type="text" 
          placeholder="Please enter a location, then click on one of the matches below:" 
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
      <div className="PotentialMatches">
        <hr className="PotentialMatchesHR"></hr>
        <div className="PotentialMatchesList">
          {matches.sort().slice(0, 5).map( match => (
            <button className="PotentialMatchesButton" onClick={() => this.props.handleClick(match)}>{match}</button>
          ))}      
        </div>
      </div>
    ); 
  }
}

class Forecast extends React.Component<{handleClick: (name: string) => void, 
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void, location:string,
  locations: locationMetaData[]}, {}> {

  inputElement: React.RefObject<LocationInput>;

  constructor(props:any){
    super(props);
    this.inputElement = React.createRef();
  }

  render(){
    return (
      <div className="Input">
        <LocationInput 
          ref = {this.inputElement}
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) => this.props.handleChange(event)}
        />
        <LocationMatches 
          location={this.props.location} 
          locations={this.props.locations} 
          handleClick={(name: string) => this.props.handleClick(name)}/>
      </div>
    );
  }

}