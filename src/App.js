
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Suspense } from 'react';
import Login from './pages/Login';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element = {
            <Suspense fallback = {<div>loading</div>}>
            <Login/>
            </Suspense>
            }/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
