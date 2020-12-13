import "../styles/Reply.scoped.scss";

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
		<article>
			{reply.selected && <div className="selected">選択中</div>}
			<pre ref={ref}>{reply.value}</pre>
			<div className="commands">
				{copied ? (
					<div className="cmd">コピーしました👌</div>
				) : (
					<div className="cmd act" onClick={pbcopy}>
						コピー
					</div>
				)}
				{reply.selected ? (
					<div className="cmd act" onClick={toggleSelectStatus}>
						解除
					</div>
				) : (
					<div className="cmd act" onClick={toggleSelectStatus}>
						使う
					</div>
				)}
			</div>
		</article>
	);
}
