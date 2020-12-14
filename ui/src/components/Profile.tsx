import styled from "@emotion/styled";
import * as mixins from "../styles/mixins";
import { useSelector } from "react-redux";
import { Account } from "../stores/accounts";

const Container = styled.div(mixins.card, {
	display: "flex",
	flexDirection: "column",
	width: mixins.cardSize,
});
const ProfilePicture = styled.img({
	cursor: "pointer",
	flex: "0 0 auto",
	width: mixins.cardSize,
	height: mixins.cardSize,
});
const Profile = styled.div({
	flex: "1 0 auto",
	padding: "1.2em",
	wordWrap: "break-word",
});
const FullName = styled.h2({
	cursor: "pointer",
	margin: "0",
	fontWeight: "normal",
	lineHeight: "1.1em",
});
const ScreenName = styled.h3({
	margin: "0",
	fontWeight: "normal",
	lineHeight: "1.1em",
	fontSize: "0.8em",
	color: mixins.theme.subtextColor,
});
const Bio = styled.p({
	lineHeight: "1.1em",
	fontSize: "0.9em",
});
const Command = styled.div(mixins.button, mixins.transition(["boreder-color"]), {
	flex: "0 0 auto",
	padding: "0.6em",
	textAlign: "center",
	borderTop: mixins.border,
});

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
		<Container>
			<ProfilePicture
				onClick={openProfile}
				src={`https://res.cloudinary.com/narusejun/image/twitter_name/h_200/${account.screen_name}.jpg`}
			/>
			<Profile>
				<FullName onClick={openProfile}>{account.full_name}</FullName>
				<ScreenName onClick={openProfile}>@{account.screen_name}</ScreenName>
				<Bio>{account.bio}</Bio>
			</Profile>
			<Command onClick={sendReply}>クソリプ</Command>
		</Container>
	);
}
