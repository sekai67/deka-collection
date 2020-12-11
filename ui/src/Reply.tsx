import style from "./styles/Reply.module.scss";

import { useState } from "react";

type Props = {
	id: number;
	reply: string;
};

export default function Component(props: Props) {
	const replyId = `reply-${props.id}`;

	const [copied, setCopied] = useState(false);
	const pbcopy = () => {
		const target = document.getElementById(replyId);
		const selection = document.getSelection();
		if (!target || !selection) {
			return alert("copy failed...");
		}

		selection.removeAllRanges();
		selection.selectAllChildren(target);
		document.execCommand("copy");
		selection.removeAllRanges();

		setCopied(true);
		setTimeout(setCopied, 2000, false);
	};

	return (
		<article className={style.Component}>
			<pre id={replyId}>{props.reply}</pre>
			<menu>
				{copied ? (
					<div>Copied👌</div>
				) : (
					<div className="action" onClick={pbcopy}>
						pbcopy
					</div>
				)}
				<div className="action">disable</div>
			</menu>
		</article>
	);
}
