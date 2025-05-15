import {createReadStream} from "fs";
import {PNG} from "pngjs";

export default function PNGSize(src: string, f: (size: number, width: number, height: number) => void): void {
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