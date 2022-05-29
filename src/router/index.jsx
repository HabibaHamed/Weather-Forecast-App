import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "../screens/CityDashboard";
import Landing from "../screens/Landing";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const NavRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/dashboard/:country/:city" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default NavRouter;
