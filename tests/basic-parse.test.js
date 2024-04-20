const Config = require("../dist/index");
const z = require("zod");

test("parse json file", () => {
	const schema = z.object({
		hello: z.string(),
	});
	console.log(Config);
	const config = new Config().parse("config.json", schema);
	expect(config).toEqual({ hello: "world" });
});
