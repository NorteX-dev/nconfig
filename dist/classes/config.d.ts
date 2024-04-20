import type { ZodSchema } from "zod";
export declare class NConfig {
    /**
     * Parses a file based on the extension.
     * Supports .json, .yml, .yaml, .toml.
     *
     * @param file The file to parse.
     * @param schema The schema to validate the file against.
     */
    parse<T>(file: string, schema: ZodSchema<T>): T;
    /**
     * Parses a YAML file.
     *
     * @param file The file to parse.
     * @param schema The schema to validate the file against.
     */
    parseYAML<T>(file: string, schema: ZodSchema<T>): T;
    /**
     * Parses a TOML file.
     *
     * @param file The file to parse.
     * @param schema The schema to validate the file against.
     */
    parseTOML<T>(file: string, schema: ZodSchema<T>): T;
    /**
     * Parses a JSON file.
     *
     * @param file The file to parse.
     * @param schema The schema to validate the file against.
     */
    parseJSON<T>(file: string, schema: ZodSchema<T>): T;
}
