import EditProjectDetails from "../components/EditProjectDetails";
import TabContainer, { Colors } from "../components/TabContainer";
import { DefaultLayout } from "../layouts/Default";

function editProject() {
  return (
    <>
      <TabContainer color={Colors.lightLavender}>
    <><EditProjectDetails/></>
      </TabContainer>
    </>
  );
}

export default function Page() {
  return DefaultLayout({ children: editProject() });
}
