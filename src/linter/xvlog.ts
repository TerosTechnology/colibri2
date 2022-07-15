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

import { get_os } from "../process/utils";
import { Process } from "../process/process";
import { OS } from "../process/common";
import { get_language } from "../common/utils";
import { HDL_LANG } from "../common/general";

import { Base_linter } from "./base_linter";
import * as common from "./common";

export class Xvlog extends Base_linter {
    binary_linux = "xvlog -nolog";
    binary_mac = "xvlog -nolog";
    binary_windows = "xvlog -nolog";
    sv_options = "--sv";

    constructor() {
        super();
    }

    async delete_previus_lint() {
        const os = get_os();
        const p = new Process();
        if (os === OS.WINDOWS) {
            const command = 'del xvhdl.pb && del xvhdl.log && rmdir xsim.dir';
            await p.exec_wait(command);
        }
        else {
            const command = 'rm xvhdl.pb; rm xvhdl.log; rm -R xsim.dir';
            await p.exec_wait(command);
        }
    }

    async lint(file: string, options: common.l_options): Promise<common.l_error[]> {
        const file_lang = get_language(file);
        if (file_lang === HDL_LANG.SYSTEMVERILOG) {
            options.argument += ` ${this.sv_options} `;
        }

        const result = await this.exec_linter(file, options);
        file = file.replace(/\\ /g, ' ');

        const errors_str = result.stdout;
        const errors_str_lines = errors_str.split(/\r?\n/g);
        const errors: common.l_error[] = [];

        errors_str_lines.forEach((line) => {
            const tokens = line.split(/:?\s*(?:\[|\])\s*/).filter(Boolean);
            if (tokens.length < 4
                || tokens[0] !== "ERROR"
                || !tokens[1].startsWith("VRFC")) {
                return;
            }

            // Get filename and line number
            const [, lineno_str] = tokens[3].split(/:(\d+)/);
            const lineno = parseInt(lineno_str) - 1;

            const error: common.l_error = {
                severity: common.LINTER_ERROR_SEVERITY.ERROR,
                description: tokens[2],
                code: tokens[1],
                location: {
                    file: file,
                    position: [lineno, 0]
                }
            };
            errors.push(error);
        });

        return errors;
    }
}