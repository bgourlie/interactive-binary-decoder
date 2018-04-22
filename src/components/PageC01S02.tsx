import * as React from "react";
import PageC01S02 from "../markdown/c01_s02.md";
import { Figure } from "./Figure";
import BinaryCounter from "./BinaryCounter";

export const C01S02 = () => (
  <div>
    <PageC01S02 />
    <Figure label={"Figure 1."} description={"Base 10 to base 2 comparison"}>
      <BinaryCounter value={254} />
    </Figure>
  </div>
);
