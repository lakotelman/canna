import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../api/api";
import { authFetch } from "../auth/AuthProvider";
import { Milestone } from "../api/types";
import MilestoneTaskInputNew from "./MilestoneTaskInputNew";

interface Props {
  projectId: string | number;
}

export default function EditProjectDetails(props: Props) {
  const api = useApi(authFetch);
  const navigate = useNavigate();

  function milestoneFactory() {
    return {
      id: -1,
      project_id: props.projectId,
      title: "",
      date_created: "",
      tasks: [],
    };
  }

  const [milestones, setMilestones] = useState<Milestone[]>([
    milestoneFactory(),
  ]);

  function postDatafromForm(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData);
    api.newProjPayload(formObject, props.projectId);
    console.log(formObject);
    navigate("/projects");
  }

  function removeMilestone(e: any) {
    e.preventDefault();
    setMilestones(milestones.slice(0, -1));
  }

  function addMilestone(e: any) {
    e.preventDefault();
    setMilestones([...milestones, milestoneFactory()]);
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
              <MilestoneTaskInputNew
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
