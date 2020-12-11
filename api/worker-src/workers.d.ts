interface Profile {
	screen_name: stirng;
	full_name: stirng;
	bio: stirng;
}
interface BindGen {
	(wasm: any): Promise<void>;
	get_profile(screen_name: string): Promise<Profile>;
}

declare const wasm: any;
declare const wasm_bindgen: BindGen;

declare const ACCOUNTS: KVNamespace;
