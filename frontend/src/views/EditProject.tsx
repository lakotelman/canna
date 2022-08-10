import { useParams } from "react-router-dom";
import EditProjectDetails from "../components/EditProjectDetails";
import TabContainer, { Colors } from "../components/TabContainer";
import { DefaultLayout } from "../layouts/Default";

function editProject() {
  let { projectId } = useParams();

  return (
    <>
      <TabContainer color={Colors.lightLavender}>
    <><EditProjectDetails projectId={projectId}/></>
      </TabContainer>
    </>
  );
}

export default function Page() {
  return DefaultLayout({ children: editProject() });
}
