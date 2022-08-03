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
}

export default function TabContainer(props: Props) {
  return (
    <>
      <div className="flex mx-4 md:mx-12">
        <div
          className={classNames({
            "w-full h-[90vh] rounded-3xl md:rounded-tl-none md:rounded-tr-3xl md:rounded-b-3xl p-2 mb-4 mx-auto":
              true,
            "bg-lightGreen": props.color === Colors.lightGreen,
            "bg-lightLavender": props.color === Colors.lightLavender,
            "bg-lightOrange": props.color === Colors.lightOrange,
          })}
        >
          <div className=" bg-white mx-auto my-4 h-[95%] w-[95%] p-32 rounded-3xl outline-white outline-3 outline-dotted outline-offset-4 relative">
            <div className="flex justify-center gap-32 align-top divide-x-2">
              {props.children}
            </div>
            <div className="">
              <AddButton destination="/projects/edit"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
