import React from 'react';
import './styles.css';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import { Route , Switch , useLocation } from "react-router-dom";
import HomePage from '../../features/Home/HomePage';
import EventDetailedPage from '../../features/events/EventDetailed/EventDetailedPage';
import EventForm from '../../features/events/eventForm/eventForm';
import ModalManager from '../common/modals/modalManager';
import LoginForm from '../../features/auth/LoginForm';
import { ToastContainer } from 'react-toastify';
import ErrorComponent from '../common/errors/ErrorComponent';


const App = ()=>{
  const {key} = useLocation();
  
  return (
    <div className="App">
    <ModalManager />
    <ToastContainer position="bottom-right" hideProgressBar />
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
            <Route path="/error" component={ErrorComponent}  />
        </Switch>
      </Container>
      </>
      )} />
      </Switch>
    
     
    </div>
  );
}

export default App;
