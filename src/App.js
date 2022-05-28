import NavRouter, { history } from "./router";

import { Provider } from "react-redux";
import store from "./redux/store";
import { ConnectedRouter } from "connected-react-router";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <NavRouter />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
