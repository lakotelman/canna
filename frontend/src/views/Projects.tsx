import { DefaultLayout } from "../layouts/Default";
import TabContainer, { Colors } from "../components/TabContainer";
import { Link, Navigate } from "react-router-dom";
import AllProjectsList from "../components/AllProjectsList";
import ProjectDetails from "../components/ProjectDetails";
import { useEffect, useState } from "react";
import { authFetch, useAuth } from "../auth/AuthProvider";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState({});
  const [userTitle, setUserTitle] = useState("");
  const [logged, session] = useAuth();

  useEffect(() => {
    authFetch("http://127.0.0.1:5000/api/projects")
      .then((response) => {
        if (response.status === 401) {
          setUserTitle("Please sign in to your account");
          return null;
        }
        return response.json();
      })
      .then((response) => {
        if (response) {
          setProjects(response.projects);
          setCurrentProject(response.projects[0]);
          setUserTitle(response.username);
          console.log(response);
        }
      });
  }, []);
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
              <ProjectDetails project={currentProject} />
            </div>
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
