import * as React from "react";
import { Figure } from "../Figure";
import BinaryCounter from "../BinaryCounter";
import { Page } from "../Page";

export const C01S02 = () => (
  <Page header={"Representing Numbers in Binary"}>
    <p>
      Few things are naturally represented in binary, and numbers are one of
      those things. We really only need to make one small tweak in our natural
      way of thinking to understand how numbers are encoded in binary: We need
      to think of numbers in terms of two symbols as opposed to 10. In other
      words, we need to learn to think in a base 2 number system instead of base
      10.
    </p>
    <Figure
      number={1}
      description={"A base 10 number and its base 2 equivalent"}
    >
      <BinaryCounter value={254} />
    </Figure>
  </Page>
);
