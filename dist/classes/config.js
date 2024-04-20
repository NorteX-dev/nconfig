"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const toml_1 = __importDefault(require("toml"));
const js_yaml_1 = __importDefault(require("js-yaml"));
class Config {
    /**
     * Parses a file based on the extension.
     * Supports .json, .yml, .yaml, .toml.
     *
     * @param file The file to parse.
     * @param schema The schema to validate the file against.
     */
    parse(file, schema) {
        const rawString = (0, fs_1.readFileSync)(file, "utf-8");
        const extension = file.split(".").pop();
        switch (extension) {
            case "json":
                return this.parseJSON(file, schema);
            case "yml":
            case "yaml":
                return this.parseYAML(file, schema);
            case "toml":
                return this.parseTOML(file, schema);
            default:
                throw new Error("Unsupported file extension provided into parse().");
        }
    }
    /**
     * Parses a YAML file.
     *
     * @param file The file to parse.
     * @param schema The schema to validate the file against.
     */
    parseYAML(file, schema) {
        const rawString = (0, fs_1.readFileSync)(file, "utf-8");
        const object = js_yaml_1.default.load(rawString);
        return schema.parse(object);
    }
    /**
     * Parses a TOML file.
     *
     * @param file The file to parse.
     * @param schema The schema to validate the file against.
     */
    parseTOML(file, schema) {
        const rawString = (0, fs_1.readFileSync)(file, "utf-8");
        const object = toml_1.default.parse(rawString);
        return schema.parse(object);
    }
    /**
     * Parses a JSON file.
     *
     * @param file The file to parse.
     * @param schema The schema to validate the file against.
     */
    parseJSON(file, schema) {
        const rawString = (0, fs_1.readFileSync)(file, "utf-8");
        const object = JSON.parse(rawString);
        return schema.parse(object);
    }
}
exports.default = Config;
