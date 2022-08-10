import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../api/api";
import { Milestone, Project } from "../api/types";
import { authFetch } from "../auth/AuthProvider";
import EditProjectDetails from "../components/EditProjectDetails";
import MilestoneTaskInputNew from "../components/MilestoneTaskInputNew";
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
      tasks: [],
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

  // =============================
  // Milestone Actions

  function addMilestone(e: any) {
    if (!project.milestones) {
      project.milestones = [];
    }
    project.milestones.push(milestoneFactory());
    setProject({ ...project });
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
    console.log(project)
  }

  return (
    <>
      <TabContainer color={Colors.lightLavender}>
        <div>
          <div className="my-4">
            <button
              onClick={addMilestone}
              className="shadow bg-lightOrange hover:bg-lightPink focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full"
              type="submit"
            >
              Add Milestone
            </button>
          </div>
          <form onSubmit={submitForm} className="w-full">
            {project.milestones &&
              project.milestones.map((m, i) => {
                return (
                  <MilestoneTaskInputNew
                    milestone={m}
                    updateMilestone={(newm) => updateMilestone(i, newm)}
                  />
                );
              })}
          </form>
        </div>
      </TabContainer>
    </>
  );
}

export default function Page() {
  return DefaultLayout({ children: editProject() });
}
