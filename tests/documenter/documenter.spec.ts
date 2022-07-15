import * as fs from 'fs';
import * as paht_lib from 'path';
// import * as common_hdl from "../../src/parser/common";
import * as common_documenter from "../../src/documenter/common";
import { Documenter } from "../../src/documenter/documenter";
import { HDL_LANG } from "../../src/common/general";
// import { equal } from "assert";

const C_OUTPUT_BASE_PATH = paht_lib.join(__dirname, 'complete');

const output_types = [common_documenter.doc_output_type.HTML, common_documenter.doc_output_type.MARKDOWN];
// const output_types = [common_documenter.doc_output_type.HTML];

output_types.forEach(output_type_inst => {
    describe(`Check documenter creator with ${output_type_inst}`, function () {

        it(`Entity VHDL`, async function () {
            const hdl_lang = HDL_LANG.VHDL;
            const hdl_type = 'entity';

            await run(hdl_type, hdl_lang, output_type_inst);
        });

        it(`Package VHDL`, async function () {
            const hdl_lang = HDL_LANG.VHDL;
            const hdl_type = 'package';

            await run(hdl_type, hdl_lang, output_type_inst);
        });

        it(`Module Verilog`, async function () {
            const hdl_lang = HDL_LANG.VERILOG;
            const hdl_type = 'entity';

            await run(hdl_type, hdl_lang, output_type_inst);
        });

        it(`Package SystemVerilog`, async function () {
            const hdl_lang = HDL_LANG.SYSTEMVERILOG;
            const hdl_type = 'package';

            await run(hdl_type, hdl_lang, output_type_inst);
        });


        it(`Interface SystemVerilog`, async function () {
            const hdl_lang = HDL_LANG.SYSTEMVERILOG;
            const hdl_type = 'interface';

            await run(hdl_type, hdl_lang, output_type_inst);
        });

    });
});

async function run(hdl_type: string, hdl_lang: HDL_LANG, output_type_inst: common_documenter.doc_output_type) {
    const configuration = get_config(output_type_inst);
    const input = get_input(hdl_type, hdl_lang);
    const documenter = new Documenter();
    const output_path = get_output_path(configuration, hdl_type, hdl_lang);
    await documenter.save_document(input.hdl_code, hdl_lang, configuration, input.path, output_path);
}


function get_input(hdl_type: string, hdl_lang: HDL_LANG) {
    const input_path =
        paht_lib.join(C_OUTPUT_BASE_PATH, `${hdl_type}.${hdl_lang}`);

    const hdl_code = fs.readFileSync(input_path).toString();

    return { path: input_path, hdl_code: hdl_code };
}

function get_output_path(configuration: common_documenter.documenter_options,
    hdl_type: string, hdl_lang: HDL_LANG) {

    let output = paht_lib.join(C_OUTPUT_BASE_PATH, 'out', `${hdl_type}_${hdl_lang}_${configuration.output_type}`);
    // fs.rmSync(output, { recursive: true });
    fs.mkdirSync(output, { recursive: true });
    output = paht_lib.join(output, `output.${configuration.output_type}`);
    return output;
}

// function get_expected_path(configuration: common_documenter.documenter_options, hdl_type: string,
//     hdl_lang: HDL_LANG) {

//     const expected = paht_lib.join(C_OUTPUT_BASE_PATH, 'expected', `${hdl_type}_${hdl_lang}`);
//     return expected;
// }

function get_config(output_type: common_documenter.doc_output_type) {
    const configuration: common_documenter.documenter_options = {
        generic_visibility: common_documenter.doc_visibility.ALL,
        port_visibility: common_documenter.doc_visibility.ALL,
        signal_visibility: common_documenter.doc_visibility.ALL,
        constant_visibility: common_documenter.doc_visibility.ALL,
        type_visibility: common_documenter.doc_visibility.ALL,
        function_visibility: common_documenter.doc_visibility.ALL,
        instantiation_visibility: common_documenter.doc_visibility.ALL,
        process_visibility: common_documenter.doc_visibility.ALL,
        output_type: output_type,
        language: common_documenter.LANGUAGE.ENGLISH,
        vhdl_symbol: '!',
        verilog_symbol: '!',
        enable_fsm: true
    };
    return configuration;
}