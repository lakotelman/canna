import {Project} from "../api/types"
import {Link, useLocation} from "react-router-dom"
import { useMemo } from "react";

interface Props {
  children?: JSX.Element;
  projects: Project[];
  setProject: React.Dispatch<React.SetStateAction<{}>>;
  currentProject: Project;
}


export default function AllProjectsList(props: Props) {
  return (
    <div id="allProjects" className="tracking-widest leading-8">
      <h2 className="text-2xl">All Projects</h2>
      <hr />
      <ul className="list-disc my-2 text-left">
        {props.projects.map((proj, index) => {
          return (<>
            <Link to={`/projects?id=${proj.id}`}>
              <li
                onClick={() => props.setProject(proj)}
                id={index.toString()}
                key={index}
                className={
                  "px-2 hover:cursor-pointer" +
                  (proj.id === props.currentProject.id
                    ? " bg-lightGreen rounded-full"
                    : "")
                }
              >

              {proj.title}
            </li></Link></>
          );
        })}
      </ul>
    </div>
  );
}
