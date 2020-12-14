import dark from "./dark";
import light from "./light";

import { css } from "@emotion/react";
import { Property } from "csstype";

const defs = [
	"textColor",
	"subtextColor",
	"backgroundColor",
	"borderColor",
	"primaryColor",
	"secondaryColor",
	"invertedColor",
] as const;

export type Theme = { [K in typeof defs[number]]: Property.Color };

export const styles = css({
	"[data-theme='dark']": Object.fromEntries(defs.map(def => [`--${def}`, dark[def]])),
	"[data-theme='light']": Object.fromEntries(defs.map(def => [`--${def}`, light[def]])),
});

export default Object.fromEntries(defs.map(def => [def, `var(--${def})`])) as Theme;
