interface Printable {
	toString(): string;
}
function isPrintable(arg: any): arg is Printable {
	return typeof arg.toString == "function";
}

export class HttpError {
	private code: number;
	private message: string;

	constructor(code: number, message: string) {
		this.code = code;
		this.message = message;
	}

	toResponse(): Response {
		return new Response(
			JSON.stringify({
				error: this.message,
			}),
			{
				status: this.code,
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	}

	static from(e: any): HttpError {
		if (e instanceof HttpError) {
			return e;
		}
		if (e instanceof Error) {
			return new HttpError(500, e.message);
		}
		if (isPrintable(e)) {
			return new HttpError(500, e.toString());
		}
		return new HttpError(500, JSON.stringify(e));
	}
}
