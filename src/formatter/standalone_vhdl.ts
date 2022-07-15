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

import { Base_formatter } from "./base_formatter";
import * as common from "./common";
import { beautify, BeautifierSettings, signAlignSettings, NewLineSettings } from "./bin/standalone_vhdl/VHDLFormatter";

export class Standalone_vhdl extends Base_formatter {
    constructor() {
        super();
    }

    async format_from_code(code: string, opt: common.standalone_vhdl_options): Promise<common.f_result> {
        try {
            const code_formatted = <string>beautify(code, this.get_settings(opt));
            const result: common.f_result = {
                code_formatted: code_formatted,
                command: "",
                successful: true,
                message: "",
            };
            return result;
        } catch (error) {
            const result: common.f_result = {
                code_formatted: "",
                command: "",
                successful: false,
                message: "",
            };
            return result;
        }
    }

    get_settings(opt: common.standalone_vhdl_options): BeautifierSettings {
        const sign_align_settings = new signAlignSettings(opt.sign_align_settings.is_regional,
            opt.sign_align_settings.is_all, opt.sign_align_settings.mode, opt.sign_align_settings.keyWords);

        const new_line_keyworks = opt.new_line_settings.new_line_after;
        const no_new_line_keyworks = opt.new_line_settings.no_new_line_after;

        const new_line_settings = new NewLineSettings();
        new_line_keyworks.forEach(element => {
            new_line_settings.newLineAfterPush(element);
        });

        no_new_line_keyworks.forEach(element => {
            new_line_settings.noNewLineAfterPush(element);
        });

        const settings = new BeautifierSettings(opt.remove_comments, opt.remove_report, opt.check_alias,
            opt.align_comments, sign_align_settings, opt.keyword_case, opt.type_name_case, opt.indentation,
            new_line_settings, opt.end_of_line);

        return settings;
    }
}