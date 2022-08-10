import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

interface Milestone {
  title: String;
  project_id: Number;
  tasks?: Task[];
}
interface Task {
  title: String;
}

export default async function newProjPayload (rawFormData: Object, projectId: Number) {
  const [logged, session] = useAuth();
  const navigate = useNavigate();

  
  const projectPayload: Milestone[] = [];

  let milestoneTasks: Record<string, Task[]> = {};
  for (const [key, value] of Object.entries(rawFormData)) {
    let milestoneIndex = key.replace(/\D/g, "");

    if (!milestoneTasks[milestoneIndex]) {
      milestoneTasks[milestoneIndex] = [];
    }

    if (key.includes("tasks") && key.includes(milestoneIndex)) {
      let stringTasks = value.split(/\r?\n/);
      for (let task of stringTasks) {
        let t1 = {
          title: task,
        };
        milestoneTasks[milestoneIndex].push(t1);
      }
    }
    if (key.includes("milestone")) {
      const milestone = value;
      let milestoneObj = {
        title: milestone,
        project_id: projectId,
        tasks: milestoneTasks[milestoneIndex],
      };
      projectPayload.push(milestoneObj);
    }
  }
    const response = await fetch(
      "http://127.0.0.1:5000/api/newprojectdetails",
      {
        method: "post",
        body: JSON.stringify(projectPayload),
        headers: new Headers({
          Authorization: `Bearer ${session?.access_token}`,
        }),
      }
    );
    const data = await response.json();
    console.log(data)
    navigate("/projects");
}
