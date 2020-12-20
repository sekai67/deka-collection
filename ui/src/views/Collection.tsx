import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { accountsState } from "../atoms/accounts";
import Profile from "../components/Profile";

const Container = styled.div({
	display: "flex",
	flexWrap: "wrap",
});

const Component = () => {
	const accounts = useRecoilValue(accountsState);

	return (
		<Container>
			{accounts.map(account => (
				<Profile key={account.screen_name} account={account} />
			))}
		</Container>
	);
};
export default Component;
