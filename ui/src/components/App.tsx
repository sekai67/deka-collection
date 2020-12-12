import style from "../styles/App.module.scss";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HashRouter, Switch, Route, Link } from "react-router-dom";
import { fetchAccounts } from "../stores/accounts";
import Collection from "./Collection";
import ReplyList from "./ReplyList";

export default function Component() {
	const { matches } = matchMedia("(prefers-color-scheme: dark)");
	const [theme, setTheme] = useState<"dark" | "light">(matches ? "dark" : "light");

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchAccounts());
	}, []);

	return (
		<div className={style.Component} data-theme={theme}>
			<HashRouter>
				<header>
					<h1>DEKA COLLECTION</h1>
					<Link to="/">Collection</Link>
					<Link to="/replies">Replies</Link>
				</header>
				<main>
					<Switch>
						<Route path="/replies">
							<ReplyList />
						</Route>
						<Route path="/">
							<Collection />
						</Route>
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
