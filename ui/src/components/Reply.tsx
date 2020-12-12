import style from "../styles/Reply.module.scss";

import { useState, createRef } from "react";
import { useAppDispatch } from "../stores";
import { Reply, updateSelected } from "../stores/replies";

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

	const dispatch = useAppDispatch();
	const toggleSelectStatus = () => {
		dispatch(updateSelected({ id: reply.id, selected: !reply.selected }));
	};

	return (
		<article className={style.Component}>
			{reply.selected && <div className="status">選択中！</div>}
			<pre ref={ref}>{reply.value}</pre>
			<menu>
				{copied ? (
					<div>コピーしました👌</div>
				) : (
					<div className="action" onClick={pbcopy}>
						コピー
					</div>
				)}
				{reply.selected ? (
					<div className="action" onClick={toggleSelectStatus}>
						解除
					</div>
				) : (
					<div className="action" onClick={toggleSelectStatus}>
						使う
					</div>
				)}
			</menu>
		</article>
	);
}
