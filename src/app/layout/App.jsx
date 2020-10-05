


import React, { useState } from 'react';
import "semantic-ui-css/semantic.min.css";
import './styles.css';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';


const App = ()=>{
  const [formOpen , setFormOpen] = useState(true);
  
  return (
    <div className="App">
    <NavBar setFormOpen={setFormOpen} />
    <Container className="main">
      <EventDashboard formOpen={formOpen} setFormOpen={setFormOpen} />
    </Container>
    </div>
  );
}

export default App;
