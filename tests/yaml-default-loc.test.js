const z = require("zod");
const { createConfig } = require("../dist/index");

test("parse yaml at default location", () => {
	const schema = z.object({ default: z.string() });
	const config = createConfig(schema);
	console.log(config);
	expect(config).toEqual({ default: "location config" });
});
