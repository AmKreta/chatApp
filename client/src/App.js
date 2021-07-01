import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

//importing custom component
import Component from './components/components';

//importing rootReducer
import store from './store/rootReducer';


function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Component />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
