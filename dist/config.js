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
exports.configJson = exports.configToml = exports.configYaml = exports.config = void 0;
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
function config(schema, { filePath } = {}) {
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
            return configJson(schema, rawString);
        case "yml":
        case "yaml":
            return configYaml(schema, rawString);
        case "toml":
            return configToml(schema, rawString);
        default:
            throw new errors_1.ConfigParsingError("Unsupported file extension provided into `parse()`.");
    }
}
exports.config = config;
/**
 * Parses a YAML file.
 *
 * @param schema The schema to validate the file against.
 * @param rawString The raw JSON string to parse.
 */
function configYaml(schema, rawString) {
    const yaml = require("js-yaml");
    const object = yaml.load(rawString);
    return schema.parse(object);
}
exports.configYaml = configYaml;
/**
 * Parses a TOML file.
 *
 * @param schema The schema to validate the file against.
 * @param rawString The raw JSON string to parse.
 */
function configToml(schema, rawString) {
    const toml = require("toml");
    const object = toml.parse(rawString);
    return schema.parse(object);
}
exports.configToml = configToml;
/**
 * Parses a JSON file.
 *
 * @param schema The schema to validate the file against.
 * @param rawString The raw JSON string to parse.
 */
function configJson(schema, rawString) {
    const object = JSON.parse(rawString);
    return schema.parse(object);
}
exports.configJson = configJson;
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
