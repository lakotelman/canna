import { DefaultLayout } from "../layouts/Default";
import TabContainer, {Colors} from "../components/TabContainer";
import { Link } from "react-router-dom";

function Projects() {
  return (
    <>
    <TabContainer color={Colors.lightLavender}>
        <><div>All Projects List</div>
        <div>Project Details</div></>
    </TabContainer>
    </>
  );
}

export default function Page() {
  return DefaultLayout({ children: Projects() });
}
