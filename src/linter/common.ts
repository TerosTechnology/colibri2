// Copyright 2022 
// Carlos Alberto Ruiz Naranjo [carlosruiznaranjo@gmail.com]
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

/** Linter name */
export enum LINTER_NAME {
    GHDL = "ghdl",
    ICARUS = "icarus",
    MODELSIM = "modelsim",
    SVLINT = "svling",
    VERIBLE = "verilbe",
    VERILATOR = "verilator",
    VSG = "vsg",
    XVHDL = "xvhdl",
    XVLOG = "xvlog",
}

/** Linter severity of error */
export enum LINTER_ERROR_SEVERITY {
    ERROR = "error",
    WARNING = "warning",
    INFO = "information",
}

/** Individual linter error description */
export type l_error = {
    severity: LINTER_ERROR_SEVERITY;
    description: string;
    code: string;
    location: {
        file: string,
        position: number[]
    };
}

/** Linter options */
export type l_options = {
    path: string;
    argument: string
}

