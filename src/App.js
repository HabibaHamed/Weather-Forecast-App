import NavRouter from "./router";

import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <NavRouter />
    </Provider>
  );
}

export default App;
