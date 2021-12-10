import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
function App() {
  let surveys=[
      {name:"Nyumba ni choo", id:1},
      {name:"Nyumba ni choo", id:2},
      {name:"Nyumba ni choo", id:3},
      {name:"Nyumba ni choo", id:4}]
  return (
    <div className="App">
        <Router>


       <h1>Survey Links</h1>
      {surveys.map((item)=>{
       return <div><Link to={"/surveys"+item.id}>{item.name}</Link>  </div>
      })}
        </Router>
    </div>
  );
}

export default App;
