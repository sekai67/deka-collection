export class KeyValueStore<T, K> {
	private namespace;
	private prefix;
	private cacheKey;
	private keyFn;
	private compareFn;

	constructor(
		namespace: KVNamespace,
		prefix: string,
		cacheKey: string,
		keyFn: (t: T | null) => K,
		compareFn: (a: T | null, b: T | null) => number,
	) {
		this.namespace = namespace;
		this.prefix = prefix;
		this.cacheKey = cacheKey;
		this.keyFn = keyFn;
		this.compareFn = compareFn;
	}

	private read(key: string) {
		return this.namespace.get<T>(key, "json");
	}
	private async readAll() {
		const { keys } = await this.namespace.list({ prefix: this.prefix });
		const data = await Promise.all(keys.map(({ name }) => this.read(name)));
		return data.sort(this.compareFn);
	}
	private write(entry: T) {
		return this.namespace.put(`${this.prefix}${this.keyFn(entry)}`, JSON.stringify(entry));
	}

	private retrieveCache() {
		return this.namespace.get<(T | null)[]>(this.cacheKey, "json");
	}
	private createCache(data: (T | null)[]) {
		return this.namespace.put(this.cacheKey, JSON.stringify(data.sort(this.compareFn)));
	}
	private async updateCache(entry: T) {
		const cache = await this.getAll();
		const map = new Map([...cache, entry].map(d => [this.keyFn(d), d]));
		return this.createCache(Array.from(map.values()));
	}

	async getAll() {
		const cache = await this.retrieveCache();
		if (cache) {
			return cache;
		}
		const data = await this.readAll();
		await this.createCache(data);
		return data;
	}
	put(entry: T) {
		return Promise.all([this.write(entry), this.updateCache(entry)]);
	}
}
