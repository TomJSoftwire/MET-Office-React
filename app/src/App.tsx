import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Main from './Main'



const navigation = {
  brand: {name:"The Weather Site",to:"/"},
  links: [
    {name: "Home", to:"/"},
    {name: "All Locations", to:"/alllocations"},
    {name: "Test",to:"/test"}
  ],
}



export default class App extends Component { 
  public render(){
  const {links,brand} = navigation;
  return (    
    <div className="App">
      <Header brand={brand} links={links} />

      <Main />
    </div>
  );
  }
}




