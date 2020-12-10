import style from "./styles/App.module.scss";

import { HashRouter, Switch, Route, Link } from "react-router-dom";

export default function App() {
	return (
		<div className={style.Scoped}>
			<HashRouter>
				<header>
					<h1>DEKA COLLECTION</h1>
					<Link to="/">Home</Link>
					<Link to="/settings">Settings</Link>
				</header>
				<main>
					<Switch>
						<Route path="/settings">Settings</Route>
						<Route path="/">Home</Route>
					</Switch>
				</main>
				<footer>
					Fork me on{" "}
					<a target="_blank" href="https://github.com/sekai67/deka-collection">
						GitHub
					</a>
					<br />
					Created with 🧡 by{" "}
					<a target="_blank" href="https://twitter.com/deka0106">
						@deka0106
					</a>
				</footer>
			</HashRouter>
		</div>
	);
}
