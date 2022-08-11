import { Link } from "react-router-dom"

export default function LandingHeader(){ 
    return (
        <>
      <nav className="flex items-center md:justify-center mx-auto container p-6 md:gap-10 justify-between">
        <div className=" md:block">
          <Link to="/Login"><button
            
            className="mt-8 w-20 md:w-40 justify-center rounded-full p-2 text-black md:flex items-center hover:bg-lightPink bg-lightGreen"
          >
            Login
          </button></Link>
        </div>

        <div className="">
          <Link to="/"><img
            className="md:w-52 w-36"
            src="cannalogo(1).webp"
            alt="logo of word 'canna'"
          /></Link>
        </div>

        <div className=" md:block">
         <Link to ="/Register"> <button
            className=" mt-8 w-20 md:w-40 justify-center rounded-full p-2 text-black md:flex items-center hover:bg-lightPink bg-lightOrange"
          >
            Register
          </button></Link>
        </div>
        
        
      </nav>
      
    </>
    )
}