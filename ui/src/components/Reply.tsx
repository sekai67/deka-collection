import styled from "@emotion/styled";
import * as mixins from "../styles/mixins";
import { useAppDispatch } from "../stores";
import { Reply, updateSelected } from "../stores/replies";
import { useState, createRef } from "react";

const Container = styled.div(mixins.card, {
	maxWidth: "300px",
	display: "inline-block",
});
const Status = styled.div(mixins.keyBackground, {
	textAlign: "center",
});
const ReplyBody = styled.pre({
	margin: "1.5em 2em",
	wordBreak: "break-word",
	whiteSpace: "pre-wrap",
});
const Commands = styled.div({
	display: "flex",
	padding: "0",
	margin: "0",

	userSelect: "none",
});
const Command = styled.div(
	mixins.transition(["border-color"]),
	{
		textAlign: "center",
		flex: "1 0 auto",
		padding: "0.3em",

		borderTop: mixins.border,
		"&:last-child": {
			borderLeft: mixins.border,
		},

		color: mixins.theme.primaryColor,
	},
	props => (props.onClick ? mixins.button : {}),
);

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
		<Container>
			{reply.selected && <Status className="selected">選択中</Status>}
			<ReplyBody ref={ref}>{reply.value}</ReplyBody>
			<Commands>
				<Command onClick={copied ? undefined : pbcopy}>コピー{copied ? "完了👌" : ""}</Command>
				<Command onClick={toggleSelectStatus}>{reply.selected ? "解除" : "選択"}</Command>
			</Commands>
		</Container>
	);
}
