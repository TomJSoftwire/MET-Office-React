import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import LocationWeatherDisplay,{WeatherDataInput} from './LocationWeatherDisplay';


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
  locationName: string,
  locationId : string,
  locationData: WeatherDataInput|undefined
}


export default class App extends Component<IProps,IState> { 
  constructor(props:any){
    super(props);
    this.state = {
      locationName:"TEST",
      locationId :"3840",
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
componentDidMount(){
  //this.fetchLocationData()
}

handleClick(){
  this.fetchLocationData()
}

handleChange(event: React.ChangeEvent<HTMLInputElement>){
  this.setState({
    locationName: event.target.value
  });
}

  public render(){
  const {links,brand} = navigation;
  return (    
    <div className="App">
      <Header brand={brand} links={links} />
        {this.state.locationData && <LocationWeatherDisplay locationData={this.state.locationData}/>}
      <div>
        <br/>
        <Forecast handleClick={() => this.handleClick()} handleChange={(e:React.ChangeEvent<HTMLInputElement>) => this.handleChange(e)} locationName={this.state.locationName}/>
      </div>
    </div>
  );
  }
}

class LocationInput extends React.Component<{
  handleClick: () => void, 
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void}, {}> {

  render(){
    return (
      <div>
        <label>Location:</label>
        <input 
          type="text" 
          placeholder="Enter Location" 
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.props.handleChange(event)}>
        </input>
        <button type="submit" onClick={() => this.props.handleClick()}>Submit</button>
      </div>
    );
  }
}

class LocationMatches extends React.Component <{location: string}, {}>{

  render(){
    let i: number;
    let locations: string[] = ['London Airport', 'Liverpool', 'Leeds', 'Manchester', 'Manchester Airport', 'Manchester Picadilly', 
                               'Mold', 'Aldershot', 'Abergele', 'Bodelwyddan', 'Bangor', 'Chester', 'Bristol', 'Brighton', 'Cardiff',
                               'York', 'Edinburgh', 'Rhyl', 'Prestatyn', 'New Brighton', 'Fflint', 'Abcot', 'Aberystwyth', 'Bath',
                               'Blackpool', 'Blackburn'];
    let matches: string[] = [];

    for(i = 0; i < locations.length; i++){
      if(locations[i].toLowerCase().startsWith(this.props.location.toLowerCase())){
        matches.push(locations[i]);
      }
    }

    return(
      <div>
        <p>Potential Matches:</p>
        <ul>
        {matches.sort().slice(0, 5).map( match => (
          <li>{match}</li>
        ))}
        </ul>
      </div>
    ); 
  }
}


class Forecast extends React.Component<{locationName : string, handleClick : () => void,handleChange : (event : React.ChangeEvent<HTMLInputElement>) => void}, {location: string}> {


  

  render(){
    return (
      <div>
        <LocationInput 
          handleClick={() => this.props.handleClick()} 
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) => this.props.handleChange(event)}
        />
        <LocationMatches location={this.props.locationName} />
      </div>
    );
  }

}

