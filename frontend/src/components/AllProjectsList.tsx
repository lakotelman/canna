interface Project {
  title?: string;
  id?: Number;
}

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
      <ul className="list-disc">
        {props.projects.map((proj, index) => {
          return (
            <li
              onClick={() => props.setProject(proj)}
              id={index.toString()}
              key={index}
              className={"px-2 hover:cursor-pointer" + (proj.id === props.currentProject.id? " bg-lightGreen" : "" )}
            >
              {proj.title}
            </li>)
      
        })}
      </ul>
    </div>
  );
}
