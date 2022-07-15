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

import { Process } from "./process";
import { get_os } from "./utils";
import * as common from "./common";
import { join } from "path";

export type python_options = {
    path: string;
}

export type python_result = {
    python_path: string;
    stdout: string;
    stderr: string;
    successful: boolean;
}

export async function get_python_path(opt: python_options): Promise<python_result> {
    let binary: string[] = [];
    const os_system = get_os();
    if (os_system === common.OS.WINDOWS) {
        binary = [opt.path,
        join(opt.path, 'python.exe'), join(opt.path, 'python3.exe'), 'python3', 'python', 'python.exe', 'python3.exe'];
    }
    else {
        binary = [opt.path, join(opt.path, 'python'), join(opt.path, 'python3'), 'python3', 'python'];
    }
    const result = find_python3_in_list(binary);
    return result;
}

export async function find_python3_in_list(binary: string[]): Promise<python_result> {
    const p_result: python_result = {
        python_path: "",
        stdout: "",
        stderr: "",
        successful: false
    };
    for (const bin of binary) {
        const opt: python_options = { path: bin };
        const result = await check_python3_path(opt);
        if (result.successful === true) {
            p_result.python_path = await get_complete_python_path(bin);
            p_result.successful = true;
            return p_result;
        }
    }
    return p_result;
}

export async function check_python3_path(opt: python_options): Promise<common.p_result> {
    const cmd = `${opt.path} -c "import sys; check_version = sys.version_info > \
        (3,0); exit(0) if check_version == True else exit(-1)"`;
    const p = new Process();
    const result = await p.exec_wait(cmd);
    return result;
}

async function get_complete_python_path(python_path: string) {
    const cmd = `${python_path} -c "import sys; print(sys.executable)"`;
    const p = new Process();
    const result = await p.exec_wait(cmd);
    return result.stdout;
}

export async function check_python_package_list(python_path: string, package_name_list: string[]): Promise<boolean> {
    for (const package_name of package_name_list) {
        const result = await check_python_package(python_path, package_name);
        if (result === false) {
            return result;
        }
    }
    return true;
}

export async function check_python_package(python_path: string, package_name: string): Promise<boolean> {
    const cmd = `${python_path} -c "import ${package_name}; exit(0)"`;
    const p = new Process();
    const result = await p.exec_wait(cmd);
    return result.successful;
}

export async function exec_python_script(python_path: string, python_script_path: string, args: string) {
    const opt: python_options = {
        path: python_path
    };
    const python_result = await get_python_path(opt);
    const cmd = `${python_result.python_path} "${python_script_path}" ${args}`;
    const p = new Process();
    const result = await p.exec_wait(cmd);
    return result;
}