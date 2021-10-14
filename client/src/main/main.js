import './main.css'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";


import Home from './routes/home.js'
import Trending from './routes/trending.js'
import Profil from './routes/profil.js'

function Main(props) {

 return (
  <div className='main'>
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home user={props.user} setUser={props.setUser} />
        </Route>
        <Route exact path='/trending'>
          <Trending />
        </Route>
        <Route exact path='/profil'>
          <Profil user={props.user} setUser={props.setUser} />
        </Route>
      </Switch>
    </Router>    
  </div>

 )
}


export default Main