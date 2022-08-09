import { useEffect, useState } from "react";
import MilestoneTaskInput from "./MilestoneTaskInput";

interface Milestone {
  title: String;
  date_created: String;
  tasks?: Task[];
}

interface Task {
  title: String;
}

export default function EditProjectDetails() {
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      title: "maybe",
      date_created: "why",
      tasks: [],
    },
  ]);

  function getData(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);

    const formObject = Object.fromEntries(formData);
    console.log(formObject);
  }

  function removeMilestone(e: any) {
    e.preventDefault();
    setMilestones(milestones.slice(0, -1));
  }

  function addMilestone(e: any) {
    e.preventDefault();
    setMilestones([
      ...milestones,
      { title: "hmm", date_created: "huh", tasks: [] },
    ]);
  }

  return (
    <>
      <form onSubmit={getData} className="w-full max-w-[50%]">
        <div className="my-4">
          <button
            onClick={addMilestone}
            className="shadow bg-lightOrange hover:bg-lightPink focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full"
            type="submit"
          >
            Add Milestone
          </button>
          <button
            onClick={removeMilestone}
            className="shadow bg-lightOrange hover:bg-lightPink focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full"
            type="submit"
          >
            Remove Last Milestone
          </button>
        </div>
        <div className="">
          {milestones.map((milestone, index) => {
            return (
              <MilestoneTaskInput
                id={index}
                key={index}
                name={index.toString()}
              />
            );
          })}
        </div>
        <button
          className="shadow bg-standardGreen hover:bg-lightPink focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full"
          type="submit"
        >
          Submit!
        </button>
      </form>
    </>
  );
}
