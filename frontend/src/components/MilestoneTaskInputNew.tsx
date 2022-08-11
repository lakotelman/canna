import { Api } from "../api";
import { useApi } from "../api/api";
import { Milestone, Task } from "../api/types";
import { authFetch } from "../auth/AuthProvider";
import ProjectDetails from "./ProjectDetails";

interface Props {
  milestone: Milestone;
  moveMilestoneUp: (e: any) => void;
  moveMilestoneDown: (e: any) => void;
  updateMilestone: (m: Milestone) => void;
  removeMilestone: (e: any) => void;
}

export default function MilestoneTaskInputNew(props: Props) {
  const api = useApi(authFetch)
  function taskFactory(): Task {
    return {
      id: -1,
      milestone_id: props.milestone.id,
      title: "",
      date_created: "",
    };
  }

  function handleTitle(event: any) {
    props.updateMilestone({
      ...props.milestone,
      title: event.target.value,
    });
  }

  function handleTasks(event: any, idx: number) {
    props.milestone.tasks![idx] = {
      ...props.milestone.tasks![idx],
      title: event.target.value,
    };
    props.updateMilestone({
      ...props.milestone,
    });
  }
  function addTask(event: any) {
    event.preventDefault();
    if (!props.milestone.tasks) {
      props.milestone.tasks = [];
    }
    props.milestone.tasks.push(taskFactory());
    props.updateMilestone({
      ...props.milestone,
    });
  }
  function moveTaskUp(event: any, idx: number) {
    event.preventDefault();
    if (!props.milestone.tasks) {
      props.milestone.tasks = [];
    }
    if (idx != 0) {
      let task = props.milestone.tasks[idx];
      props.milestone.tasks.splice(idx, 1);
      let newIdx = idx - 1;
      props.milestone.tasks.splice(newIdx, 0, task);
      props.updateMilestone({
        ...props.milestone,
      });
    }
  }
  function moveTaskDown(event: any, idx: number) {
    event.preventDefault();
    if (!props.milestone.tasks) {
      props.milestone.tasks = [];
    }
    if (idx != props.milestone.tasks.length - 1) {
      let task = props.milestone.tasks[idx];
      props.milestone.tasks.splice(idx, 1);
      let newIdx = idx + 1;
      props.milestone.tasks.splice(newIdx, 0, task);
      props.updateMilestone({
        ...props.milestone,
      });
    }
  }
  function removeTask(event: any, idx: number) {
    event.preventDefault();
    if(props.milestone.tasks && props.milestone.tasks[idx].id != -1){
     let task_id = props.milestone.tasks[idx].id
      api.deleteTask(task_id!) 
    }
    props.milestone.tasks?.splice(idx, 1);
    props.updateMilestone({ ...props.milestone });
  }

  return (
    <div className=" border-2 border-gray p-3 m-3 flex">
      <div className="w-11/12 border-r-2 p-2 content-center items-center">
        <div className="text-left">
          <label
            className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
            htmlFor="Milestone"
          >
            Milestone
          </label>
          <input
            value={props.milestone.title}
            onChange={handleTitle}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-5 mb-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-lightPink"
            id={"Milestone " + props.milestone.id}
            type="text"
            name={"milestone" + props.milestone.id.toString()}
          />
        </div>
        <div className="text-left">
          <label
            className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
            htmlFor="Tasks"
          >
            Task
          </label>

          <div className="">
            {props.milestone.tasks?.map((task, i) => {
              return (
                <div key={i} className="flex items-center align-middle">
                  <input
                    onChange={(e) => handleTasks(e, i)}
                    value={task.title}
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 mb-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-lightPink"
                    id={"Task " + props.milestone.id}
                    name={"tasks" + props.milestone.id.toString()}
                  />
                  {/* BUTTONS */}
                  <div className=" flex p-2">
                    <div>
                      <button onClick={(e) => moveTaskUp(e, i)} id="add">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 11l7-7 7 7M5 19l7-7 7 7"
                          />
                        </svg>
                      </button>
                    </div>
                    <div>
                      <button onClick={(e) => moveTaskDown(e, i)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 "
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>
                    <div>
                      <button onClick={(e) => removeTask(e, i)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <button
          onClick={addTask}
          className=" flex items-center justify-center p-1 border-dashed border border-lightLavender w-full rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-slate-400 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg> <p className="text-sm text-slate-400"> task</p>
        </button>
      </div>

      <div className="mx-auto flex flex-col p-2 justify-around">
        <div>
          <button onClick={props.moveMilestoneUp}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 11l7-7 7 7M5 19l7-7 7 7"
              />
            </svg>
          </button>
        </div>
        <div>
          <button onClick={props.moveMilestoneDown}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
        <div>
          <button onClick={props.removeMilestone}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
