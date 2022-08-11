import { DefaultLayout } from "../layouts/Default"
import TabContainer, {Colors} from "../components/TabContainer";


function Visions(){ 
    return (
        <TabContainer color={Colors.lightGreen}>
            <p>Coming Soon!</p>
        </TabContainer>
      );
}

export default function Pages(){ 
    return DefaultLayout({children:Visions()})
}