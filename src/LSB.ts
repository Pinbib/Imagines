import {createWriteStream, createReadStream} from "node:fs";

import {PNG} from "pngjs";

export function textToBits(text: string) {
	return text
		.split('')
		.map(c => c.charCodeAt(0).toString(2).padStart(8, '0'))
		.join('');
}

export function bitsToText(bits: string): string {
	let chars = [];
	for (let i = 0; i < bits.length; i += 8) {
		const byte = bits.slice(i, i + 8);
		if (byte === '00000000') break;
		chars.push(String.fromCharCode(parseInt(byte, 2)));
	}
	return chars.join('');
}

namespace ImageLSB {
	export function encode(input: string, output: string, text: string, f: () => void) {
		const textBits = textToBits(text) + '00000000';
		let bitIndex = 0;

		createReadStream(input)
			.pipe(new PNG())
			.on('parsed', function () {
				for (let i = 0; i < this.data.length; i += 4) {
					if (bitIndex < textBits.length) {
						let blue = this.data[i + 2];
						blue = (blue & 0b11111110) | parseInt(textBits[bitIndex]);
						this.data[i + 2] = blue;
						bitIndex++;
					}
				}

				this.pack().pipe(createWriteStream(output));


			});
	}

	export function decode(input: string, f: (text: string) => void) {
		createReadStream(input)
			.pipe(new PNG())
			.on('parsed', function () {
				let bits: string = '';
				for (let i = 0; i < this.data.length; i += 4) {
					const blue = this.data[i + 2];
					bits += (blue & 1).toString();
				}
				const text: string = bitsToText(bits);

				f(text);
			});
	}
}

export default ImageLSB;