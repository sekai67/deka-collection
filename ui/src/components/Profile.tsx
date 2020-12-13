import "../styles/Profile.scoped.scss";

import { useSelector } from "react-redux";
import { Account } from "../stores/accounts";

type Props = {
	account: Account;
};

export default function Component({ account }: Props) {
	const replies = useSelector(state => state.replies.value);

	const openProfile = () => {
		window.open(`https://twitter.com/${account.screen_name}`);
	};
	const sendReply = () => {
		let selected = replies.filter(({ selected }) => selected);
		if (selected.length == 0) {
			selected = replies;
		}

		const { value } = replies[Math.floor(Math.random() * selected.length)];
		const text = value
			.replace(/{{@}}/g, `@${account.screen_name}`)
			.trim()
			.substr(0, 140);
		window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
	};

	return (
		<article>
			<img onClick={openProfile} src={`https://res.cloudinary.com/narusejun/image/twitter_name/h_200/${account.screen_name}.jpg`} />
			<div className="content">
				<h2 onClick={openProfile}>{account.full_name}</h2>
				<h3 onClick={openProfile}>@{account.screen_name}</h3>
				<p>{account.bio}</p>
			</div>
			<div className="action" onClick={sendReply}>
				クソリプ
			</div>
		</article>
	);
}
