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

export enum doc_visibility {
    ONLY_COMMENTED = 'only_commented',
    NONE = 'none',
    ALL = 'all'
}

export enum doc_output_type {
    HTML = 'html',
    MARKDOWN = 'markdown',
    SVG = 'svg'
}

export enum LANGUAGE {
    ENGLISH = 'english',
    RUSSIAN = 'russian',
}

export type documenter_options = {
    generic_visibility: doc_visibility;
    port_visibility: doc_visibility;
    signal_visibility: doc_visibility;
    constant_visibility: doc_visibility;
    type_visibility: doc_visibility;
    function_visibility: doc_visibility;
    instantiation_visibility: doc_visibility;
    process_visibility: doc_visibility;
    output_type: doc_output_type;
    language: LANGUAGE;
    vhdl_symbol: string;
    verilog_symbol: string;
    enable_fsm: boolean;
};