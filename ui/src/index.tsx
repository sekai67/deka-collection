import { Provider } from "react-redux";
import store from "./stores";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import GlobalStyle from "./styles/global";

ReactDOM.render(
	<React.StrictMode>
		<GlobalStyle />
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root"),
);
