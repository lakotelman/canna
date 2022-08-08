import { DefaultLayout } from "../layouts/Default";
import TabContainer, { Colors } from "../components/TabContainer";
import { Link, Navigate } from "react-router-dom";
import AllProjectsList from "../components/AllProjectsList";
import ProjectDetails from "../components/ProjectDetails";
import { useEffect, useState } from "react";
import { authFetch, useAuth } from "../auth/AuthProvider";

interface Project {
  title: string;
}

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [userTitle, setUserTitle] = useState("");
  const [logged] = useAuth();

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
          setUserTitle(response.username);
          console.log(response);
        }
      });
  }, []);
  return (
    <>
      {/* {!logged? (
        <Navigate to="/login" />
      ) : ( */}
      <TabContainer color={Colors.lightLavender}>
        <>
          <div>
            <AllProjectsList>
              <>
                {projects.map((proj) => {
                  return <p className="px-2">{proj["title"]}</p>;
                })}
              </>
            </AllProjectsList>
          </div>
          <div><ProjectDetails></ProjectDetails></div>
        </>
      </TabContainer>
      {/* )} */}
    </>
  );
}

export default function Page() {
  return DefaultLayout({ children: Projects() });
}
