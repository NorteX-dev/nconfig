import { existsSync, readFileSync } from "fs";
import type { ZodSchema } from "zod";
import toml from "toml";
import yaml from "js-yaml";
import path from "path";

type ParseOptions = {
	filePath?: string;
};

class ConfigParsingError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ConfigParsingError";
	}
}

/**
 * The main class for NConfig.
 *
 * @example
 * ```ts
 * import { NConfig } from "nconfig";
 *
 * const config = new NConfig();
 *
 * const schema = z.object({
 *    property: z.string(),
 * });
 *
 * const parsedConfig = config.parse(schema, { filePath: "config.yml" });
 * ```
 */
export class NConfig {
	/**
	 * Parses a file based on the extension.
	 * Supports .json, .yml, .yaml, .toml.
	 * If no file path is provided, it will default to the current working directory with the filename "config.yml".
	 *
	 * @param schema The schema to validate the file against.
	 * @param options The options to parse the file with.
	 */
	parse<T>(schema: ZodSchema<T>, { filePath }: ParseOptions = {}): T {
		if (!filePath) {
			filePath = NConfig.tryGetDefaultConfigPath();
			if (!filePath) {
				throw new ConfigParsingError("No file path provided and no default config file found.");
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
	private static tryGetDefaultConfigPath(): string | undefined {
		let filePath: string | undefined;
		if (existsSync(path.join(process.cwd() + "/config.json"))) {
			filePath = process.cwd() + "/config.json";
		} else if (existsSync(path.join(process.cwd() + "/config.toml"))) {
			filePath = process.cwd() + "/config.toml";
		} else if (existsSync(path.join(process.cwd() + "/config.yaml"))) {
			filePath = process.cwd() + "/config.yml";
		} else if (existsSync(path.join(process.cwd() + "/config.yml"))) {
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

	parseYAML<T>(schema: ZodSchema<T>, rawString: string): T {
		const object = yaml.load(rawString);
		return schema.parse(object);
	}

	/**
	 * Parses a TOML file.
	 *
	 * @param schema The schema to validate the file against.
	 * @param rawString The raw JSON string to parse.
	 */
	parseTOML<T>(schema: ZodSchema<T>, rawString: string): T {
		const object = toml.parse(rawString);
		return schema.parse(object);
	}

	/**
	 * Parses a JSON file.
	 *
	 * @param schema The schema to validate the file against.
	 * @param rawString The raw JSON string to parse.
	 */
	parseJSON<T>(schema: ZodSchema<T>, rawString: string): T {
		const object = JSON.parse(rawString);
		return schema.parse(object);
	}
}
