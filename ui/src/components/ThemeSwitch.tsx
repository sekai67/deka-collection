import "css-toggle-switch/src/toggle-switch.scss";

import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import * as mixins from "../styles/mixins";
import { themes } from "../styles/theme";
import { useState } from "react";

const Toggle = styled.label({
	cursor: "pointer",
	width: "70px",
});
const Appearance = styled.span({
	"input:checked ~ &&&": {
		borderColor: mixins.theme.primaryColor,
		boxShadow: `inset 0 0 0 30px ${mixins.theme.primaryColor}`,
		"> a": {
			borderColor: mixins.theme.primaryColor,
		},
	},
});

const Component = ({ className }: Parameters<typeof Toggle>[0]) => {
	const { matches } = matchMedia("(prefers-color-scheme: dark)");
	const [theme, setTheme] = useState<keyof typeof themes>(matches ? "dark" : "light");

	return (
		<Toggle className={`switch-light switch-ios ${className}`}>
			<Global styles={themes[theme]} />
			<input type="checkbox" checked={theme == "dark"} onChange={e => setTheme(e.target.checked ? "dark" : "light")} />
			<Appearance>
				<span>🌞</span>
				<span>🌚</span>
				<a />
			</Appearance>
		</Toggle>
	);
};
export default Component;
