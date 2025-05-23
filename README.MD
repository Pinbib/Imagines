# Imagines

CLI utility for writing and reading steganography from images (as well as running code that has been written in the same
way)

# Installation

See the latest release for installation instructions.

# Commands

## `ima version`

Prints the version of the imagines package.
Alias: `ima -v`

## `ima help`

Prints the help message.

## `ima size`

```bash
ima size <path>
```

Shows the size of the specified text file, or how much can be written in the image.

- `<path>`: The path to the image (only `.png`) file or text file.

## `ima read <path>`

```bash
ima read <path>
```

Reads the text from the specified image file.

- `<path>`: The path to the image (only `.png`) file.

## `ima write`

```bash
ima write <input> <output> <text>
```

Writes the specified text to the image file.

- `<input>`: The path to the input image file (only `.png`).
- `<output>`: The path to the output image file.
- `<text>`: The text to write to the image file. If the text is a file, it will be read and written to the image.

## `ima run`

```bash
ima run <path>
```

Runs the code that has been written in the image file.

- `<path>`: The path to the image (only `.png`) file.

To specify how this code should run, there should be a specification at the beginning of the code in the following
format:

````js
// {command}<.ext>

console.log("Hello World");
````

`{command}` is the command through which this code will be run, `{.ext}` is the extension of the temporary file into
which the code will be written. (The output of the command through which the code will be run will look like this:
`{command} temp_file.<ext>`)