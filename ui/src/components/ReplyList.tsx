import replies from "../replies";

import Reply from "./Reply";

export default function Component() {
	return (
		<section>
			{replies.map((reply, i) => (
				<Reply key={i} id={i} reply={reply} />
			))}
		</section>
	);
}
