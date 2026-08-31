import React from 'react';

import {  
  BrowserRouter as Router, 
  Routes,
  Route,    
  Navigate , 
} from 'react-router-dom';

import Login from './pages/auth/login';
import SignUp from './pages/auth/signup';
import Home from './pages/dashboard/home';
import Income from './pages/dashboard/income';
import Spending from './pages/dashboard/spending';
import UserProvider from './context/userContext';
import {Toaster} from 'react-hot-toast';

const Root = () => {
const isAuthenticated = !!localStorage.getItem('token');

return isAuthenticated ? (
  <Navigate to="/dashboard" /> 
) : ( 
<Navigate to="/login" /> 
); 
}

const App = () => {
  return (
  <UserProvider>
       <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/income" exact element={<Income />} />
          <Route path="/spending" exact element={<Spending />} />
        </Routes>
      </Router>
    </div>

<Toaster
toastOptions={{
  className:"",
  style: {
    fontSize: '13px'
  },
}}
/>

  </UserProvider>
  );
}

export default App;