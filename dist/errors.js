"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigParsingError = void 0;
/**
 * Error class for when a config file is not found.
 *
 * @param message The error message.
 * */
class ConfigParsingError extends Error {
    constructor(message) {
        super(message);
        this.name = "ConfigParsingError";
    }
}
exports.ConfigParsingError = ConfigParsingError;
