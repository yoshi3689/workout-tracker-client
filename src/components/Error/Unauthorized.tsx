import React from 'react'
import { Link } from 'react-router-dom';

const Unauthorized: React.FC<{ error: string }> = ({ error }) => {
  return (
    <div>
      <h1>Unauthorized</h1>
      {error}
      <h3>Need to sign in to access this content</h3>
      <Link to={"/signin"}>sign in</Link>
      <Link to={"/signup"}>Don't have an account yet?</Link>
    </div>
  )
}

export default Unauthorized