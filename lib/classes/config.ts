import { readFileSync } from "fs";
import type { ZodSchema } from "zod";
import toml from "toml";
import yaml from "js-yaml";

export class NConfig {
	/**
	 * Parses a file based on the extension.
	 * Supports .json, .yml, .yaml, .toml.
	 *
	 * @param file The file to parse.
	 * @param schema The schema to validate the file against.
	 */
	parse<T>(file: string, schema: ZodSchema<T>): T {
		const rawString = readFileSync(file, "utf-8");
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

	parseYAML<T>(file: string, schema: ZodSchema<T>): T {
		const rawString = readFileSync(file, "utf-8");
		const object = yaml.load(rawString);
		return schema.parse(object);
	}

	/**
	 * Parses a TOML file.
	 *
	 * @param file The file to parse.
	 * @param schema The schema to validate the file against.
	 */
	parseTOML<T>(file: string, schema: ZodSchema<T>): T {
		const rawString = readFileSync(file, "utf-8");
		const object = toml.parse(rawString);
		return schema.parse(object);
	}

	/**
	 * Parses a JSON file.
	 *
	 * @param file The file to parse.
	 * @param schema The schema to validate the file against.
	 */
	parseJSON<T>(file: string, schema: ZodSchema<T>): T {
		const rawString = readFileSync(file, "utf-8");
		const object = JSON.parse(rawString);
		return schema.parse(object);
	}
}
