import { Formatter } from "../../src/formatter/formatter";
import * as common from "../../src/formatter/common";
import * as fs from 'fs';
import * as paht_lib from 'path';
import { HDL_LANG } from '../../src/common/general';
import { equal } from "assert";
import { normalize_breakline_windows } from '../common_utils';
import { get_os } from "../../src/process/utils";
import * as common_process from "../../src/process/common";

const C_OUTPUT_BASE_PATH = paht_lib.join(__dirname, 'out');
fs.mkdirSync(C_OUTPUT_BASE_PATH, { recursive: true });

async function format_and_check(formatter_name: common.FORMATTER_NAME, language: HDL_LANG,
    test_index: number, opt: any) {
    const formatter = new Formatter(formatter_name);

    const file_i = paht_lib.join(__dirname, 'helpers', formatter_name, `input_${test_index}.${language}`);
    const content_i = fs.readFileSync(file_i).toString('utf8');

    const file_o = paht_lib.join(__dirname, 'helpers', formatter_name, `output_${test_index}.${language}`);
    const expected = fs.readFileSync(file_o).toString('utf8');

    const output_path = paht_lib.join(C_OUTPUT_BASE_PATH, `${formatter_name}_${test_index}.${language}`);

    const formatter_result = await formatter.format_from_code(content_i, opt);
    fs.writeFileSync(output_path, formatter_result.code_formatted);

    equal(normalize_breakline_windows(formatter_result.code_formatted), normalize_breakline_windows(expected));
}

describe('Check standalone VHDL formatter', function () {
    const language = HDL_LANG.VHDL;
    const formatter_name = common.FORMATTER_NAME.STANDALONE_VHDL;

    it(`Check align comments true, indentation and keyworks lowercase`, async function () {
        const test_index = 0;

        const options: common.standalone_vhdl_options = {
            remove_comments: false,
            remove_asserts: false,
            remove_report: false,
            check_alias: false,
            align_comments: true,
            sign_align_settings: {
                is_regional: true,
                is_all: true,
                mode: common.ALIGN_MODE.LOCAL,
                keyWords: ["FUNCTION", "IMPURE FUNCTION", "GENERIC", "PORT", "PROCEDURE"]
            },
            keyword_case: common.LETTER_CASE.LOWERCASE,
            type_name_case: common.LETTER_CASE.LOWERCASE,
            indentation: "    ",
            new_line_settings: {
                new_line_after: [";", "then"],
                no_new_line_after: []
            },
            end_of_line: "\n"
        };

        await format_and_check(formatter_name, language, test_index, options);
    });

    it(`Check align comments false, indentation and keyworks uppercase`, async function () {
        const test_index = 1;

        const options: common.standalone_vhdl_options = {
            remove_comments: false,
            remove_asserts: false,
            remove_report: false,
            check_alias: false,
            align_comments: false,
            sign_align_settings: {
                is_regional: true,
                is_all: true,
                mode: common.ALIGN_MODE.LOCAL,
                keyWords: ["FUNCTION", "IMPURE FUNCTION", "GENERIC", "PORT", "PROCEDURE"]
            },
            keyword_case: common.LETTER_CASE.UPPERCASE,
            type_name_case: common.LETTER_CASE.UPPERCASE,
            indentation: "      ",
            new_line_settings: {
                new_line_after: [";", "then"],
                no_new_line_after: []
            },
            end_of_line: "\n"
        };

        await format_and_check(formatter_name, language, test_index, options);
    });
});

describe('Check istyle formatter', function () {
    const language = HDL_LANG.VERILOG;
    const formatter_name = common.FORMATTER_NAME.ISTYLE;

    const style_list = [common.istyle_style.ANSI, common.istyle_style.KR,
    common.istyle_style.GNU, common.istyle_style.ONLYINDENT];


    for (let index = 0; index < style_list.length; index++) {
        const style_inst = style_list[index];
        it(`Check ${style_inst} with indent = 2`, async function () {
            const test_index = index;

            const options: common.istyle_options = { style: style_inst, indent_size: 2 };
            await format_and_check(formatter_name, language, test_index, options);
        });
    }

    for (let index = 0; index < style_list.length; index++) {
        const style_inst = style_list[index];
        it(`Check ${style_inst} with indent = 6`, async function () {
            const test_index = index + style_list.length;

            const options: common.istyle_options = { style: style_inst, indent_size: 6 };
            await format_and_check(formatter_name, language, test_index, options);
        });
    }
});

describe('Check s3sv formatter', function () {
    const language = HDL_LANG.SYSTEMVERILOG;
    const formatter_name = common.FORMATTER_NAME.S3SV;

    const system_os = get_os();
    if (system_os === common_process.OS.WINDOWS) {
        this.timeout(5000);
    }

    it(`Check config 0`, async function () {
        const test_index = 0;

        const options: common.s3sv_options = {
            python3_path: "",
            use_tabs: false,
            indent_size: 2,
            one_bind_per_line: true,
            one_decl_per_line: true
        };

        await format_and_check(formatter_name, language, test_index, options);
    });

    it(`Check config 1`, async function () {
        const test_index = 1;

        const options: common.s3sv_options = {
            python3_path: "",
            use_tabs: true,
            indent_size: 4,
            one_bind_per_line: true,
            one_decl_per_line: true
        };

        await format_and_check(formatter_name, language, test_index, options);
    });

    it(`Check config 2 and bad python3 path`, async function () {
        const test_index = 2;

        const options: common.s3sv_options = {
            python3_path: "asdf",
            use_tabs: true,
            indent_size: 2,
            one_bind_per_line: false,
            one_decl_per_line: true
        };

        await format_and_check(formatter_name, language, test_index, options);
    });
});
