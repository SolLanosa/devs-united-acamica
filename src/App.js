import './App.css';
import LoginPage from './components/Login Page/LoginPage';
import { loginConGoogle, auth } from './firebase';



function App() {
  return (
    <div className="App">
      <LoginPage onClick={loginConGoogle}/>
    </div>
  );
}

export default App;
