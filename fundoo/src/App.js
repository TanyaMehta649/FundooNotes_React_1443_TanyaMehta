// import Login from './components/login/Login';
// import Signup from './components/signup/Signup';
import RoutingModule from "./Routing/RoutingModule";
import toast, {Toaster} from 'react-hot-toast';
// import './App.css';

function App() {
  return (
    <>
      <RoutingModule />
      <Toaster position="top-right"/>
    </>
 
);
}

export default App;
