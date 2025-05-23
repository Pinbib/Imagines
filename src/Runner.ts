import {exec} from "child_process";
import {writeFile, unlinkSync} from "node:fs";
import {join} from "node:path";

import qp from "qp-color";

function randomNumber(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

namespace Runner {
	function generateFileName(ext: string): string {
		let name = ".ima_temp_";

		for (let i = 0; i < randomNumber(5, 15); i++) {
			name += String.fromCharCode(randomNumber(97, 122));
			name += String.fromCharCode(randomNumber(48, 57));
			name += randomNumber(0, 9);
		}

		return name + ext;
	}

	function createFile(ext: string, data: string): Promise<string> {
		return new Promise((resolve, reject) => {
			const fileName = generateFileName(ext);
			const filePath = join(process.cwd(), fileName);

			writeFile(filePath, data, (err) => {
				if (err) {
					reject(err);
				} else {
					if (process.platform !== "win32") {
						resolve(filePath);
					} else {
						exec(`attrib +h "${filePath}"`, (err) => {
							if (err) {
								reject(err);
							} else {
								resolve(filePath);
							}
						});
					}
				}
			});
		});
	}

	export function run(com: string, ext: string, data: string): void {
		createFile(ext, data).then(path => {
			let command: string = `${com} ${path}`;

			exec(command, (err, stdout, stderr) => {
				if (stdout) {
					console.log(stdout);
				}

				if (err) {
					console.error(err);
				}

				if (stderr) {
					console.error(stderr);
				}

				unlinkSync(path);
			})
		}).catch(err => {
			if (err) console.error(qp.rb("Error creating temporary file."));
		});
	}
}

export default Runner;