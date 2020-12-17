import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./stores";
import { fetchAccounts } from "./stores/accounts";
import GlobalStyle from "./styles/global";
import App from "./views/App";

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
