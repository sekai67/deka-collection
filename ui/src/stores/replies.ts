import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import replies from "../replies";

export type Reply = {
	id: number;
	value: string;
	selected: boolean;
};

const slice = createSlice({
	name: "replies",
	initialState: {
		value: replies.map((value, id) => ({ id, value, selected: false })),
	},
	reducers: {
		updateSelected: (state, { payload: { id, selected } }: PayloadAction<Pick<Reply, "id" | "selected">>) => {
			const target = state.value.find(reply => reply.id == id);
			if (!target) {
				throw new Error("no such reply");
			}
			target.selected = selected;
		},
	},
});

export default slice;
export const { updateSelected } = slice.actions;
