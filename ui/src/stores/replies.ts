import replies from "../replies";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Reply = {
	id: number;
	value: string;
	selected: boolean;
};

export default createSlice({
	name: "replies",
	initialState: {
		value: replies.map((value, id) => ({ id, value, selected: false })),
	},
	reducers: {
		updateReplySelected: (state, { payload: { id, selected } }: PayloadAction<Omit<Reply, "value">>) => {
			const target = state.value.find(reply => reply.id == id);
			if (!target) {
				throw new Error("no such reply");
			}
			target.selected = selected;
		},
	},
});
