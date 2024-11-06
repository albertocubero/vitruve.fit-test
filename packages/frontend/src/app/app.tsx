import React from 'react';
import { IonApp } from '@ionic/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomePage } from '../ui/pages/HomePage';
import { CreatePage } from '../ui/pages/CreatePage';
import { EditPage } from '../ui/pages/EditPage';
import { DetailPage } from '../ui/pages/DetailPage';
import NotFoundPage from '../ui/pages/NotFoundPage';

const App: React.FC = () => (
  <IonApp>
    <Router>
      <Switch>
        <Route path="/" exact component={() => <HomePage />} />
        <Route path="/athletes/edit/:athleteId" render={() => <EditPage />} />
        <Route path="/athletes/new" component={() => <CreatePage />} />
        <Route path="/athletes/:athleteId" render={() => <DetailPage />} />
        <Route component={() => <NotFoundPage/>} />
      </Switch>
    </Router>
  </IonApp>
);

export default App;
