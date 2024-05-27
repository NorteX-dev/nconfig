/**
 * Error class for when a config file is not found.
 *
 * @param message The error message.
 * */
export class ConfigParsingError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ConfigParsingError";
	}
}
