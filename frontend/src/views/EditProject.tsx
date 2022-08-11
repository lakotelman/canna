import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../api/api";
import { Milestone, Project } from "../api/types";
import { authFetch } from "../auth/AuthProvider";
import MilestoneTaskInputNew from "../components/MilestoneTaskInputNew";
import ProjectDetails from "../components/ProjectDetails";
import TabContainer, { Colors } from "../components/TabContainer";
import { DefaultLayout } from "../layouts/Default";

function editProject() {
  const api = useApi(authFetch);
  let { projectId } = useParams();
  let [project, setProject] = useState<Project>({});

  function milestoneFactory(): Milestone {
    return {
      id: -1,
      project_id: projectId!,
      title: "",
      date_created: "",
      tasks: [{ title: "" }],
    };
  }

  useEffect(() => {
    const thing = async () => {
      const { response, data } = await api.getProjectById(projectId!);
      if (response) {
        setProject(data);
      }
    };
    thing();
  }, []);

  function submitForm(e: any) {
    e.preventDefault();
  }

  // Milestone Actions
  // =============================

  function addMilestone(e: any) {
    if (!project.milestones) {
      project.milestones = [];
    }
    project.milestones.push(milestoneFactory());
    setProject({ ...project });
  }
  
  function removeMilestone(e: any, idx: number) {
    let newList = project.milestones?.splice(idx, 1);
    project.milestones = newList;
    setProject({ ...project });
  }

  function moveMilestoneDown(e: any, idx: number) {
    if (!project.milestones) {
      project.milestones = [];
    }
    console.log("clickity");
    if (idx != project.milestones.length - 1) {
      let milestone = project.milestones[idx];
      project.milestones.splice(idx, 1);
      let newIdx = idx + 1;
      let newOrder = project.milestones.splice(newIdx, 0, milestone);
      setProject({ ...project });
    } else {
      return;
    }
  }

  function moveMilestoneUp(e: any, idx: number) {
    if (!project.milestones) {
      project.milestones = [];
    }
    if (idx != 0) {
      let milestone = project.milestones[idx];
      project.milestones.splice(idx, 1);
      let newIdx = idx - 1;
      project.milestones.splice(newIdx, 0, milestone);
      setProject({ ...project });
    } else {
      return;
    }
  }

  function updateMilestone(idx: number, m: Milestone): void {
    // Make Request with new milestone data
    // Get updated milestone data from backend
    // Replace milestone at index on current project
    if (!project.milestones) {
      return;
    }

    project.milestones[idx] = m;
    setProject({ ...project });
    console.log(project);
  }

  return (
    <>
      <TabContainer color={Colors.lightLavender}>
        <div className="w-5/6">
          <h1 className="text-3xl">{project.title}</h1>
          <button
            onClick={addMilestone}
            className="bg-lightOrange p-2 rounded-full"
          >
            Add Milestone
          </button>
          <div className="my-4"></div>
          <form onSubmit={submitForm} className="">
            {project.milestones &&
              project.milestones.map((m, i) => {
                return (
                  <MilestoneTaskInputNew
                    moveMilestoneUp={(e) => moveMilestoneUp(e, i)}
                    moveMilestoneDown={(e) => moveMilestoneDown(e, i)}
                    removeMilestone={(e) => removeMilestone(e, i)}
                    milestone={m}
                    updateMilestone={(newm) => updateMilestone(i, newm)}
                    key = {i}
                  />
                );
              })}
              <button className="bg-lightGreen p-2 rounded-full w-full">Save</button>
          </form>
        </div>
      </TabContainer>
    </>
  );
}

export default function Page() {
  return DefaultLayout({ children: editProject() });
}
