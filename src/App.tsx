import './App.css';
import FormComponent from './components/Form';
import Main from './components/Main';
import NavComponent from './components/NavComponent';

function App() {
  return (
    <div className='app'>
      <div className='container'>
        <FormComponent />
        <NavComponent />
        <Main />
      </div>
    </div>
  );
}

export default App;
