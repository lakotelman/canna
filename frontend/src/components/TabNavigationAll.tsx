import TabsNav, { TabColors } from "./TabsNavSingle";

export default function TabNavigationAll() {
  return (
    <>
      <div className="hidden md:flex justify-start mx-4 md:mx-12 h-[90%]">
        <div className="flex justify-start gap-12 mt-4">
          <TabsNav color={TabColors.lightLavender} destination="/projects">
            <div>
              <p>Projects</p>
            </div>
          </TabsNav>
          <TabsNav color={TabColors.lightGreen} destination="/visions">
            <div>
              <p>Visions</p>
            </div>
          </TabsNav>
        </div>
      </div>
    </>
  );
}
