const { NConfig } = require("../dist/classes/config");
const z = require("zod");

test("invalid path", () => {
	const schema = z.object({ hello: z.string() });
	const func = () => new NConfig().parse(schema, "bad-path.yml");
	expect(func).toThrow();
});
