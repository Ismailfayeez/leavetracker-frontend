import "normalize.css";
import "./App.scss";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import ParentComponent from "./components/parentComponent/ParentComponent";

const store = configureStore();
function App() {
  console.log(process.env.NODE_ENV, process.env.REACT_APP_API_URL);
  return (
    <div className="App">
      <Provider store={store}>
        <ParentComponent />
      </Provider>
    </div>
  );
}

export default App;
