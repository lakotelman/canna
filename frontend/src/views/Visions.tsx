import { DefaultLayout } from "../layouts/Default"
import TabContainer, {Colors} from "../components/TabContainer";
import VisionCard from "../components/Visions/VisionCard";

function Visions(){ 
    return (
        <TabContainer color={Colors.lightGreen}>
            <div>
                <p>Coming Soon!</p>
                <VisionCard/>
            </div>
        </TabContainer>
      );
}

export default function Pages(){ 
    return DefaultLayout({children:Visions()})
}