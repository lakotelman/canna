import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MilestoneTaskInput from "./MilestoneTaskInput";
import newProjPayload from "../auth/SubmitProjectData"



interface Milestone {
  title: String;
  date_created: String;
  tasks?: Task[];
}

interface Task {
  title: String;
}

export default function EditProjectDetails(props: any) {
  
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      title: "",
      date_created: "",
      tasks: [],
    },
  ]);

  function postDatafromForm(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData);
    newProjPayload(formObject, parseInt(props.projectId));
    console.log(formObject)
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
      <form onSubmit={postDatafromForm} className="w-full max-w-[50%]">
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
