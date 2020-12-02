import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Forecast />
      </header>
    </div>
  );
}

class LocationInput extends React.Component<{handleClick: () => void, 
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


class Forecast extends React.Component<{}, {location: string}> {

  constructor(props: string){
    super(props);
    this.state = {
      location: '',
    }
  }

  handleClick(){
    alert(this.state.location);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>){
    this.setState({
      location: event.target.value
    });
  }

  render(){
    return (
      <div>
        <LocationInput 
          handleClick={() => this.handleClick()} 
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleChange(event)}
        />
        <LocationMatches location={this.state.location} />
      </div>
    );
  }

}

export default App;
