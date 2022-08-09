import { useEffect } from "react";
import { LandingLayout } from "../layouts/Landing";
import { Link } from "react-router-dom";
function Landing() {
  return (
    <>
      
    </>
  );
}

export default function Page() {
  return LandingLayout({ children: Landing() });
}
