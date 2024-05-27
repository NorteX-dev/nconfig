import { ZodSchema } from "zod";
import { existsSync, readFileSync } from "fs";
import { ConfigParsingError } from "./errors";
import { ParseOptions } from "./types";
import * as path from "node:path";

/**
 * Parses a file based on the extension.
 * Supports .json, .yml, .yaml, .toml.
 * If no file path is provided, it will default to the current working directory with the filename "config.yml".
 *
 * @param schema The schema to validate the file against.
 * @param options The options to parse the file with.
 */
export function createConfig<T>(schema: ZodSchema<T>, { filePath }: ParseOptions = {}): T {
	if (!filePath) {
		filePath = tryGetDefaultConfigPath();
		if (!filePath) {
			throw new ConfigParsingError("No file path provided and could not auto-determine file path.");
		}
	}

	const fileExists = existsSync(filePath);
	if (!fileExists) {
		throw new ConfigParsingError("The file provided does not exist.");
	}

	const rawString = readFileSync(filePath, "utf-8");
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
			throw new ConfigParsingError("Unsupported file extension provided into `parse()`.");
	}
}

/**
 * Parses a YAML file.
 *
 * @param schema The schema to validate the file against.
 * @param rawString The raw JSON string to parse.
 */

export function createConfigYaml<T>(schema: ZodSchema<T>, rawString: string): T {
	const yaml = require("js-yaml");
	const object = yaml.load(rawString);
	return schema.parse(object);
}

/**
 * Parses a TOML file.
 *
 * @param schema The schema to validate the file against.
 * @param rawString The raw JSON string to parse.
 */
export function createConfigToml<T>(schema: ZodSchema<T>, rawString: string): T {
	const toml = require("toml");
	const object = toml.parse(rawString);
	return schema.parse(object);
}

/**
 * Parses a JSON file.
 *
 * @param schema The schema to validate the file against.
 * @param rawString The raw JSON string to parse.
 */
export function createConfigJson<T>(schema: ZodSchema<T>, rawString: string): T {
	const object = JSON.parse(rawString);
	return schema.parse(object);
}

/**
 * Tries to find a default config file in the current working directory.
 *
 * @internal
 */
function tryGetDefaultConfigPath(): string | undefined {
	let filePath: string | undefined;
	if (existsSync(path.join(process.cwd() + "/config.json"))) {
		filePath = path.join(process.cwd(), "/config.json");
	} else if (existsSync(path.join(process.cwd() + "/config.toml"))) {
		filePath = path.join(process.cwd(), "/config.toml");
	} else if (existsSync(path.join(process.cwd() + "/config.yaml"))) {
		filePath = path.join(process.cwd(), "/config.yaml");
	} else if (existsSync(path.join(process.cwd() + "/config.yml"))) {
		filePath = path.join(process.cwd(), "/config.yml");
	}
	return filePath;
}
