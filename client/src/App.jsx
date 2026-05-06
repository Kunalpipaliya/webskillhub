import { Route, BrowserRouter, Switch } from "react-router-dom";
import React from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Result from "./pages/Result";
function App() {
  const currentUser=JSON.parse(localStorage.getItem("currentUser"))
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/result" currentUser={currentUser}>
            <Result/>
          </Route>
          <Route path="/profile">
              <Profile currentUser={currentUser}/>
          </Route>
          <Route path="/dashboard">
            <Dashboard currentUser={currentUser} />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
