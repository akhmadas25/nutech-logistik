import React, { useContext, useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./routes";
import { useStyles } from "./styles";
import Landing from "./pages/Landing";
import { setAuthToken } from "./config/api";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const token = localStorage.getItem("token");
  const [Login, setLogin] = useState(false);
  
  const classes = useStyles();
  useEffect(() => {
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [Login]);

  if (!Login)
    return (
      <>
        <Landing />
      </>
    );

  return (
    <div className={classes.appRoot}>
      <Router>
        <Navigation />

        <Switch>
          {routes.map((route, index) => {
            return (
              <Route
                exact
                key={index}
                path={route.path}
                component={route.component}
              />
            );
          })}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
