import { HashRouter, Route, Switch } from 'react-router-dom';
import Display from './pages/display'
import Login from './pages/login'
import backend from './pages/backend';


function App() {
  return (
    <HashRouter>
      <Switch>
            <Route path='/' exact component={Display} />
            <Route path='/login' component={Login} />
            <Route path='/backend' component={backend} />
      </Switch>
    </HashRouter>
  );
}

export default App;
