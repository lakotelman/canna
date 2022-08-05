import { LandingLayout } from "../layouts/Landing";
import TabContainer, { Colors } from "../components/TabContainer";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <form>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" placeholder="email" />
      </form>
    </>
  );
}

export default function Page() {
  return LandingLayout({ children: Login() });
}
