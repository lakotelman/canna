import { Link } from "react-router-dom";



export default function AddButton() {
  return (
    <>
      <button className=" text-3xl h-12 w-12 rounded-full md:absolute bottom-0 right-0 bg-lightOrange m-8 hover:bg-lightPink">
       <Link to= "/projects/add"> + </Link>
      </button>
    </>
  );
}
