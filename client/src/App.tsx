import './App.css';
import { CreateUser } from './components/CreateUser';
import { ReadCashedUsers } from './components/ReadCashedUsers';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { QueryUsers } from './components/QueryUsers';
import { ReadCachedUsersFragment } from './components/ReadCachedUsersFragment';
//import { LocalReactiveUsers } from './components/LocaReactiveUsers';
//import { ModifiedUserLocal } from './components/ModifiedUserLocal';
import { CompWithUseReactiveVar } from './components/CompWithUseReactiveVar';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/' exact>
            <h1> Sample client with ApolloClient 3 </h1>
            <CreateUser />
            <QueryUsers />
            <p>  ____________ </p>
            <CompWithUseReactiveVar />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: 60,
              }}
            >
              <Link to='/cachedusers'> See users cached </Link>
              <Link to='/cachedfragment'> See cached fragment </Link>
            </div>
          </Route>

          <Route component={ReadCashedUsers} path='/cachedusers' />
          <Route component={ReadCachedUsersFragment} path='/cachedfragment' />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
