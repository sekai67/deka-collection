const repliesCount = 70;

export default Array.from(new Array(repliesCount).keys()).map(num => {
	const numKey = `000${num + 1}`.substr(-3);
	const reply: string = require(`!!raw-loader!./reply${numKey}.txt`).default;
	return reply;
});
