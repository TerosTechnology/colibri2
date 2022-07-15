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

import * as common_documenter from "./common";
import * as fs from 'fs';
import * as path_lib from 'path';

export class Translator {
    private translation;
    private language: common_documenter.LANGUAGE;

    constructor(language: common_documenter.LANGUAGE) {
        const translation_path = path_lib.join(__dirname, 'translation.json');
        const rawdata = fs.readFileSync(translation_path).toString();
        this.translation = JSON.parse(rawdata);

        this.language = language;
    }

    set_language(language: common_documenter.LANGUAGE) {
        this.language = language;
    }

    get_str(key: string) {
        let str_lang = 'ERROR_TRANSLATION';
        try {
            str_lang = this.translation[key][this.language];
            if (str_lang === undefined) {
                str_lang = 'ERROR_TRANSLATION';
            }
        }
        catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
        }
        return str_lang;
    }
}