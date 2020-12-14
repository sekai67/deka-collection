import { css } from "@emotion/react";
import { Theme, variables } from "./_type";
import dark from "./dark";
import light from "./light";

const compile = (theme: Theme) =>
	css({
		":root": Object.fromEntries(variables.map(key => [`--${key}`, theme[key]])),
	});

export const themes = {
	dark: compile(dark),
	light: compile(light),
};
export default Object.fromEntries(variables.map(key => [key, `var(--${key})`])) as Theme;
