import React from 'react'
import UserForm from '../components/UserForm';


const Login: React.FC = () => {
  return (
    <div>
      <div className="container">
        <h3>Login</h3>
        <UserForm />
      </div>
    </div>
  );
}

export default Login