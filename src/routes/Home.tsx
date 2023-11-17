import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div>
        <Link to={"/login"}>login</Link>
        <Link to={"/register"}>register</Link>
      </div>
    </div>
  )
}

export default Home