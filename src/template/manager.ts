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

import * as fs from 'fs';
import * as paht_lib from 'path';
import * as nunjucks from 'nunjucks';

import { HDL_LANG } from "../common/general";
import * as common from "./common";
import * as parser_lib from "../parser/factory";

/** Template */
export class Template_manager {
    private language: HDL_LANG = HDL_LANG.VHDL;
    private comment_symbol = "//";

    /**
     * @param  {HDL_LANG} language Language name
     */
    constructor(language: HDL_LANG) {
        if (language === HDL_LANG.VHDL) {
            this.comment_symbol = '//';
        }
        else {
            this.comment_symbol = '--';
        }
        this.language = language;
    }

    private get_header(header_file_path: string) {
        if (header_file_path === '') {
            return '';
        }

        try {
            const header_f = fs.readFileSync(header_file_path, 'utf8');
            const lines = header_f.split(/\r?\n/g);
            let header = '';
            for (let i = 0; i < lines.length; i++) {
                const element = lines[i];
                header += `${this.comment_symbol}  ${element}\n`;
            }
            return header + '\n';
        }
        catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
            return '';
        }
    }

    private get_indent(indent_char: string) {
        const indent = ['', '', '', '', '', ''];

        let base = '    ';
        if (indent_char !== '') {
            base = indent_char;
        }
        for (let i = 0; i < indent.length; i++) {
            indent[i] = base.repeat(i);
        }
        return indent;
    }

    private async parse(code: string) {
        const parser_f = new parser_lib.Factory();
        const parser = await parser_f.get_parser(this.language);
        parser.init();

        const code_tree = await parser.get_all(code, '}{}');
        if (code_tree === undefined) {
            return undefined;
        }
        return code_tree;
    }
    /**
     * Generate a template from HDL code
     * @param  {string} code HDL code
     * @param  {common.TEMPLATE_NAME} template_type Template type
     * @param  {common.t_options} options Template options
     */
    public async generate(code: string, template_type: common.TEMPLATE_NAME, options: common.t_options) {
        let template = '';
        const code_tree = await this.parse(code);
        if (code_tree === undefined) {
            return template;
        }
        // Get header
        const header = this.get_header(options.header_file_path);
        // Indent
        const indent = this.get_indent(options.indent_char);
        // Template parent
        let norm_language = this.language;
        if (this.language === HDL_LANG.SYSTEMVERILOG) {
            norm_language = HDL_LANG.VERILOG;
        }
        const template_path = paht_lib.join(__dirname, 'helpers', norm_language, `${template_type}.nj`);

        const name = code_tree.name;
        const generic = code_tree.get_generic_array();
        const port = code_tree.get_port_array();

        template = nunjucks.render(template_path, {
            indent: indent, header: header, name: name,
            generic: generic, port: port
        });

        return template;
    }
}
