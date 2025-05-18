import {resolve, extname} from "path";
import {existsSync, statSync} from "fs";

import qp from "qp-color";

import LSB from "../LSB";

export default function Read(args: string[]): void {
	if (args[1]) {
		const src = resolve(args[1]);

		if (!existsSync(src)) {
			throw new Error(qp.rb("The path does not exist.\n\t") + qp.yi("ima read <path>"));
		}

		if (!statSync(src).isFile()) {
			throw new Error(qp.rb("The path is not a file.\n\t") + qp.yi("ima read <path>"));
		}

		if (extname(src) === ".png") {
			console.log(qp.gb("Reading file..."));
			LSB.decode(src, (text: string) => {
				if (text.length > 0) {
					console.log(qp.gb("Decoding text..."));

					console.log(qp.gb(src + ": \n") + qp.yi(text));
				} else {
					console.log(qp.yb("No text found in the image."));
				}
			});
		} else {
			throw new Error(qp.rb("The file is not a PNG.\n\t") + qp.yi("ima read <path>"));
		}
	} else {
		throw new Error(qp.rb("You did not specify any path.\n\t") + qp.yi("ima read <path>"));
	}
}