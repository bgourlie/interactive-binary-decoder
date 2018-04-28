import * as React from "react";
import * as PropTypes from "prop-types";
import { globalStyles, iconClass, css } from "../styles";

type PlayState = "play" | "pause";

interface Props {
  playState: PlayState;
  togglePlayClickHandler: () => void;
  goFirstClickHandler: () => void;
  goLastClickHandler: () => void;
}

interface PlayerControlsComponent {
  (props: Props): JSX.Element;
  displayName?: "PlayerControls";
  propTypes?: PropTypes.ValidationMap<Props>;
}

export const PlayerControls: PlayerControlsComponent = (props: Props) => (
  <div className={css(globalStyles.iconGroup)}>
    <span
      className={iconClass("first")}
      onClick={() => props.goFirstClickHandler()}
    />
    <span
      className={iconClass(props.playState)}
      onClick={() => props.togglePlayClickHandler()}
    />
    <span
      className={iconClass("last")}
      onClick={() => props.goLastClickHandler()}
    />
  </div>
);

PlayerControls.displayName = "PlayerControls";
PlayerControls.propTypes = {
  playState: PropTypes.string.isRequired,
  togglePlayClickHandler: PropTypes.func,
  goFirstClickHandler: PropTypes.func,
  goLastClickHandler: PropTypes.func
};
