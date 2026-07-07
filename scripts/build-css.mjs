import { readFileSync, writeFileSync } from "node:fs";
import CleanCSS from "clean-css";

const files = [
	"css/tachyons.css",
	"css/custom.css",
];

const css = files
	.map((file) => readFileSync(file, "utf8"))
	.join("\n");

const result = new CleanCSS({ level: 2 }).minify(css);

for (const warning of result.warnings) {
	console.warn(warning);
}

if (result.errors.length > 0) {
	for (const error of result.errors) {
		console.error(error);
	}
	process.exit(1);
}

writeFileSync("style.css", result.styles);
