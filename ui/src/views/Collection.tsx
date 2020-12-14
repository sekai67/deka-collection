import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../stores";
import { fetchAccounts } from "../stores/accounts";
import { useEffect } from "react";
import Profile from "../components/Profile";
import Spinner from "../components/Spinner";

const Container = styled.div({
	display: "flex",
	flexWrap: "wrap",
});

export default function Component() {
	const accounts = useSelector(state => state.accounts.value);

	const dispatch = useAppDispatch();
	useEffect(() => {
		if (!accounts.length) {
			dispatch(fetchAccounts());
		}
	}, []);

	return (
		<Container>
			{!accounts.length && <Spinner />}
			{accounts.map(account => (
				<Profile key={account.screen_name} account={account} />
			))}
		</Container>
	);
}
