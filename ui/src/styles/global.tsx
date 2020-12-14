import "typeface-oswald";

import { css, Global } from "@emotion/react";

const styles = css({
	"*": {
		boxSizing: "border-box",
	},
	"html, body": {
		padding: 0,
		margin: 0,
	},
});

export default function Component() {
	return <Global styles={styles} />;
}
