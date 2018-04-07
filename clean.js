const shell = require("shelljs");

shell.rm("-rf", "./.cache");
shell.rm("-rf", "./dist");
shell.cd("./src/interactive-binary-decoder-rs");
shell.exec("cargo clean");
