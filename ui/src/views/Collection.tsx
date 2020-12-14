import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import Profile from "../components/Profile";
import Spinner from "../components/Spinner";

const Container = styled.div({
	display: "flex",
	flexWrap: "wrap",
});

const Component = () => {
	const accounts = useSelector(state => state.accounts.value);

	return (
		<Container>
			{!accounts.length && <Spinner />}
			{accounts.map(account => (
				<Profile key={account.screen_name} account={account} />
			))}
		</Container>
	);
};
export default Component;
