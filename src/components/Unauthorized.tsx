import React from 'react'
import { Link } from 'react-router-dom';

const Unauthorized: React.FC<{ error: string }> = ({ error }) => {
  return (
    <div>
      <h1>Unauthorized</h1>
      {error}
      <h3>Need to log in to access this content</h3>
      <Link to={"http://localhost:3000/login"}>Log in</Link>
      <Link to={"http://localhost:3000/register"}>Don't have an account?</Link>
    </div>
  )
}

export default Unauthorized