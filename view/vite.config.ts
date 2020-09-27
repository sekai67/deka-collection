import path from "path";
import { promises as fs } from "fs";

import { UserConfig, Transform } from "vite";
import { TransformContext } from "vite/dist/node/transform";

class TransformRe implements Transform {
	test(ctx: TransformContext): boolean {
		return /\/assets\/reply\.js$/.test(ctx.path);
	}
	async transform(ctx: TransformContext): Promise<string> {
		const re = Function(`return ${ctx.code}`)();
		const replies = await Promise.all(
			(await fs.readdir(path.dirname(ctx.path), { withFileTypes: true }))
				.filter(ent => !ent.isDirectory() && re.test(ent.name))
				.map(({ name }) => fs.readFile(path.resolve(ctx.path, "..", name), "utf-8"))
		);
		return `export default ${JSON.stringify(replies)};`;
	}
}

export default {
	transforms: [new TransformRe()],
} as UserConfig;
