import { LandingLayout } from "../layouts/Landing";
import TabContainer, { Colors } from "../components/TabContainer";
import { Link, Navigate } from "react-router-dom";
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
    fetch("https://canna-server.herokuapp.com/api/login", {
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

  return (
    <>
      <div>
        {!logged ? (
          <>
            <div className="flex items-center justify-center min-h-[75vh] bg-lightLavender">
              <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#62C0A5"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
                    <circle cx="12" cy="10" r="3" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-center mt-2">
                  Sign in to your account
                </h3>
                <form action="">
                  <div className="mt-4">
                    <div>
                      <label className="block" htmlFor="username">
                        Username
                      </label>
                      <input
                        type="text"
                        placeholder="Username"
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-standardGreen"
                        onChange={handleUsernameChange}
                        value={username}
                      />
                    </div>

                    <div className="mt-4">
                      <label className="block">Password</label>
                      <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-standardGreen"
                        onChange={handlePasswordChange}
                        value={password}
                      />
                    </div>
                    <div className="flex">
                      <button
                        onClick={onSubmitClick}
                        className="w-full px-6 py-2 mt-4 text-white bg-lightGreen rounded-lg hover:bg-lightPink"
                      >
                        Sign In
                      </button>
                    </div>
                    <div className="mt-6 text-grey-dark">
                      Don't have an account?
                      <a className="text-lightGreen hover:underline" href="#">
                        <Link to="/Register"> Create an account</Link>
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </>
        ) : (
          <Navigate to="/projects" />
        )}
      </div>
    </>
  );
}

export default function Page() {
  return LandingLayout({ children: Login() });
}
