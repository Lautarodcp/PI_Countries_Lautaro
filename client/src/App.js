import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Landig from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import CreateTour from './components/CreateTour/CreateTour';
import Nav from './components/Nav/Nav';
import Pagination from './components/Pagination/Pagination';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route exact path="/">
        <Landig/>
      </Route>
      <Route exact path="/home/nav">
        <Nav/>
      </Route>
      <Route exact path="/home">
        <Home/>
      </Route>
      <Route path="/home/detail">
        <Detail/>
      </Route>
      <Route exact path="/home/create">
        <CreateTour/>
      </Route>
      <Route exact path="/home/paginadoo">
        <Pagination/>
      </Route>
    </div>
    </BrowserRouter>
  );
}

export default App;
