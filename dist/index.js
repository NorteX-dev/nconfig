"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NConfig = void 0;
const fs_1 = require("fs");
const toml_1 = __importDefault(require("toml"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const path_1 = __importDefault(require("path"));
class ConfigParsingError extends Error {
    constructor(message) {
        super(message);
        this.name = "ConfigParsingError";
    }
}
class NConfig {
    /**
     * Parses a file based on the extension.
     * Supports .json, .yml, .yaml, .toml.
     * If no file path is provided, it will default to the current working directory with the filename "config.yml".
     *
     * @param schema The schema to validate the file against.
     * @param options The options to parse the file with.
     */
    parse(schema, { filePath } = {}) {
        if (!filePath) {
            filePath = NConfig.tryGetDefaultConfigPath();
            if (!filePath) {
                throw new ConfigParsingError("No file path provided and no default config file found.");
            }
        }
        const fileExists = (0, fs_1.existsSync)(filePath);
        if (!fileExists) {
            throw new ConfigParsingError("The file provided does not exist.");
        }
        const rawString = (0, fs_1.readFileSync)(filePath, "utf-8");
        const extension = filePath.split(".").pop();
        switch (extension) {
            case "json":
                return this.parseJSON(schema, rawString);
            case "yml":
            case "yaml":
                return this.parseYAML(schema, rawString);
            case "toml":
                return this.parseTOML(schema, rawString);
            default:
                throw new ConfigParsingError("Unsupported file extension provided into parse().");
        }
    }
    /**
     * Tries to find a default config file in the current working directory.
     *
     * @internal
     */
    static tryGetDefaultConfigPath() {
        let filePath;
        if ((0, fs_1.existsSync)(path_1.default.join(process.cwd() + "/config.json"))) {
            filePath = process.cwd() + "/config.json";
        }
        else if ((0, fs_1.existsSync)(path_1.default.join(process.cwd() + "/config.toml"))) {
            filePath = process.cwd() + "/config.toml";
        }
        else if ((0, fs_1.existsSync)(path_1.default.join(process.cwd() + "/config.yaml"))) {
            filePath = process.cwd() + "/config.yml";
        }
        else if ((0, fs_1.existsSync)(path_1.default.join(process.cwd() + "/config.yml"))) {
            filePath = process.cwd() + "/config.yml";
        }
        return filePath;
    }
    /**
     * Parses a YAML file.
     *
     * @param schema The schema to validate the file against.
     * @param rawString The raw JSON string to parse.
     */
    parseYAML(schema, rawString) {
        const object = js_yaml_1.default.load(rawString);
        return schema.parse(object);
    }
    /**
     * Parses a TOML file.
     *
     * @param file The file to parse.
     * @param rawString The raw JSON string to parse.
     */
    parseTOML(schema, rawString) {
        const object = toml_1.default.parse(rawString);
        return schema.parse(object);
    }
    /**
     * Parses a JSON file.
     *
     * @param schema The schema to validate the file against.
     * @param rawString The raw JSON string to parse.
     */
    parseJSON(schema, rawString) {
        const object = JSON.parse(rawString);
        return schema.parse(object);
    }
}
exports.NConfig = NConfig;
