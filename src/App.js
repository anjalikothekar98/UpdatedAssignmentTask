import './App.css';
import UserList from "./Components/Pages/UserList";
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<UserList/>}/>
   
   </Routes>
    </div>
  );
}

export default App;
