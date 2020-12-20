import { atomFamily, selector } from "recoil";

export const repliesState = selector({
	key: "repliesState",
	get: () =>
		Promise.all(
			Array.from(new Array(70).keys()).map(async num => {
				const numKey = `000${num + 1}`.substr(-3);
				const resp = await fetch(`/replies/reply${numKey}.txt`);
				return resp.text();
			}),
		),
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
