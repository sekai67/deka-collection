import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { selectedRepliesState } from "../atoms/replies";
import { Account } from "../schema";
import * as mixins from "../styles/mixins";

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
const Command = styled.div(mixins.button, mixins.transition("border-color"), {
	flex: "0 0 auto",
	padding: "0.6em",
	textAlign: "center",
	borderTop: mixins.border,
});

type Props = {
	account: Account;
};
const Component = ({ account }: Props) => {
	const replies = useRecoilValue(selectedRepliesState);

	const openProfile = () => {
		window.open(`https://twitter.com/${account.screenName}`);
	};
	const sendReply = () => {
		const reply = replies[Math.floor(Math.random() * replies.length)];
		const text = reply.replace(/{{@}}/g, `@${account.screenName}`).trim().substr(0, 140);
		window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
	};

	return (
		<Container>
			<ProfilePicture
				onClick={openProfile}
				src={`https://res.cloudinary.com/narusejun/image/twitter_name/h_200/${account.screenName}.jpg`}
			/>
			<Profile>
				<FullName onClick={openProfile}>{account.name}</FullName>
				<ScreenName onClick={openProfile}>@{account.screenName}</ScreenName>
				<Bio>{account.description}</Bio>
			</Profile>
			<Command onClick={sendReply}>クソリプ</Command>
		</Container>
	);
};
export default Component;
