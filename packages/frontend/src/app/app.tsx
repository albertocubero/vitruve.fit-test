import React from 'react';
import { IonApp } from '@ionic/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { NewPage } from '../pages/NewPage';
import { EditPage } from '../pages/EditPage';
import { DetailPage } from '../pages/DetailPage';

const App: React.FC = () => (
  <IonApp>
    <Router>
      <Switch>
        <Route path="/" exact component={() => <HomePage />} />
        <Route path="/athletes/edit/:athleteId" render={() => <EditPage />} />
        <Route path="/athletes/new" component={() => <NewPage />} />
        <Route path="/athletes/:athleteId" render={() => <DetailPage />} />
      </Switch>
    </Router>
  </IonApp>
);

export default App;
