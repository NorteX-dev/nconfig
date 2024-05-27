const { createConfig } = require("../dist/index");
const z = require("zod");
const path = require("path");

test("parse basic toml config file", () => {
	const schema = z.object({ hello: z.string() });
	const config = createConfig(schema, { filePath: path.join(__dirname, "configs", "basic-config.toml") });
	console.log(config);
	expect(config).toEqual({ hello: "123" });
});
