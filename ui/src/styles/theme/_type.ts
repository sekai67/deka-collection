import type { Property } from "csstype";

export const variables = [
	"textColor",
	"subtextColor",
	"backgroundColor",
	"borderColor",
	"primaryColor",
	"secondaryColor",
	"invertedColor",
] as const;

export type Theme = { [K in typeof variables[number]]: Property.Color };
