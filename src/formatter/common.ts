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

export type f_result = {
    code_formatted: string;
    command: string;
    successful: boolean;
    message: string;
};

export enum FORMATTER_NAME {
    STANDALONE_VHDL = "standalone_vhdl",
    ISTYLE = "istyle",
    S3SV = "s3sv",
    VERIBLE = "verible"
}

export enum istyle_style {
    ANSI = "ansi",
    KR = "kr",
    GNU = "gnu",
    ONLYINDENT = "onlyindent",
}

export type istyle_options = {
    style: istyle_style,
    indent_size: number
};

export enum LETTER_CASE {
    LOWERCASE = "lowercase",
    UPPERCASE = "uppercase"
}

export enum ALIGN_MODE {
    LOCAL = "local",
}

export type standalone_vhdl_options = {
    remove_comments: boolean,
    remove_asserts: boolean,
    remove_report: boolean,
    check_alias: boolean,
    // Check ALIAS (every long name is replaced with ALIAS)
    align_comments: boolean,
    sign_align_settings: {
        is_regional: boolean,
        is_all: boolean,
        mode: ALIGN_MODE,
        // ["FUNCTION", "IMPURE FUNCTION", "GENERIC", "PORT", "PROCEDURE"]
        keyWords: string[]
    },
    keyword_case: LETTER_CASE,
    type_name_case: LETTER_CASE,
    indentation: string,
    new_line_settings: {
        // [";", "then"]
        new_line_after: string[],
        no_new_line_after: string[]
    },
    end_of_line: "\n"
};

export type s3sv_options = {
    python3_path: string,
    use_tabs: boolean,
    indent_size: number,
    one_bind_per_line: boolean,
    one_decl_per_line: boolean
};

export type verible_options = {
    path: string,
    arguments: string,
};


