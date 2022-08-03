import { DefaultLayout } from "../layouts/Default";
import TabContainer, { Colors } from "../components/TabContainer";

function addEditProject() {
  return (
    <TabContainer color={Colors.lightLavender}>
      <div>
        <h1>Add a New Project</h1>
        Project Form
      </div>
    </TabContainer>
  );
}

export default function Page() {
  return DefaultLayout({ children: addEditProject() });
}
