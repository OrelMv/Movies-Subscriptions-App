import './App.css';
import MainPlaceHolder from './components/MainPlaceHolder'
import UsersProvider from './components//Contexts/UserContext'

function App() {
  return (
    <div className="App">
      <UsersProvider>
        <MainPlaceHolder />
      </UsersProvider>  
    </div>
  );
}

export default App;
