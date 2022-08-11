import { DefaultLayout } from "../layouts/Default";
import TabContainer, { Colors } from "../components/TabContainer";
import NewProjectForm from "../components/ProjectForm";
import AddButton from "../components/AddButton"

function AddProject() {
  return (
    <TabContainer addbutton={<AddButton/>} color={Colors.lightLavender}>
      <div>
        <h1 className="text-3xl p-2 mb-8">Add a New Project</h1>
        <NewProjectForm/>
      </div>
    </TabContainer>
  );
}

export default function Page() {
  return DefaultLayout({ children: AddProject() });
}
