import * as React from "react";
import * as PropTypes from "prop-types";
import { globalStyles, css, iconClass } from "../styles";

interface IncrementControlsComponent {
  (props: Props): JSX.Element;
  displayName?: "IncrementControls";
  propTypes?: PropTypes.ValidationMap<Props>;
}

interface Props {
  incrementClickHandler: () => void;
  decrementClickHandler: () => void;
}

export const IncrementControls: IncrementControlsComponent = (props: Props) => {
  return (
    <div className={css(globalStyles.iconGroup)}>
      <span
        className={iconClass("minus")}
        onClick={() => props.decrementClickHandler()}
      />
      <span
        className={iconClass("plus")}
        onClick={() => props.incrementClickHandler()}
      />
    </div>
  );
};

IncrementControls.displayName = "IncrementControls";

IncrementControls.propTypes = {
  incrementClickHandler: PropTypes.func,
  decrementClickHandler: PropTypes.func
};
