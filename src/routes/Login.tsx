import React, {useState} from 'react'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log(username, password);
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
          <button
            style={{ width: "60px", margin: "auto" }}
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login