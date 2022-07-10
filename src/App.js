import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Countries from './components/Countries';
import Header from './components/Header';
import Country from './components/Country';

function App(name) {
  return (
      <Router>
        <Header />
        
        <Routes>
          <Route exact path='/' element={<Countries />}></Route>
          <Route path="/countries/:name" element={<Country />}></Route>
        </Routes>
        
      </Router>
  
  );
}

export default App;
