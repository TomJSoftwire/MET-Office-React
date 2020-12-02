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
      <LocationInput 
        handleClick={() => this.handleClick()} 
        handleChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleChange(event)}
      />
    );
  }

}

export default App;
