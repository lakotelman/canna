import { DefaultLayout } from "../layouts/Default";
import TabContainer, { Colors } from "../components/TabContainer";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AllProjectsList from "../components/AllProjectsList";
import ProjectDetails from "../components/ProjectDetails";
import { useEffect, useState } from "react";
import { authFetch, useAuth } from "../auth/AuthProvider";
import { useApi } from "../api/api";
import { Project } from "../api/types";
import AddButton from "../components/AddButton";

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();
  const [currentProject, setCurrentProject] = useState<Project>({});
  const [userTitle, setUserTitle] = useState("");
  const [logged, session] = useAuth();

  const api = useApi(authFetch);

  const getProjectData = async () => {
    // const response = await authFetch("http://127.0.0.1:5000/api/projects");
    const { data, response } = await api.getAllProjects();
    if (response.status === 401) {
      setUserTitle("Please sign in to your account");
      return null;
    } else {
      setProjects(data.projects);
      const params = new URLSearchParams(window.location.search);
      if (params.get("id")) {
        let projectFound = false
        for (let proj of data.projects){
          if (proj.id == params.get("id")) {
            projectFound = true
            setCurrentProject(proj);
          }}
        if(!projectFound){ 
          setCurrentProject(data.projects[0])
        }
      }
      else{
        setCurrentProject(data.projects[0])
      }
      setUserTitle(data.username);
    }
  };
  useEffect(() => {
    getProjectData();
  }, []);

  const editProjectClick = (e: any) => {
    console.log(currentProject);
    e.preventDefault();
    if (!currentProject) {
      console.error("No project set");
    } else {
      navigate(`/projects/${currentProject.id}/edit`);
    }
  };
  return (
    <>
      {logged ? (
        <TabContainer color={Colors.lightLavender}>
          <>
            <div>
              <AllProjectsList
                projects={projects}
                setProject={setCurrentProject}
                currentProject={currentProject}
              />
            </div>
            <div>
              <ProjectDetails
                refresh={getProjectData}
                all_projects={projects}
                project={currentProject}
              />
              <button
                onClick={editProjectClick}
                className="bg-lightLavender p-2 rounded-full hover:bg-lightPink"
              >
                Edit Project
              </button>
            </div>
            <AddButton />
          </>
        </TabContainer>
      ) : (
        <TabContainer color={Colors.lightLavender}>
          <>
            <div className="mx-auto my-12">
              <h1 className=" text-4xl">Please sign into your account</h1>
              <button className=" m-4 bg-lightOrange p-2 rounded-full">
                <Link to="/Login">Login</Link>
              </button>
            </div>
          </>
        </TabContainer>
      )}
      ;
    </>
  );
}

export default function Page() {
  return DefaultLayout({ children: Projects() });
}
