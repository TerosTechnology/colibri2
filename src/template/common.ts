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

export enum TEMPLATE_NAME {
    COCOTB = 'cocotb',
    // VERILATOR = 'verilator',
    // VUNIT = 'vunit',
    TESTBENCH_NORMAL = 'testbench_normal',
    TESTBENCH_VUNIT = 'testbench_vunit',

    HDL_ELEMENT_COMPONENT = 'hdl_element_component',
    HDL_ELEMENT_INSTANCE_VHDL_NEW = 'hdl_element_instance_vhdl_new',
    HDL_ELEMENT_INSTANCE = 'hdl_element_instance',
    HDL_ELEMENT_SIGNAL = 'hdl_element_signal',

    HDL_ELEMENT_MIX_COMPONENT = 'hdl_element_mix_component',
    // HDL_ELEMENT_MIX_SIGNAL = 'hdl_element_mix_signal',
    // HDL_ELEMENT_MIX_INSTANCE = 'hdl_element_mix_instance',
    // HDL_ELEMENT_MIX_INSTANCE_VHDL_NEW = 'hdl_element_mix_instance_vhdl_new',
}


export type t_options = {
    header_file_path: string;
    indent_char: string;
};