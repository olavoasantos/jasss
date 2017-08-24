#! /usr/bin/env node

/** Import classes */
let File = require('../Core/File');
let CLI = require('../Core/CLI/CLI');
let jasss = require('../Core/JaSSS');

let $input = "", $output = "";      // User input
let cli = new CLI(process.argv);    // New CLI instance

/** Register commands */
cli.handler.register(
        "-i",
        "input",
        "Path to jasss file",
        (input) => {
            $input = input;
        }
    );

cli.handler.register(
        "-o",
        "output",
        "Path to output the compiled CSS file (defaults to: {<input>}.css)",
        (output) => {
            $output = output;
        },
        () => {
            if (!$output) {
                $output = $input.slice(0,-5) + "css";
            }
        }
    );

/** Register validation rules */
cli.validation.register(
        "Checks if input was set",
        () => {
            return ($input);
        },
        "Please add an input file by running 'jasss -i {file path}'"
    );

cli.validation.register(
        "Checks if input is a jasss file",
        () => {
            return ($input.endsWith(".jasss"));
        },
        "Invalid file input extension. Please select a *.jasss file"
    );

cli.validation.register(
        "Checks if input file exists",
        () => {
            return (File.exists($input));
        },
        `Input file not found`
    );

cli.run();

jasss.compileFile($input, $output);
