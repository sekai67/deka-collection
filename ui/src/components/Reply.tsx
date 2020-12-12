import style from "../styles/Reply.module.scss";

import { useState, createRef } from "react";
import { Reply } from "../stores/replies";

type Props = {
	reply: Reply;
};

export default function Component({ reply }: Props) {
	const ref = createRef<HTMLPreElement>();
	const [copied, setCopied] = useState(false);
	const pbcopy = () => {
		const selection = document.getSelection();
		if (!selection || !ref.current) {
			return alert("copy failed");
		}

		selection.removeAllRanges();
		selection.selectAllChildren(ref.current);
		document.execCommand("copy");
		selection.removeAllRanges();

		setCopied(true);
		setTimeout(setCopied, 2000, false);
	};

	return (
		<article className={style.Component}>
			<pre ref={ref}>{reply.value}</pre>
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
