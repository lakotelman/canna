import setCurrentProject from "../views/Projects";
import projects from "../views/Projects";

interface Project {
  title: string;
}

interface Props {
  children?: JSX.Element;
  projects: Project[];
  setProject: React.Dispatch<React.SetStateAction<{}>>;
}

export default function AllProjectsList(props: Props) {
  return (
    <div id="allProjects" className="tracking-widest leading-8">
      <h2 className="text-2xl">All Projects</h2>
      <hr />
      <ul className="list-disc">
        {props.projects.map((proj, index) => {
          return (
            <li
              onClick={() => props.setProject(proj)}
              value={index}
              key={index}
              className="px-2 hover:cursor-pointer"
            >
              {proj["title"]}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
