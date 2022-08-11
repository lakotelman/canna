import classNames from "classnames";
import AddButton from "./AddButton";


export enum Colors {
  lightGreen,
  lightLavender,
  lightOrange,
}

interface Props {
  color: Colors;
  children?: JSX.Element;
  addbutton?: JSX.Element 
}

export default function TabContainer(props: Props) {
  return (
    <>
      <div className="flex mx-2 md:mx-12">
        <div
          className={classNames({
            "w-full h-[75vh] rounded-3xl md:rounded-tl-none md:rounded-tr-3xl md:rounded-b-3xl p-2 mb-4 mx-auto":
              true,
            "bg-lightGreen": props.color === Colors.lightGreen,
            "bg-lightLavender": props.color === Colors.lightLavender,
            "bg-lightOrange": props.color === Colors.lightOrange,
          })}
        >
          <div className=" bg-white mx-auto my-4 h-[95%] md:w-[95%] p-2 md:p-16 rounded-3xl outline-white outline-3 outline-dotted outline-offset-4 relative overflow-auto">

            <div className="md:flex justify-center gap-32 align-top md:divide-x-2">
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
