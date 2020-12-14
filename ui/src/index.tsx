import { Provider } from "react-redux";
import store from "./stores";
import { fetchAccounts } from "./stores/accounts";
import React from "react";
import ReactDOM from "react-dom";
import App from "./views/App";
import GlobalStyle from "./styles/global";

store.dispatch(fetchAccounts());

ReactDOM.render(
	<React.StrictMode>
		<GlobalStyle />
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root"),
);
