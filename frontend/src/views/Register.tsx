import { Link, Navigate, useNavigate } from "react-router-dom";
import { LandingLayout } from "../layouts/Landing";
import { useAuth } from "../auth/AuthProvider";
import { useState } from "react";

function Register() {
  const [logged, session] = useAuth();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmitClick = (e: any) => {
    e.preventDefault();
    console.log("You pressed login");

    if (
      username &&
      password &&
      name &&
      email &&
      confirmPassword &&
      password == confirmPassword
    ) {
      let opts = {
        username: username,
        password: password,
        name: name,
        email: email,
        confirmPassword: confirmPassword,
      };
      console.log(opts);
      fetch("http://127.0.0.1:5000/api/registration", {
        method: "post",
        body: JSON.stringify(opts),
      })
        .then((r) => r.json())
        .then((token) => {
          if (token.access_token) {
            console.log(token);
            navigate("/login");
          } else {
            console.log("Something is wrong");
          }
        });
    } else if (!username || !password || !name || !confirmPassword || !email) {
      alert("Please complete all the fields");
    } else if (password !== confirmPassword) {
      alert("Please make sure your passwords match");
    }
  };

  const handleUsernameInput = (e: any) => {
    setUsername(e.target.value);
  };
  const handlePasswordInput = (e: any) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordInput = (e: any) => {
    setConfirmPassword(e.target.value);
  };
  const handleNameInput = (e: any) => {
    setName(e.target.value);
  };
  const handleEmailInput = (e: any) => {
    setEmail(e.target.value);
  };

  return (
    <>
      {!logged ? (
        <div className="flex items-center justify-center min-h-[75vh] bg-lightLavender">
          <div className="px-8 py-6 mx-4 mt-4 my-6 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
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
              Create an Account
            </h3>
            <form action="">
              <div className="mt-4">
                <div>
                  <label className="block" htmlFor="Name">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-standardGreen"
                    onChange={handleNameInput}
                    value={name}
                  />
                </div>
                <div className="mt-4">
                  <label className="block" htmlFor="username">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-standardGreen"
                    onChange={handleUsernameInput}
                    value={username}
                  />
                </div>
                <div className="mt-4">
                  <label className="block" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="Email"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-standardGreen"
                    onChange={handleEmailInput}
                    value={email}
                  />
                </div>
                <div className="mt-4">
                  <label className="block">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-standardGreen"
                    onChange={handlePasswordInput}
                    value={password}
                  />
                </div>
                <div className="mt-4">
                  <label className="block">Confirm Password</label>
                  <input
                    type="password"
                    placeholder=" Retype Password"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-standardGreen"
                    onChange={handleConfirmPasswordInput}
                    value={confirmPassword}
                  />
                </div>
                <div className="flex">
                  <button
                    onClick={onSubmitClick}
                    className="w-full px-6 py-2 mt-4 text-white bg-lightGreen rounded-lg hover:bg-lightPink"
                  >
                    Create Account
                  </button>
                </div>
                <div className="mt-6 text-grey-dark">
                  Already have an account?
                  <a className="text-lightLavender hover:underline" href="#">
                    <Link to="/Login"> Log in</Link>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <Navigate to="/projects" />
      )}
    </>
  );
}

export default function Page() {
  return LandingLayout({ children: Register() });
}
