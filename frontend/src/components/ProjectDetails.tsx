import Task from "../components/Task";

interface Project {
  title?: String;
  milestones?: Milestone[];
}

interface Milestone {
  title: String;
  date_created: String;
  tasks?: Task[];
}

interface Task {
  title: String;
  date_created: String;
}

interface Props {
  children?: JSX.Element;
  project: Project;
}

export default function ProjectDetails(props: Props) {
  return (
    <>
      <div id="mileStones" className="leading-8">
        {props.project.milestones?.map((milestone, index) => {
          return (
            <>
              <h3
                key={index}
                className="bg-lightGreen mb-4 rounded-r-full px-3"
              >
                {milestone.title}
              </h3>
              <ul className="list-disc list-inside mb-4 mx-4">
                {milestone.tasks?.map((task, index) => {
                  return <Task key={index} task={task} />;
                })}
              </ul>
            </>
          );
        })}
      </div>
    </>
  );
}