/* TODO:
- Add tests for Windows.
*/
import { Linter } from "../../src/linter/linter";
import * as common from "../../src/linter/common";

import { deepEqual } from "assert";
import * as paht_lib from 'path';

function get_linter(type: common.LINTER_NAME) {
    const linter = new Linter(type);
    return linter;
}

describe('Check GHDL', function () {
    it(`Check error messages with linter in system path`, async function () {
        const file = paht_lib.join(__dirname, 'helpers', 'ghdl.vhdl');
        const expected_errors: common.l_error[] = [];

        const linter = get_linter(common.LINTER_NAME.GHDL);
        const linter_options: common.l_options = {
            path: "",
            argument: ""
        };
        const actual_errors = await linter.lint_from_file(file, linter_options);

        expected_errors.push(
            {
                severity: common.LINTER_ERROR_SEVERITY.ERROR,
                description: "a constant must have a default value",
                code: '',
                location: {
                    file: file,
                    position: [13, 11]
                }
            }
        );
        expected_errors.push(
            {
                severity: common.LINTER_ERROR_SEVERITY.ERROR,
                description: "missing value for constant declared at line 14",
                code: '',
                location: {
                    file: file,
                    position: [12, 13]
                }
            }
        );
        deepEqual(actual_errors, expected_errors);
    });
});

describe('Check ModelSim VHDL', function () {
    it(`Check error messages with linter in system path`, async function () {
        const file = paht_lib.join(__dirname, 'helpers', 'modelsim_vhdl.out');
        const fs = require('fs');
        const content = fs.readFileSync(file, 'utf8');

        const expected_errors: common.l_error[] = [];

        const linter = get_linter(common.LINTER_NAME.MODELSIM);
        const actual_errors = linter.parse_output(content, file);

        expected_errors.push(
            {
                severity: common.LINTER_ERROR_SEVERITY.ERROR,
                description: "Deferred constants are allowed only in a package declaration.",
                code: '',
                location: {
                    file: file,
                    position: [13, 0]
                }
            }
        );
        expected_errors.push(
            {
                severity: common.LINTER_ERROR_SEVERITY.ERROR,
                description: 'Array type of "s_sample" does not have an index constraint.',
                code: 'vcom-1360',
                location: {
                    file: file,
                    position: [14, 0]
                }
            }
        );
        expected_errors.push(
            {
                severity: common.LINTER_ERROR_SEVERITY.ERROR,
                description: 'Integer literal 8 is not of type ieee.std_logic_1164.STD_LOGIC_VECTOR.',
                code: '',
                location: {
                    file: file,
                    position: [14, 0]
                }
            }
        );
        deepEqual(actual_errors, expected_errors);
    });
});

describe('Check xvhdl', function () {
    it(`Check error messages with linter in system path`, async function () {
        const file = paht_lib.join(__dirname, 'helpers', 'xvhdl.out');
        const fs = require('fs');
        const content = fs.readFileSync(file, 'utf8');

        const expected_errors: common.l_error[] = [];

        const linter = get_linter(common.LINTER_NAME.XVHDL);
        const actual_errors = linter.parse_output(content, file);

        expected_errors.push(
            {
                severity: common.LINTER_ERROR_SEVERITY.ERROR,
                description: "deferred constant 'cnt_sample' is allowed only in package declaration",
                code: 'VRFC 10-3255',
                location: {
                    file: file,
                    position: [13, 0]
                }
            }
        );
        expected_errors.push(
            {
                severity: common.LINTER_ERROR_SEVERITY.ERROR,
                description: "unit 'xvhdl_arch' ignored due to previous errors",
                code: 'VRFC 10-3782',
                location: {
                    file: file,
                    position: [12, 0]
                }
            }
        );
        deepEqual(actual_errors, expected_errors);
    });
});

describe('Check icarus', function () {
    it(`Check error messages with linter in system path and Verilog`, async function () {
        const file = paht_lib.join(__dirname, 'helpers', 'icarus.v');
        const expected_errors: common.l_error[] = [];

        const linter = get_linter(common.LINTER_NAME.ICARUS);
        const linter_options: common.l_options = {
            path: "",
            argument: ""
        };
        const actual_errors = await linter.lint_from_file(file, linter_options);

        expected_errors.push(
            {
                severity: common.LINTER_ERROR_SEVERITY.ERROR,
                description: "syntax error",
                code: '',
                location: {
                    file: file,
                    position: [4, 0]
                }
            }
        );
        expected_errors.push(
            {
                severity: common.LINTER_ERROR_SEVERITY.ERROR,
                description: "Invalid module instantiation",
                code: '',
                location: {
                    file: file,
                    position: [2, 0]
                }
            }
        );
        deepEqual(actual_errors, expected_errors);
    });
});

describe('Check ModelSim Verilog', function () {
    it(`Check error messages with linter in system path`, async function () {
        const file = paht_lib.join(__dirname, 'helpers', 'modelsim.v');
        const expected_errors: common.l_error[] = [];

        const linter = get_linter(common.LINTER_NAME.MODELSIM);
        const linter_options: common.l_options = {
            path: "",
            argument: ""
        };
        const actual_errors = await linter.lint_from_file(file, linter_options);

        expected_errors.push(
            {
                severity: common.LINTER_ERROR_SEVERITY.ERROR,
                description: 'syntax error, unexpected assign.',
                code: '',
                location: {
                    file: file,
                    position: [4, 0]
                }
            }
        );
        expected_errors.push(
            {
                severity: common.LINTER_ERROR_SEVERITY.ERROR,
                description: "Syntax error found in the scope following 's'. Is there a missing '::'?",
                code: 'vlog-13205',
                location: {
                    file: file,
                    position: [2, 0]
                }
            }
        );
        deepEqual(actual_errors, expected_errors);
    });
});

describe('Check xvlog', function () {
    it(`Check error messages with linter in system path`, async function () {
        const file = paht_lib.join(__dirname, 'helpers', 'xvlog_v.out');
        const fs = require('fs');
        const content = fs.readFileSync(file, 'utf8');

        const expected_errors: common.l_error[] = [];

        const linter = get_linter(common.LINTER_NAME.XVHDL);
        const actual_errors = linter.parse_output(content, file);

        expected_errors.push(
            {
                severity: common.LINTER_ERROR_SEVERITY.ERROR,
                description: "syntax error near 'assign'",
                code: 'VRFC 10-4982',
                location: {
                    file: file,
                    position: [4, 0]
                }
            }
        );
        expected_errors.push(
            {
                severity: common.LINTER_ERROR_SEVERITY.ERROR,
                description: "Verilog 2000 keyword assign used in incorrect context",
                code: 'VRFC 10-2790',
                location: {
                    file: file,
                    position: [4, 0]
                }
            }
        );
        deepEqual(actual_errors, expected_errors);
    });
});