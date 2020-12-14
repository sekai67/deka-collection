import "three-dots";
import "typeface-oswald";
import "css-toggle-switch/dist/toggle-switch.css";
import "./styles/index.scss";
import { Global } from "@emotion/react";
import { styles as globalStyles } from "./styles";
import { styles as themeStyles } from "./styles/theme";

import { Provider } from "react-redux";
import store from "./stores";

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

ReactDOM.render(
	<React.StrictMode>
		<Global styles={globalStyles} />
		<Global styles={themeStyles} />
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root"),
);
