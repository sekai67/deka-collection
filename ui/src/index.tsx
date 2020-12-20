import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { RecoilRoot } from "recoil";
import store from "./stores";
import { fetchAccounts } from "./stores/accounts";
import GlobalStyle from "./styles/global";
import App from "./views/App";

store.dispatch(fetchAccounts());

ReactDOM.render(
	<React.StrictMode>
		<GlobalStyle />
		<RecoilRoot>
			<Provider store={store}>
				<App />
			</Provider>
		</RecoilRoot>
	</React.StrictMode>,
	document.getElementById("root"),
);
