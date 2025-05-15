import {resolve, join, extname} from "path";
import {existsSync, statSync, readFile, createReadStream} from "fs";

import {PNG} from "pngjs";

import qp from "qp-color";

export function PNGSize(src: string, f: (size: number, width: number, height: number) => void): void {
	createReadStream(src).pipe(new PNG()).on("parsed", function () {
		const width = this.width;
		const height = this.height;

		const bitsPerChannel = 1;
		const channelsPerPixel = 3;

		const totalBits = width * height * channelsPerPixel * bitsPerChannel;
		const totalBytes = Math.floor(totalBits / 8);

		f(totalBytes, width, height);
	});
}

export default function size(args: string[]): void {
	let src: string = "";

	if (args[1]) {
		src = resolve(args[1]);

		if (!existsSync(src)) {
			throw new Error(qp.rb("The path does not exist.\n\t") + qp.yi("ima size <path>"));
		}

		if (!statSync(src).isFile()) {
			throw new Error(qp.rb("The path is not a file.\n\t") + qp.yi("ima size <path>"));
		}

		if (extname(src) === ".png") {
			PNGSize(src, (size: number, width: number, height: number) => {
				console.log(qp.gb("Image size: ") + qp.gi(width.toString() + " x " + height.toString()));
				console.log(qp.gb("Maximum bytes for LSB (1 bit/channel): ") + qp.gi(size.toString() + " Bytes"));
			});
		} else {
			readFile(src, {encoding: "utf-8"}, (err, data) => {
				if (err) {
					throw new Error(qp.rb("Error reading file."));
				}

				let size: number = Buffer.byteLength(data);

				console.log(qp.gb("Text file size: ") + qp.gi(size.toString() + " Bytes"));
			});
		}
	} else {
		throw new Error(qp.rb("You did not specify any path.\n\t") + qp.yi("ima size <path>"));
	}
}