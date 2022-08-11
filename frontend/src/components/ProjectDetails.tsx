import { Project } from "../api/types";
import Task from "../components/Task";

interface Props {
  children?: JSX.Element;
  project: Project;
}

export default function ProjectDetails(props: Props) {
  return (
    <>
      <div id="mileStones" className="leading-8">
        <h2 className="text-2xl tracking-widest mx-2">Project Details</h2>
        <hr />
        {props.project?.milestones?.map((milestone, index) => {
          return (
            <div key={index}>
              <h3 className="bg-lightGreen mb-4 rounded-r-full px-3">
                {milestone.title}
              </h3>
              <ul className="list-inside mb-4 mx-4 text-left">
                {milestone.tasks?.map((task, index) => {
                  return <Task key={index} task={task} />;
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}
