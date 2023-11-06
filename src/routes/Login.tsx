import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  

  const handleSubmit = () => {
    console.log(username, password, email);
    if (isLogin) {
      axios.post(
            "/login",
            { username, password }
        )
        .then((res) => {
          console.log("successfully logged in: ", res)
          navigate(`/${username}`);
        })
        .catch((err) => {
            console.log(err.response);
        });
    } else {
      axios.post(
            "/register",
            { username, password, email }
        )
        .then((res) => console.log("successfully signed up: ", res))
        .catch((err) => {
            console.log(err.response);
        });
    }
  }

  return (
    <div>
      <div className="container">
        <h3>Login</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            placeholder="username"
            id="username"
          />
          <input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="password"
            id="password"
          />
          {!isLogin && <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="email"
            id="email"
          />}
          <button
            style={{ width: "60px", margin: "auto" }}
            type="submit"
            onClick={handleSubmit}
          >
            {isLogin ? "login" : "Register"}
          </button>

          <button
            style={{ margin: "auto" }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Don't have account?" : "Already have account"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login