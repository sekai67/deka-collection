import React from "react";
import { useRecoilValue } from "recoil";
import { repliesState } from "../atoms/replies";
import Reply from "../components/Reply";

const Component = () => {
	const replies = useRecoilValue(repliesState);

	return (
		<React.Fragment>
			{replies.map((reply, index) => (
				<Reply key={index} reply={reply} />
			))}
		</React.Fragment>
	);
};
export default Component;
