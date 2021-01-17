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
import AccountPage from '../../features/auth/AccountPage';
import { useSelector } from 'react-redux';
import LoadingComponent from './LoadingComponent';
import ProfilePage from '../../features/profiles/ProfilePage';


const App = ()=>{
  const {key} = useLocation();
  const {initialized} = useSelector(state=>state.async);

  if(!initialized){
    return <LoadingComponent content="Loading App..." />
  }
  
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
            <Route path="/account" component={AccountPage}  />
            <Route path="/profile/:id" component={ProfilePage}  />
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
