import { Milestone } from "../api/types";

interface Props {
  milestone: Milestone;
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
    props.updateMilestone({
      ...props.milestone,
      tasks: [...event.target.value],
    });
  }

  return (
    <div className=" border-2 border-gray p-3 m-3">
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
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 mb-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-lightPink"
          id={"Milestone " + props.milestone.id}
          type="text"
          name={"milestone" + props.milestone.id.toString()}
        />
      </div>
      <div className="text-left">
        <label
          className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
          htmlFor="Task"
        >
          Task
        </label>
        <div className="">
          <textarea
          // onChange={handleTasks}
          //   value={props.milestone.tasks?.map((task) => task.title + "\n")}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 mb-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-lightPink"
            id={"Task " + props.milestone.id}
            name={"tasks" + props.milestone.id.toString()}
          />
        </div>
      </div>
    </div>
  );
}
