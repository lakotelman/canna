import { Milestone } from "../api/types";

interface Props {
  milestone: Milestone;
  moveMilestoneUp: (e:any)=> void,
  moveMilestoneDown: (e:any) => void
  updateMilestone: (m: Milestone) => void;
}

export default function MilestoneTaskInputNew(props: Props) {
  function handleTitle(event: any) {
    props.updateMilestone({
      ...props.milestone,
      title: event.target.value,
    });
  }

  function handleTasks(event: any) {
    let wholeString = event.target.value;
    const result = wholeString.split(/\r?\n/);
    let newTasks = [];
    for (let str in result) {
    }
    props.updateMilestone({
      ...props.milestone,
      tasks: result,
    });
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
            {props.milestone.tasks?.map((task) => {
              return (
                <>
                  <div className="flex items-center align-middle">
                    <input
                      onChange={handleTasks}
                      value={task.title}
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 mb-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-lightPink"
                      id={"Task " + props.milestone.id}
                      name={"tasks" + props.milestone.id.toString()}
                    />
                    <div className=" flex p-2">
                      <div>
                        <button id="add">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M5 11l7-7 7 7M5 19l7-7 7 7"
                            />
                          </svg>
                        </button>
                      </div>
                      <div>
                        <button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 "
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                            />
                          </svg>
                        </button>
                      </div>
                      <div>
                        <button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
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
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
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
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
        <div>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
