// src/App.tsx
import React from 'react';
import { IonApp } from '@ionic/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AthleteTable from '../components/AthleteTable';
import AthleteDetail from '../components/AthleteDetail';
import AthleteForm from '../components/AthleteForm';

const App: React.FC = () => (
  <IonApp>
    <Router>
      <Switch>
        <Route path="/" exact component={AthleteTable} />
        <Route path="/athletes/edit/:athleteId" render={() => <AthleteForm />} />
        <Route path="/athletes/new" component={AthleteForm} />
        <Route path="/athletes/:athleteId" render={() => <AthleteDetail />} />
      </Switch>
    </Router>
  </IonApp>
);

export default App;
