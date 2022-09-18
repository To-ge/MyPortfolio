import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Music from "./pages/music/Music";
import MLB from "./pages/MLB/MLB";
import PriorityList from "./components/priorityList/PriorityList";
import DetailList from "./components/priorityList/DetailList";
import AddOneList from "./components/priorityList/AddOneList";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/music" element={<Music />}></Route>
        <Route path="/mlb" element={<MLB />}></Route>
        <Route path="/priority" element={<PriorityList />}></Route>
        <Route path="/priority/:id" element={<DetailList />}></Route>
        <Route path="/priority/addone" element={<AddOneList />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
