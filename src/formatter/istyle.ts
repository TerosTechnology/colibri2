// Copyright 2022 
// Carlos Alberto Ruiz Naranjo [carlosruiznaranjo@gmail.com]
// Ismael Perez Rojo [ismaelprojo@gmail.com ]
//
// This file is part of colibri2
//
// Colibri is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Colibri is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with colibri2.  If not, see <https://www.gnu.org/licenses/>.

const fs = require("fs");
const path_lib = require("path");
import { Base_formatter } from "./base_formatter";
import * as utils from "../process/utils";
import { OS } from "../process/common";
import { Process } from "../process/process";
import * as common from "./common";

export class Istyle extends Base_formatter {
    private binary_linux = 'istyle-linux';
    private binary_windows = 'istyle-win32.exe';
    private binary_mac = 'istyle-darwin';

    constructor() {
        super();
    }

    async format_from_code(code: string, opt: common.istyle_options): Promise<common.f_result> {
        const temp_file = await utils.create_temp_file(code);
        const formatted_code = await this.format(temp_file, opt);
        return formatted_code;
    }

    private get_binary(): string {
        const os = utils.get_os();
        if (os === OS.MAC) {
            return this.binary_mac;
        }
        else if (os === OS.LINUX) {
            return this.binary_linux;
        }
        else {
            return this.binary_windows;
        }
    }

    private async format(file: string, opt: common.istyle_options) {
        const binary_name = this.get_binary();
        const path_bin = path_lib.join(__dirname, 'bin', 'svistyle', binary_name);

        let command = "";
        if (opt.style === common.istyle_style.ONLYINDENT) {
            command = `${path_bin} --style=ansi -s${opt.indent_size} `;
        }
        else {
            command = `${path_bin} --style=${opt.style} -s${opt.indent_size} `;
        }
        command += file;

        const P = new Process();
        const exec_result = await P.exec_wait(command);
        const code_formatted = fs.readFileSync(file, "utf8");

        const result: common.f_result = {
            code_formatted: code_formatted,
            command: command,
            successful: exec_result.successful,
            message: exec_result.stderr,
        };

        return result;
    }
}
