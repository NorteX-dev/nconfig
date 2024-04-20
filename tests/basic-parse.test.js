const NConfig = require("../dist/classes/config").NConfig;
const z = require("zod");
const path = require("path");

test("parse json file", () => {
	const schema = z.object({
		hello: z.string(),
	});
	const config = new NConfig().parse(path.join(__dirname, "basic-config.yml"), schema);
	expect(config).toEqual({ hello: "123" });
});
