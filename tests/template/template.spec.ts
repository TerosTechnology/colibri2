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

import { Template_manager } from "../../src/template/manager";
import * as common from "../../src/template/common";
import { HDL_LANG } from "../../src/common/general";
import { equal } from "assert";
import * as fs from 'fs';
import * as paht_lib from 'path';

const vhdl_code = `
library ieee;
use ieee.std_logic_1164.all;
use ieee.numeric_std.all;

entity test_entity_name is
generic (
    a : integer;
    b : unsigned;
    c : signed;
    d : std_logic;
    e : std_logic_vector;
    f : std_logic_vector(5 downto 0)
  );
port(
  g : in std_logic;
  h : out std_logic;
  i : inout std_logic
);
end test_entity_name;  

architecture e_arch of test_entity_name is
begin 

end e_arch;
`;

const verilog_code = `

`;

const C_OUTPUT_BASE_PATH = paht_lib.join(__dirname, 'out');
fs.mkdirSync(C_OUTPUT_BASE_PATH, { recursive: true });

async function generate_template_manager(language: HDL_LANG) {
    const template_manager = new Template_manager(language);
    return template_manager;
}

const language_array = [HDL_LANG.VHDL];

language_array.forEach(language => {
    describe('Check template VHDL element', function () {
        const values = Object.values(common.TEMPLATE_NAME);
        values.forEach(template_type => {
            it(`Check ${template_type}`, async function () {
                let code_hdl = verilog_code;
                if (language === HDL_LANG.VHDL) {
                    code_hdl = vhdl_code;
                }

                const options: common.t_options = {
                    header_file_path: "",
                    indent_char: "  "
                };

                const template_manager = await generate_template_manager(language);
                const template = await template_manager.generate(code_hdl, template_type, options);
                const output_path = paht_lib.join(C_OUTPUT_BASE_PATH, `${language}_${template_type}.${language}`);
                fs.writeFileSync(output_path, template);

                //Get exepcted template
                const input_path = paht_lib.join(__dirname, 'expected', `${language}_${template_type}.${language}`);
                const expected = fs.readFileSync(input_path);

                equal(template, expected);
            });
        });

    });
});