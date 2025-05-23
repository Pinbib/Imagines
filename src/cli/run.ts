import {resolve} from "path";
import {existsSync, statSync} from "fs";

import qp from "qp-color";
import ImageLSB from "../LSB";
import Runner from "../Runner";

export default function Run(args: string[]): void {
	if (args[1] !== undefined) {
		const src: string = resolve(args.slice(1).join(" "));

		if (!existsSync(src)) {
			throw new Error(qp.rb("The path does not exist.\n\t") + qp.yi("ima run <path>"));
		}

		if (!statSync(src).isFile()) {
			throw new Error(qp.rb("The path is not a file.\n\t") + qp.yi("ima run <path>"));
		}

		ImageLSB.decode(src, (text: string) => {
			if (text.length > 0) {
				let matches: RegExpMatchArray | null = text.match(/{([^{}]+)}(.?)+<([^<>]+)>/);

				if (matches !== null) {
					let [_, com, __, ext]: string[] = matches;

					Runner.run(com, /^\./.test(ext) ? ext : "." + ext, text);
				} else {
					console.log(qp.rb("No code specification found in the image."));
				}
			}
		});
	} else {
		throw new Error(qp.rb("You did not specify any path.\n\t") + qp.yi("ima run <path>"));
	}
}