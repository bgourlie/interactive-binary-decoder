import { StyleSheet, css } from "aphrodite/no-important";

type Icon = "plus" | "minus" | "first" | "last" | "play" | "pause";

export const globalStyles = StyleSheet.create({
  monospace: {
    fontFamily: '"Inconsolata", monospace'
  },
  iconGroup: {
    display: "flex"
  }
});

const iconStyles = StyleSheet.create({
  icon: {
    cursor: "pointer",
    fontFamily: "'icomoon'",
    speak: "none",
    fontStyle: "normal",
    fontWeight: "normal",
    fontVariant: "normal",
    textTransform: "none",
    padding: "0 0.25rem",
    lineHeight: "1",
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale"
  },
  iconPlus: {
    ":before": {
      content: "'\\ea0a'"
    }
  },
  iconMinus: {
    ":before": {
      content: "'\\ea0b'"
    }
  },
  iconFirst: {
    ":before": {
      content: "'\\ea21'"
    }
  },
  iconLast: {
    ":before": {
      content: "'\\ea22'"
    }
  },
  iconPlay: {
    ":before": {
      content: "'\\ea1c'"
    }
  },
  iconPause: {
    ":before": {
      content: "'\\ea1d'"
    }
  }
});

export const iconClass = (icon: Icon) => {
  return css(
    iconStyles.icon,
    icon === "play" && iconStyles.iconPlay,
    icon === "pause" && iconStyles.iconPause,
    icon === "first" && iconStyles.iconFirst,
    icon === "last" && iconStyles.iconLast,
    icon === "plus" && iconStyles.iconPlus,
    icon === "minus" && iconStyles.iconMinus
  );
};

export { StyleSheet, css };
