import qp from "qp-color";
import {version} from "../package.json";

import Size from "./cli/size";
import Read from "./cli/read";
import Write from "./cli/write";

try {
	const args = process.argv.slice(2);

	if (args.length === 0) {
		throw new Error(qp.yb("You did not specify any command."));
	} else {
		switch (args[0]) {
			case "help":
				break;
			case "version":
				console.log(qp.yi("v" + version));
				break;
			case "-v":
				console.log(qp.yi("v" + version));
				break;
			case "size":
				Size(args);
				break;
			case "read":
				Read(args);
				break;
			case "write":
				Write(args);
				break;
			default:
				throw new Error(qp.rb("Unknown command, make sure it exists use:\n\t") + qp.yi("ima help"));
		}
	}
} catch (err) {
	console.error((err as Error).message);
}