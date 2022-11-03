import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbars from './pages/Navbar';
import Add from './pages/Add';
import Users from './pages/Users';
import Todo from './pages/Todo';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbars />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/users/:id" exact element={<Users />} />
        <Route path="/add-user" exact element={<Add />} />
        <Route path="/todo" exact element={<Todo />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
