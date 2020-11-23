import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from "react-bootstrap/Navbar";
import {Home} from './components/Home';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import Container from "react-bootstrap/Container";
import {BoatView} from "./components/BoatView";
import {MyBoat} from "./components/MyBoat";



function App() {
  return (
      <React.Fragment>
        <BrowserRouter>
          <Navbar bg="light">
            <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
            <Navbar.Brand href="BoatView">Rent Boat</Navbar.Brand>
            <Navbar.Brand href="MyBoat">My Boat</Navbar.Brand>
          </Navbar>
          <Container className="container pt-5">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/boatview" component={BoatView}/>
              <Route exact path="/myboat" component={MyBoat}/>
            </Switch>
          </Container>
        </BrowserRouter>
      </React.Fragment>
  );
}

export default App;
