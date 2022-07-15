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

import { OS } from "./common";
import * as os_lib from "os";
import * as path_lib from 'path';
import { makeid } from '../utils/common_utils';
import * as fs from 'fs';

export function get_os(): OS {
    const os_i = process.platform;
    if (os_i === "linux") {
        return OS.LINUX;
    }
    else if (os_i === "win32") {
        return OS.WINDOWS;
    }
    else {
        return OS.MAC;
    }
}

export function create_temp_file(content: string): string {
    const temp = require('temp');
    const fs = require('fs');

    const temp_file = temp.openSync();
    if (temp_file === undefined) {
        throw "Unable to create temporary file";
    }
    fs.writeSync(temp_file.fd, content);
    fs.closeSync(temp_file.fd);
    return temp_file.path;
}

export function get_home_directory(): string {
    const user_hom_dir = os_lib.homedir();
    return user_hom_dir;
}

export function get_random_folder_in_home_directory(): string {
    const user_hom_dir = get_home_directory();
    const random_id = makeid(5);
    const random_folder = path_lib.join(user_hom_dir, `.teroshdl_${random_id}_`)
    return random_folder;
}

export function rm_directory(directory: string): boolean {
    try {
        fs.rmdirSync(directory, { recursive: true });
        return true;
    } catch (err) {
        return false;
    }
}