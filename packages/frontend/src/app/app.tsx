import React from 'react';
import { IonApp } from '@ionic/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomePage } from '../DDD/ui/pages/HomePage';
import { NewPage } from '../DDD/ui/pages/NewPage';
import { EditPage } from '../DDD/ui/pages/EditPage';
import { DetailPage } from '../DDD/ui/pages/DetailPage';
import NotFoundPage from '../DDD/ui/pages/NotFoundPage';

const App: React.FC = () => (
  <IonApp>
    <Router>
      <Switch>
        <Route path="/" exact component={() => <HomePage />} />
        <Route path="/athletes/edit/:athleteId" render={() => <EditPage />} />
        <Route path="/athletes/new" component={() => <NewPage />} />
        <Route path="/athletes/:athleteId" render={() => <DetailPage />} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  </IonApp>
);

export default App;
