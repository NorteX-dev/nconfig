const { NConfig } = require("../dist/classes/config");
const z = require("zod");

test("parse yaml at default location", () => {
	const schema = z.object({ default: z.string() });
	const config = new NConfig().parse(schema);
	expect(config).toEqual({ default: "location config" });
});
