import classNames from "classnames";
import { Link } from "react-router-dom";

export enum TabColors {
  lightLavender,
  lightOrange,
  lightGreen,
}

interface Props {
  color: TabColors;
  destination: string;
  children?: JSX.Element;
}

export default function TabsNav(props: Props) {
  return (
    <>
      
          <div
            className={classNames({
              "px-12 py-3 rounded-t-3xl": true,
              "bg-lightGreen": props.color === TabColors.lightGreen,
              "bg-lightLavender": props.color === TabColors.lightLavender,
              "bg-lightOrange": props.color === TabColors.lightOrange,
            })}
          >
            <Link to={props.destination}>{props.children}</Link>
          </div>
    </>
  );
}
