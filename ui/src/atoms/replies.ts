import { atom, atomFamily, selector } from "recoil";
import replies from "../replies";

export type Reply = {
	value: string;
	selected: boolean;
};

export const repliesState = atom({
	key: "repliesState",
	default: replies,
});
export const replySelectedState = atomFamily({
	key: "replySelectedState",
	default: false,
});

export const selectedRepliesState = selector({
	key: "selectedRepliesState",
	get: ({ get }) => {
		const replies = get(repliesState);
		const selected = replies.filter(reply => get(replySelectedState(reply)));
		return selected.length ? selected : replies;
	},
});
