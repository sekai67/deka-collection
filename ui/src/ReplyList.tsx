import style from "./styles/ReplyList.module.scss";
import replies from "./replies";

import Reply from "./Reply";

export default function Component() {
	return (
		<section className={style.Component}>
			{replies.map((reply, i) => (
				<Reply key={i} id={i} reply={reply} />
			))}
		</section>
	);
}
