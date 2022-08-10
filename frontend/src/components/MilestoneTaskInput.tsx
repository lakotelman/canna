interface Props {
  id: Number;
  name: String;
}

export default function MilestoneTaskInput(props: Props) {
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
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 mb-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-lightPink"
          id={"Milestone " + props.id}
          type="text"
          name={"milestone" + props.id.toString()}
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
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 mb-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-lightPink"
            id={"Task " + props.id}
            name={"tasks" + props.id.toString()}
          />
        </div>
      </div>
    </div>
  );
}
