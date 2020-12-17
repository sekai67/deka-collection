import { Fragment } from "react";
import { useSelector } from "react-redux";
import Reply from "../components/Reply";

const Component = () => {
	const replies = useSelector(state => state.replies.value);

	return (
		<Fragment>
			{replies.map(reply => (
				<Reply key={reply.id} reply={reply} />
			))}
		</Fragment>
	);
};
export default Component;
