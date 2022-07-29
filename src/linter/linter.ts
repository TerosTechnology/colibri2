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

import { Ghdl } from "./ghdl";
import { Icarus } from "./icarus";
import { Verilator } from "./verilator";
import { Xvhdl } from "./xvhdl";
import { Xvlog } from "./xvlog";
import { Modelsim } from "./modelsim";
import { Verible } from "./verible";
import * as common from "./common";

/** Linter */
export class Linter {
    // private linter_inst: Ghdl | Icarus | Modelsim | Verilator | Xvlog | Xvhdl | Verible;
    private linter_inst: any;

    /**
     * @param  {common.LINTER_NAME} linter_name Linter name
     */
    constructor(linter_name: common.LINTER_NAME) {
        if (linter_name === common.LINTER_NAME.GHDL) {
            this.linter_inst = new Ghdl();
        }
        else if (linter_name === common.LINTER_NAME.ICARUS) {
            this.linter_inst = new Icarus();
        }
        else if (linter_name === common.LINTER_NAME.MODELSIM) {
            this.linter_inst = new Modelsim();
        }
        else if (linter_name === common.LINTER_NAME.VERILATOR) {
            this.linter_inst = new Verilator();
        }
        else if (linter_name === common.LINTER_NAME.XVLOG) {
            this.linter_inst = new Xvlog();
        }
        else if (linter_name === common.LINTER_NAME.XVHDL) {
            this.linter_inst = new Xvhdl();
        }
        // else if (linter_name === T_LINTER.VSG) {
        //     this.linter_inst = new Vsg();
        // }
        else if (linter_name === common.LINTER_NAME.VERIBLE) {
            this.linter_inst = new Verible();
        }
        // else if (linter_name === T_LINTER.SVLINT) {
        //     this.linter_inst = new Svlint();
        // }
        else {
            this.linter_inst = new Ghdl();
        }
    }

    parse_output(output: string, file: string) {
        const errors = this.linter_inst.parse_output(output, file);
        return errors;
    }

    /**
     * Lint a file from path
     * @param  {string} file File path to lint
     * @param  {common.l_options} options Linter options
     */
    async lint_from_file(file: string, options: common.l_options) {
        const errors = await this.linter_inst.lint_from_file(file, options);
        return errors;
    }

    /**
     * Lint a file from the code
     * @param  {string} code Code to lint
     * @param  {common.l_options} options Linter options
     */
    async lint_from_code(code: string, options: common.l_options) {
        const errors = await this.linter_inst.lint_from_code(code, options);
        return errors;
    }

}
