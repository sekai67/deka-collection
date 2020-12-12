import style from "../styles/Profile.module.scss";

import { Account } from "../stores/accounts";

type Props = {
	account: Account;
};

export default function Component({ account }: Props) {
	const openProfile = () => {
		window.open(`https://twitter.com/${account.screen_name}`);
	};
	const sendReply = () => {};

	return (
		<article className={style.Component}>
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
