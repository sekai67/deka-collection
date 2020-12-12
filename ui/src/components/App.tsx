import style from "../styles/App.module.scss";

import { useEffect, useState } from "react";
import { HashRouter, Switch, Route, Link } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "../stores";
import { fetchAccounts } from "../stores/accounts";
import Collection from "./Collection";
import NewAccount from "./NewAccount";
import ReplyList from "./ReplyList";

export default function Component() {
	const { matches } = matchMedia("(prefers-color-scheme: dark)");
	const [darkMode, setDarkMode] = useState(matches);

	const dispatch = useAppDispatch();
	useEffect(() => {
		(async () => {
			const result = await dispatch(fetchAccounts());
			try {
				await unwrapResult(result);
			} catch (e) {
				if ("message" in e) {
					e = e.message;
				}
				alert(`fething accounts: ${e}`);
			}
		})();
	}, []);

	return (
		<div className={style.Component} data-theme={darkMode ? "dark" : "light"}>
			<HashRouter>
				<header>
					<h1>DEKA COLLECTION</h1>
					<Link to="/">コレクション</Link>
					<Link to="/new">追加</Link>
					<Link to="/replies">クソリプ集</Link>

					<label className="switch-light switch-ios">
						<input type="checkbox" checked={darkMode} onChange={e => setDarkMode(e.target.checked)} />
						<span>
							<span>🌞</span>
							<span>🌚</span>
							<a></a>
						</span>
					</label>
				</header>

				<main>
					<Switch>
						<Route path="/replies">
							<ReplyList />
						</Route>
						<Route path="/new">
							<NewAccount />
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
