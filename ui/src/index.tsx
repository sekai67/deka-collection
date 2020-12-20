import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import GlobalStyle from "./styles/global";
import App from "./views/App";

ReactDOM.render(
	<React.StrictMode>
		<GlobalStyle />
		<RecoilRoot>
			<App />
		</RecoilRoot>
	</React.StrictMode>,
	document.getElementById("root"),
);
