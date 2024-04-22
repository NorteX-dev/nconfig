const { NConfig } = require("../dist/classes/config");
const z = require("zod");
const path = require("path");

test("parse basic toml config file", () => {
	const schema = z.object({
		hello: z.string(),
	});
	const config = new NConfig().parse(path.join(__dirname, "basic-config.toml"), schema);
	expect(config).toEqual({ hello: "123" });
});
