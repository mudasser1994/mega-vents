
import React from 'react';
import "semantic-ui-css/semantic.min.css";
import './styles.css';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import { Route , Switch , useLocation } from "react-router-dom";
import HomePage from '../../features/Home/HomePage';
import EventDetailedPage from '../../features/events/EventDetailed/EventDetailedPage';
import EventForm from '../../features/events/eventForm/eventForm';


const App = ()=>{
  const {key} = useLocation();
  return (
    <div className="App">
    
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/(.+)" render={()=>(
        <>
        <NavBar />
        <Container className="main">
        <Switch>
            <Route exact path="/events"  component={EventDashboard} />
            <Route path="/events/:id"  component={EventDetailedPage} />
            <Route key={key} path={["/createEvent" , "/manage/:id"]} exact  component={EventForm} />
        </Switch>
      </Container>
      </>
      )} />
      </Switch>
    
     
    </div>
  );
}

export default App;
