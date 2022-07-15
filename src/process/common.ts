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

export enum TYPE_PROCESS {
    REMOTE = "remote",
    LOCAL = "local"
}


export type p_remote_configuration = {
    host: string;
    user: string;
    pass: string;
}

export type p_result = {
    command: string;
    stdout: string;
    stderr: string;
    return_value: number;
    successful: boolean;
}

export type p_options = {
    cwd: string;
}

export enum OS {
    LINUX = "linux",
    WINDOWS = "win32",
    MAC = "darwin"
}

