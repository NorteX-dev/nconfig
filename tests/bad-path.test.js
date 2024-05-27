const { createConfig } = require("../dist/index");
const z = require("zod");

test("invalid path", () => {
	const schema = z.object({ hello: z.string() });
	const func = () => createConfig(schema, { filePath: "bad-path.yml" });
	expect(func).toThrow();
});
