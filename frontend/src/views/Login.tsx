import { LandingLayout } from "../layouts/Landing";
import TabContainer, { Colors } from "../components/TabContainer";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitClick = async (event:any) => { 
    event.preventDefault()
    console.log("You pressed the login button")
    let opts = { 
      "username": username, 
      "password": password
    }
    console.log(opts)
    try{const result = await fetch("/api/login", { 
      method: "post", 
      body: JSON.stringify(opts)})}
       catch (error){ 
console.log(error)
      }
    
    } 
  

  return (
    <>
      <form>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" placeholder="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="password" />
        <button className=" bg-slate-500 p-2 text-white">Submit</button>
      </form>
    </>
  );
}

export default function Page() {
  return LandingLayout({ children: Login() });
}
