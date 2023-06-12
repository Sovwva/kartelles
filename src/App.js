import './App.css';


import Header from "./components/Header";
import Home from "./pages/Home"
import Registration from "./pages/Registration"
import Login from "./pages/Login"
// import ErrorPage from "./pages/error";
// import Not_Found from "./pages/Not_Found"


import {BrowserRouter as Router, Switch, Route, Link, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
    <Header />
      <Routes>
        <Route path={"/"} element={<Home />}/>
        <Route path={"/Login"} element={< Login />}/>
        <Route path={"/Registration"} element={< Registration />}/>
        {/*<Route path={"/Error"} element={< ErrorPage />}/>*/}
        {/*<Route path={"*"} element={< Not_Found /> }/>*/}
      </Routes>
    </div>
  );
}

export default App;
