import { ZodSchema } from "zod";
import { ParseOptions } from "./types";
/**
 * Parses a file based on the extension.
 * Supports .json, .yml, .yaml, .toml.
 * If no file path is provided, it will default to the current working directory with the filename "config.yml".
 *
 * @param schema The schema to validate the file against.
 * @param options The options to parse the file with.
 */
export declare function config<T>(schema: ZodSchema<T>, { filePath }?: ParseOptions): T;
/**
 * Parses a YAML file.
 *
 * @param schema The schema to validate the file against.
 * @param rawString The raw JSON string to parse.
 */
export declare function configYaml<T>(schema: ZodSchema<T>, rawString: string): T;
/**
 * Parses a TOML file.
 *
 * @param schema The schema to validate the file against.
 * @param rawString The raw JSON string to parse.
 */
export declare function configToml<T>(schema: ZodSchema<T>, rawString: string): T;
/**
 * Parses a JSON file.
 *
 * @param schema The schema to validate the file against.
 * @param rawString The raw JSON string to parse.
 */
export declare function configJson<T>(schema: ZodSchema<T>, rawString: string): T;
