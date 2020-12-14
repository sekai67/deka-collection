import { css } from "@emotion/react";
import { Property } from "csstype";
import theme from "./theme";

export { theme };

export const border: Property.Border = `1px solid ${theme.borderColor}`;
export const cardSize: Property.Width & Property.Height = "200px";

export const transition = (
	props: Property.TransitionProperty[] = ["color", "border-color", "background-color", "box-shadow"],
) =>
	css({
		transitionDuration: "256ms",
		transitionProperty: props,
		transitionTimingFunction: "linear",
	});

export const keyBackground = css({
	color: theme.invertedColor,
	background: `linear-gradient(30deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
});

export const logoText = css({
	fontFamily: "Oswald",
	fontWeight: "normal",
	letterSpacing: "0.1em",
});
export const logoStyle = css(keyBackground, {
	color: theme.primaryColor,
	backgroundClip: "text",
	WebkitTextFillColor: "transparent",
});

export const button = css({
	cursor: "pointer",
	color: theme.secondaryColor,

	"&:hover": keyBackground,
});

export const card = css(transition(), {
	overflow: "hidden",
	margin: "0 1em 1em 0;",

	borderRadius: "4px",
	boxShadow: `0 2px 3px ${theme.borderColor}, 0 0 0 1px ${theme.borderColor}`,
});
