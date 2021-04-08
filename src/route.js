import { HashRouter, Route, Switch } from 'react-router-dom';
import Display from './layout/display'
import Login from './layout/login'


function App() {
  return (
    <HashRouter>
      <Switch>
            <Route path='/' exact component={Display} />
            <Route path='/login' component={Login} />
      </Switch>
    </HashRouter>
  );
}

export default App;
