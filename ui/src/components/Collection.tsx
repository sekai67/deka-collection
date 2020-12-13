import "../styles/Collection.scoped.scss";

import { useSelector } from "react-redux";
import Profile from "./Profile";

export default function Component() {
	const accounts = useSelector(state => state.accounts.value);

	return (
		<section>
			{!accounts.length && <div className="loading dot-windmill" />}
			{accounts.map(account => (
				<Profile key={account.screen_name} account={account} />
			))}
		</section>
	);
}
