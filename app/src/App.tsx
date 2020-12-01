import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';

const navigation = {
  brand: {name:"The Weather Site",to:"/"},
  links: [
    {name: "Home", to:"/"},
    {name: "All Locations", to:"/alllocations"},
    {name: "Test",to:"/test"}
  ]
}

export default class App extends Component {  
  public render(){
  const {links,brand} = navigation;
  return (    
    <div className="App">
      <Header brand={brand} links={links}/>
        <img src={logo} className="App-logo" alt="logo" />
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

