import React from "react";
import TabNavigationAll from "../components/TabNavigationAll";
import UserHeader from "../components/UserHeader";

interface Props {
  children: JSX.Element;
}

export function DefaultLayout(props: Props) {
  return (
    <>
      <UserHeader />
      <TabNavigationAll/>
      {props.children}
    </>
  );
}
