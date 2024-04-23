const { NConfig } = require("../dist/index");
const z = require("zod");
const path = require("path");

test("parse basic toml config file", () => {
	const schema = z.object({ hello: z.string() });
	const config = new NConfig().parse(schema, { filePath: path.join(__dirname, "basic-config.toml") });
	expect(config).toEqual({ hello: "123" });
});
