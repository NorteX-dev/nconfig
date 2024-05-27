# Migration from v2 to v3

- NConfig is no longer a class.
- Added new `createConfig()` exported method, which is the new way of calling `new NConfig().parse()`.
- You can use `configYaml()`, `configToml()` and `configJson()` respectively to parse YAML, TOML and JSON files, just as before.
- `js-yaml` and `toml` are now dynamically imported which means, for example, installing `toml` when only using `yaml` is no longer necessary.
- Fixed detection of default `config.yaml` file.
