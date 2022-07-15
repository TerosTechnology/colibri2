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

import * as common from "./common";
import { Standalone_vhdl } from "./standalone_vhdl";
import { Istyle } from "./istyle";
import { S3sv } from "./s3sv";
import { Verible } from "./verible";

export class Formatter {
    private formatter_inst: Standalone_vhdl | Istyle | S3sv | Verible;

    constructor(formatter_name: common.FORMATTER_NAME) {
        if (formatter_name === common.FORMATTER_NAME.STANDALONE_VHDL) {
            this.formatter_inst = new Standalone_vhdl();
        }
        else if (formatter_name === common.FORMATTER_NAME.ISTYLE) {
            this.formatter_inst = new Istyle();
        }
        else if (formatter_name === common.FORMATTER_NAME.S3SV) {
            this.formatter_inst = new S3sv();
        }
        else {
            this.formatter_inst = new Verible();
        }
    }

    async format_from_code(code: string, opt: any): Promise<common.f_result> {
        return this.formatter_inst.format_from_code(code, opt);
    }
}
