import "typeface-oswald";
import "css-toggle-switch/dist/toggle-switch.css";
import "./styles/index.scss";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./stores";
import App from "./components/App";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root"),
);
