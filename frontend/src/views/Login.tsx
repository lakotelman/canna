import { LandingLayout } from "../layouts/Landing";
import TabContainer, { Colors } from "../components/TabContainer";
import { Link } from "react-router-dom";
import { useState } from "react";
import { login, useAuth, logout } from "../auth/AuthProvider";

//change this to an async function eventually. Idk why it just seems better.
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logged, session] = useAuth();

  const onSubmitClick = (e: any) => {
    e.preventDefault();
    console.log("You pressed login");

    let opts = {
      username: username,
      password: password,
    };
    console.log(opts);
    fetch("http://127.0.0.1:5000/api/login", {
      method: "post",
      body: JSON.stringify(opts),
    })
      .then((r) => r.json())
      .then((token) => {
        if (token.access_token) {
          login(token);
          console.log(token);
        } else {
          alert("Your username or password is incorrect.");
          console.log("Please type in correct username/password");
        }
      });
  };

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const Logout = () => {
    logout();
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <div>
        <h2>Login</h2>
        {!logged ? (
          <form action="#">
            <div>
              <input
                type="text"
                placeholder="Username"
                onChange={handleUsernameChange}
                value={username}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
                value={password}
              />
            </div>
            <button onClick={onSubmitClick} type="submit">
              Login Now
            </button>
          </form>
        ) : (
          <button onClick={Logout}>Logout</button>
        )}
      </div>
    </>
  );
}

export default function Page() {
  return LandingLayout({ children: Login() });
}
