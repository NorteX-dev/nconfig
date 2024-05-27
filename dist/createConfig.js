"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfigJson = exports.createConfigToml = exports.createConfigYaml = exports.createConfig = void 0;
const fs_1 = require("fs");
const errors_1 = require("./errors");
const path = __importStar(require("node:path"));
/**
 * Parses a file based on the extension.
 * Supports .json, .yml, .yaml, .toml.
 * If no file path is provided, it will default to the current working directory with the filename "config.yml".
 *
 * @param schema The schema to validate the file against.
 * @param options The options to parse the file with.
 */
function createConfig(schema, { filePath } = {}) {
    if (!filePath) {
        filePath = tryGetDefaultConfigPath();
        if (!filePath) {
            throw new errors_1.ConfigParsingError("No file path provided and could not auto-determine file path.");
        }
    }
    const fileExists = (0, fs_1.existsSync)(filePath);
    if (!fileExists) {
        throw new errors_1.ConfigParsingError("The file provided does not exist.");
    }
    const rawString = (0, fs_1.readFileSync)(filePath, "utf-8");
    const extension = filePath.split(".").pop();
    switch (extension) {
        case "json":
            return createConfigJson(schema, rawString);
        case "yml":
        case "yaml":
            return createConfigYaml(schema, rawString);
        case "toml":
            return createConfigToml(schema, rawString);
        default:
            throw new errors_1.ConfigParsingError("Unsupported file extension provided into `parse()`.");
    }
}
exports.createConfig = createConfig;
/**
 * Parses a YAML file.
 *
 * @param schema The schema to validate the file against.
 * @param rawString The raw JSON string to parse.
 */
function createConfigYaml(schema, rawString) {
    const yaml = require("js-yaml");
    const object = yaml.load(rawString);
    return schema.parse(object);
}
exports.createConfigYaml = createConfigYaml;
/**
 * Parses a TOML file.
 *
 * @param schema The schema to validate the file against.
 * @param rawString The raw JSON string to parse.
 */
function createConfigToml(schema, rawString) {
    const toml = require("toml");
    const object = toml.parse(rawString);
    return schema.parse(object);
}
exports.createConfigToml = createConfigToml;
/**
 * Parses a JSON file.
 *
 * @param schema The schema to validate the file against.
 * @param rawString The raw JSON string to parse.
 */
function createConfigJson(schema, rawString) {
    const object = JSON.parse(rawString);
    return schema.parse(object);
}
exports.createConfigJson = createConfigJson;
/**
 * Tries to find a default config file in the current working directory.
 *
 * @internal
 */
function tryGetDefaultConfigPath() {
    let filePath;
    if ((0, fs_1.existsSync)(path.join(process.cwd() + "/config.json"))) {
        filePath = path.join(process.cwd(), "/config.json");
    }
    else if ((0, fs_1.existsSync)(path.join(process.cwd() + "/config.toml"))) {
        filePath = path.join(process.cwd(), "/config.toml");
    }
    else if ((0, fs_1.existsSync)(path.join(process.cwd() + "/config.yaml"))) {
        filePath = path.join(process.cwd(), "/config.yaml");
    }
    else if ((0, fs_1.existsSync)(path.join(process.cwd() + "/config.yml"))) {
        filePath = path.join(process.cwd(), "/config.yml");
    }
    return filePath;
}
