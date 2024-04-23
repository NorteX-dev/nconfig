const { NConfig } = require("../dist/index");
const z = require("zod");
const path = require("path");

test("parse basic json config file", () => {
	const schema = z.object({ hello: z.string() });
	const config = new NConfig().parse(schema, path.join(__dirname, "basic-config.json"));
	expect(config).toEqual({ hello: "123" });
});
