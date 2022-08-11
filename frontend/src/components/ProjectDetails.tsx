import { useApi } from "../api/api";
import { Project } from "../api/types";
import { authFetch } from "../auth/AuthProvider";
import Task from "../components/Task";

interface Props {
  children?: JSX.Element;
  project: Project;
  all_projects: Project[];
  refresh: () => void;
}

export default function ProjectDetails(props: Props) {
  const api = useApi(authFetch);

  function changeTaskStatus(e: any, midx: number, tidx: number) {
    console.log("You clicked it!");
    e.preventDefault();
    if (!props.project!.milestones![midx].tasks![tidx]) {
      props.project!.milestones![midx].tasks = [];
    }
    let task_id = props.project!.milestones![midx].tasks![tidx].id;
    api.updateStatus(task_id!);
    props.refresh();
  }

  return (
    <>
      <div id="mileStones" className="leading-8">
        <h2 className="text-2xl tracking-widest mx-2">Project Details</h2>
        <hr />
        {props.project?.milestones?.map((milestone, mindex) => {
          return (
            <div key={mindex}>
              <h3 className="bg-lightGreen mb-4 rounded-r-full px-3">
                {milestone.title}
              </h3>
              <ul className="list-inside mb-4 mx-4 text-left">
                {milestone.tasks?.map((task, tindex) => {
                  return (
                    <Task
                      updateTask={(e) => changeTaskStatus(e, mindex, tindex)}
                      key={tindex}
                      task={task}
                    />
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}
