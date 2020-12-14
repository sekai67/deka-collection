import { useSelector } from "react-redux";
import { Fragment } from "react";
import Reply from "./Reply";

export default function Component() {
	const replies = useSelector(state => state.replies.value);

	return (
		<Fragment>
			{replies.map(reply => (
				<Reply key={reply.id} reply={reply} />
			))}
		</Fragment>
	);
}
