import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "../screens/CityDashboard";
import Landing from "../screens/Landing";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const NavRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/dashboard/:city" component={Dashboard} />
        <Route exact path="/" component={Landing} />
      </Switch>
    </BrowserRouter>
  );
};

export default NavRouter;
