import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddProduct from "./components/AddProduct";
import Details from "./components/details";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/add" component={AddProduct} />
          <Route exact path="/product" component={Details} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
