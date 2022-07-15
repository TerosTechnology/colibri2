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

import { Base_linter } from "./base_linter";
import * as common from "./common";

export class Ghdl extends Base_linter {
    binary_linux = "ghdl -s -fno-color-diagnostics";
    binary_mac = "ghdl -s -fno-color-diagnostics";
    binary_windows = "ghdl -s -fno-color-diagnostics";

    constructor() {
        super();
    }

    delete_previus_lint() {
        return true;
    }

    async lint(file: string, options: common.l_options): Promise<common.l_error[]> {
        const result = await this.exec_linter(file, options);
        try {
            const errors: common.l_error[] = [];
            file = file.replace(/\\ /g, ' ');
            const errors_str = result.stderr;
            const errors_str_lines = errors_str.split(/\r?\n/g);
            errors_str_lines.forEach((line: string) => {
                if (line.startsWith(file)) {
                    line = line.replace(file, '');
                    const terms = line.split(':');
                    const line_num = parseInt(terms[1].trim());
                    const column_num = parseInt(terms[2].trim());
                    if (terms.length === 4) {
                        const error: common.l_error = {
                            severity: common.LINTER_ERROR_SEVERITY.ERROR,
                            description: terms[3].trim(),
                            code: '',
                            location: {
                                file: file,
                                position: [line_num - 1, column_num - 1]
                            }
                        };
                        errors.push(error);
                    }
                    else if (terms.length >= 4) {
                        let sev;
                        if (terms[2].trim() === 'error') {
                            sev = common.LINTER_ERROR_SEVERITY.ERROR;
                        }
                        else if (terms[2].trim() === 'warning') {
                            sev = common.LINTER_ERROR_SEVERITY.WARNING;
                        }
                        else {
                            sev = common.LINTER_ERROR_SEVERITY.ERROR;
                        }
                        const error: common.l_error = {
                            severity: sev,
                            description: terms[3].trim(),
                            code: '',
                            location: {
                                file: file,
                                position: [line_num - 1, column_num - 1]
                            }
                        };

                        errors.push(error);
                    }
                }
            });
            return errors;
        } catch (error) {
            return [];
        }
    }
}