import type { ZodSchema } from "zod";
type ParseOptions = {
    filePath?: string;
};
export declare class NConfig {
    /**
     * Parses a file based on the extension.
     * Supports .json, .yml, .yaml, .toml.
     * If no file path is provided, it will default to the current working directory with the filename "config.yml".
     *
     * @param schema The schema to validate the file against.
     * @param options The options to parse the file with.
     */
    parse<T>(schema: ZodSchema<T>, { filePath }?: ParseOptions): T;
    /**
     * Tries to find a default config file in the current working directory.
     *
     * @internal
     */
    private static tryGetDefaultConfigPath;
    /**
     * Parses a YAML file.
     *
     * @param schema The schema to validate the file against.
     * @param rawString The raw JSON string to parse.
     */
    parseYAML<T>(schema: ZodSchema<T>, rawString: string): T;
    /**
     * Parses a TOML file.
     *
     * @param file The file to parse.
     * @param rawString The raw JSON string to parse.
     */
    parseTOML<T>(schema: ZodSchema<T>, rawString: string): T;
    /**
     * Parses a JSON file.
     *
     * @param schema The schema to validate the file against.
     * @param rawString The raw JSON string to parse.
     */
    parseJSON<T>(schema: ZodSchema<T>, rawString: string): T;
}
export {};
