import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from 'components/User';
import UserDetails from 'components/UserDetails';
import { Provider } from 'react-redux';
import { store } from 'store/store'; 

function App() {
  return (
    <Provider store={store}>
    <div className="mx-16 border-[2px] border-solid border-black my-2">
      <Router>
				<Routes>
					<Route  path="/" element={<UserList/>}/>
					<Route path="/user/:userId" element={<UserDetails />}/>
				</Routes>
			</Router>
    </div>
    </Provider>
  );
}

export default App;
