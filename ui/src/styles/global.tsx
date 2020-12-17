import { css, Global } from "@emotion/react";
import "typeface-oswald";

const styles = css({
	"*": {
		boxSizing: "border-box",
	},
	"html, body": {
		padding: 0,
		margin: 0,
	},
});

const Component = () => {
	return <Global styles={styles} />;
};
export default Component;
