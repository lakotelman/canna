import { DefaultLayout } from "../layouts/Default";
import TabContainer, { Colors } from "../components/TabContainer";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authFetch, useAuth } from "../auth/AuthProvider";

function Projects() {
  const [projects, setProjects] = useState({});
  const [logged] = useAuth();

  useEffect(() => {
    authFetch("http://127.0.0.1:5000/api/projects")
      .then((response) => {
        if (response.status === 401) {
          setProjects("Please sign in to your account");
          return null;
        }
        return response.json();
      })
      .then((response) => {
        if (response && response.projects) {
          setProjects(response.projects);
          console.log(projects)
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
            <div>All Projects List</div>
            <div>
              <h2></h2>
            </div>
            <div>Project Details</div>
          </>
        </TabContainer>
      {/* )} */}
    </>
  );
}

export default function Page() {
  return DefaultLayout({ children: Projects() });
}
