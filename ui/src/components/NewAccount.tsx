import style from "../styles/NewAccount.module.scss";

import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "../stores";
import { addAccount } from "../stores/accounts";

export default function Component() {
	const [target, setTarget] = useState("");
	const [fallback, setFallback] = useState(false);

	const profilePic = fallback ? "https://abs.twimg.com/sticky/default_profile_images/default_profile_200x200.png" : `https://res.cloudinary.com/narusejun/image/twitter_name/h_200/${target}.jpg`;
	const changeProfilePicture = (e: ChangeEvent<HTMLInputElement>) => {
		setTarget(e.target.value);
		setFallback(false);
	};
	const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key != "Enter") {
			return;
		}
		callAddAccount();
	};

	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const history = useHistory();
	const callAddAccount = async () => {
		if (fallback) {
			return alert("No such account!");
		}

		setLoading(true);
		const result = await dispatch(addAccount(target));
		setLoading(false);
		try {
			await unwrapResult(result);
			history.push("/");
		} catch (e) {
			if ("message" in e) {
				e = e.message;
			}
			alert(`adding account: ${e}`);
		}
	};

	return (
		<section className={style.Component}>
			<h2>アカウントをDEKA COLLECTIONに追加する</h2>
			<article>
				<img src={profilePic} onError={() => setFallback(true)} />
				<div>
					<input type="input" placeholder="@deka0106" value={target} onKeyPress={handleEnterKey} onChange={changeProfilePicture} />
					{loading ? (
						<div className="loading dot-windmill" />
					) : (
						<div className="action" onClick={callAddAccount}>
							追加
						</div>
					)}
				</div>
			</article>
		</section>
	);
}
