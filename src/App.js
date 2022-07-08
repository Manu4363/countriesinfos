import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Countries from './components/Countries';
import Header from './components/Header';

function App() {
  return (
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<Countries />}></Route>
        </Routes>
        
      </Router>
  
  );
}

export default App;
