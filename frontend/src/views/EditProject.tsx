import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditProjectDetails from "../components/EditProjectDetails";
import TabContainer, { Colors } from "../components/TabContainer";
import { DataContext } from "../contexts/DataProvider";
import { DefaultLayout } from "../layouts/Default";

function editProject() {
  let { api } = useContext(DataContext);
  let { projectId } = useParams();

  let [project, setProject] = useState({});

  useEffect(() => {
    const thing = async () => {
      const response = await api.getProjectById(projectId);
      if (response) {
        setProject(response);
      }
    };
    thing();
  }, []);

  return (
    <>
      <TabContainer color={Colors.lightLavender}>
        <EditProjectDetails projectId={projectId} />
      </TabContainer>
    </>
  );
}

export default function Page() {
  return DefaultLayout({ children: editProject() });
}
