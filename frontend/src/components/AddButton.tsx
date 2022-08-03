import { Link } from "react-router-dom";

interface Props {
    destination: string
}

export default function AddButton(props: Props) {
  return (
    <>
      <button className=" text-3xl h-12 w-12 rounded-full absolute bottom-0 right-0 bg-lightOrange m-8 hover:bg-lightPink">
       <Link to={props.destination}> + </Link>
      </button>
    </>
  );
}
