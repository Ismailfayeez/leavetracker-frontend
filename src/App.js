import "normalize.css";
import "./App.scss";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import ParentComponent from "./parentComponent/ParentComponent";

const store = configureStore();
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ParentComponent />
      </Provider>
    </div>
  );
}

export default App;
