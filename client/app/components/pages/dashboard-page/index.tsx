import React, {
  FunctionComponent,
  ReactElement,
  useState,
  useEffect
} from "react";
import posed, { PoseGroup } from "react-pose";

const Div = posed.div({
  // delay the animation slightly so the enter and exits do not overlap
  // exit: { x: ({ direction }) => direction * 100, opacity: 0 },
});

export const DashboardPage: FunctionComponent = (): ReactElement => {
  return (
    <PoseGroup flipMove={false}>
      <Div key="dashboard" className="dashboard">
        <h2>Home</h2>
      </Div>
    </PoseGroup>
  );
};

export default DashboardPage;
