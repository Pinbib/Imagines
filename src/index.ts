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
				console.log(qp.gb("IMA (Imagines) - CLI utility for writing and reading steganography from images (as well as running code that has been written in the same way)"));
				console.log(qp.yi("\tima help") + qp.gb(" - Show this help message"));
				console.log(qp.yi("\tima version") + qp.gb(" - Show the version of the program, alias ") + qp.yi("-v"));
				console.log(qp.yi("\tima size <path>") + qp.gb(" - Show the size of the image and the maximum bytes for LSB (1 bit/channel)"));
				console.log(qp.yi("\tima read <path>") + qp.gb(" - Read the text from the image"));
				console.log(qp.yi("\tima write <input> <output> <text>") + qp.gb(" - Write the text or text file to the image"));
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