import { useSelector } from "react-redux";
import Reply from "./Reply";

export default function Component() {
	const replies = useSelector(state => state.replies.value);

	return (
		<section>
			{replies.map(reply => (
				<Reply key={reply.id} reply={reply} />
			))}
		</section>
	);
}
