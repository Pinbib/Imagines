import {resolve, extname} from "path";
import {existsSync, statSync, readFileSync} from "fs";

import qp from "qp-color";

import LSB from "../LSB";
import PNGSize from "../PNGSize";

export default function Write(args: string[]): void {
	if (args.length >= 4) {
		let input: string = resolve(args[1]);
		let output: string = resolve(args[2]);
		let text: string = args[3];

		if (existsSync(text) && statSync(text).isFile()) {
			text = readFileSync(resolve(text), {encoding: "utf-8"});
		}

		if (!existsSync(input)) {
			throw new Error(qp.rb("The path does not exist.\n\t") + qp.yi("ima write <input> <output> <text>"));
		}

		if (!statSync(input).isFile()) {
			throw new Error(qp.rb("The path is not a file.\n\t") + qp.yi("ima write <input> <output> <text>"));
		}

		if (extname(input) === ".png") {
			console.log(qp.gb("Encoding text..."));

			PNGSize(input, (size: number, width: number, height: number) => {
				let textSize: number = Buffer.byteLength(text);

				console.log(qp.gb("The text size is ") + qp.gi(textSize.toString() + " Bytes") + qp.gb(", ") + qp.gi(size.toString() + " Bytes") + qp.gb(" can be written to the image. After writing, ") + qp.gi((size - textSize).toString() + " Bytes") + qp.gb(" will remain in the image."));

				if (textSize > size) {
					throw new Error(qp.rb("The text is too large to be encoded in the image. \n\t") + qp.yi("ima write <input> <output> <text>"));
				}

				LSB.encode(input, output, text, () => {
					console.log(qp.gb("Writing file..."));
					console.log(qp.gb("Done! The text was written to: \n\t") + qp.yi(output));
				});
			});
		} else {
			throw new Error(qp.rb("The file is not a PNG.\n\t") + qp.yi("ima write <input> <output> <text>"));
		}
	} else {
		throw new Error(qp.rb("You did not specify any arguments.\n\t") + qp.yi("ima write <input> <output> <text>"));
	}
}