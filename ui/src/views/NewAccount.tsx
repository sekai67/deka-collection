import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { ChangeEvent, Fragment, KeyboardEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAccountRegistrar } from "../atoms/accounts";
import Spinner from "../components/Spinner";
import * as mixins from "../styles/mixins";

const Heading = styled.h2(mixins.logoText, {
	margin: "0",
	fontSize: "1.2rem",
	color: mixins.theme.subtextColor,
});
const ProfileCard = styled.div(mixins.card, {
	display: "inline-flex",
	flexDirection: "row",
	height: mixins.cardSize,
});
const ProfileImage = styled.img({
	width: mixins.cardSize,
	height: mixins.cardSize,
});
const AcountLookup = styled.div({
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-evenly",
	alignItems: "flex-end",
	padding: "0 1em",
});
const ScreenNameInput = styled.input(mixins.transition(), {
	padding: "0.5em",
	fontSize: "2em",

	border: mixins.border,
	borderRadius: "0.2em",

	color: mixins.theme.textColor,
	backgroundColor: mixins.theme.backgroundColor,
	"&::placeholder": css(mixins.transition(), {
		color: "theme.$color-border",
	}),
});
const Command = styled.div(mixins.button, {
	padding: "1em 2em",
	borderRadius: "0.2em",
});

const Component = () => {
	const [target, setTarget] = useState("");
	const [fallback, setFallback] = useState(false);

	const profilePic = fallback
		? "https://abs.twimg.com/sticky/default_profile_images/default_profile_200x200.png"
		: `https://res.cloudinary.com/narusejun/image/twitter_name/h_200/${target}.jpg`;
	const changeProfilePicture = (e: ChangeEvent<HTMLInputElement>) => {
		setTarget(e.target.value);
		setFallback(false);
	};
	const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key != "Enter") {
			return;
		}
		registerAccount();
	};

	const [loading, setLoading] = useState(false);
	const registrar = useAccountRegistrar();
	const history = useHistory();
	const registerAccount = async () => {
		if (fallback) {
			return alert("No such account!");
		}
		setLoading(true);
		try {
			await registrar(target);
		} catch (e) {
			setLoading(false);
			return alert(e);
		}
		history.push("/");
	};

	return (
		<Fragment>
			<Heading>アカウントをDEKA COLLECTIONに追加する</Heading>
			<ProfileCard>
				<ProfileImage src={profilePic} onError={() => setFallback(true)} />
				<AcountLookup>
					<ScreenNameInput
						type="text"
						placeholder="@deka0106"
						value={target}
						onKeyPress={handleEnterKey}
						onChange={changeProfilePicture}
					/>
					{loading ? <Spinner /> : <Command onClick={registerAccount}>追加</Command>}
				</AcountLookup>
			</ProfileCard>
		</Fragment>
	);
};
export default Component;
