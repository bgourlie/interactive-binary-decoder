import * as React from "react";
import { Figure } from "../Figure";
import BinaryCounter from "../BinaryCounter";

export const C01S02 = () => (
  <div>
    <h1>Binary Number Representations</h1>
    <p>
      Few things are naturally represented in binary, and numbers are one of
      those things. We really only need to make one small tweak in our natural
      way of thinking to understand how numbers are encoded in binary: We need
      to think of numbers in terms of two symbols as opposed to 10. In other
      words, we need to learn to think in a base 2 number system instead of base
      10.
    </p>
    <Figure label={"Figure 1."} description={"Base 10 to base 2 comparison"}>
      <BinaryCounter value={254} />
    </Figure>
  </div>
);
