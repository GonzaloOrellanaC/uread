"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const pre_users_model_1 = tslib_1.__importDefault(require("../models/pre-users.model"));
const users_model_1 = tslib_1.__importDefault(require("../models/users.model"));
const convert_excel_to_json_1 = tslib_1.__importDefault(require("convert-excel-to-json"));
const rut_js_1 = require("rut.js");
const preUserData = pre_users_model_1.default;
const userData = users_model_1.default;
const loadPreUserExcel = (req, res, next) => {
    console.log(req.files);
    console.log(req.files[0].buffer);
    const buffer = Buffer.from(req.files[0].buffer, 'base64');
    console.log(buffer.toString('base64'));
    if (req.files) {
        const result = (0, convert_excel_to_json_1.default)({
            source: buffer,
            header: {
                rows: 1
            }
        });
        const doc = result.Hoja1;
        doc.forEach(async (el, i) => {
            try {
                const run = (0, rut_js_1.format)(el.A.toString() + (0, rut_js_1.getCheckDigit)(el.A.toString()));
                const preUser = {
                    run: run
                };
                const findUser = await preUserData.findOne({ run: preUser.run });
                if (!findUser) {
                    try {
                        await preUserData.create(Object.assign({}, preUser));
                    }
                    catch (error) {
                    }
                }
            }
            catch (error) {
            }
            if (i === (doc.length - 1)) {
                res.json({
                    state: true,
                    data: 'Users added'
                });
            }
        });
    }
};
const getPreUsers = async (req, res, next) => {
    try {
        const allPreUsers = await preUserData.find();
        console.log(allPreUsers.length);
        res.json(allPreUsers);
    }
    catch (error) {
    }
};
const findPreUserByRun = async (req, res, next) => {
    const { run } = req.body;
    try {
        const user = await preUserData.findOne({ run: run });
        if (!user) {
            res.json({ data: null, state: false, message: 'user not found' });
        }
        else {
            const userRegistered = await userData.findOne({ run: run });
            if (userRegistered) {
                res.json({ data: user, state: false, message: 'user ir registered' });
            }
            else {
                res.json({ data: user, state: true, message: 'user found' });
            }
        }
    }
    catch (error) {
    }
};
exports.default = {
    loadPreUserExcel,
    getPreUsers,
    findPreUserByRun
};
//# sourceMappingURL=excelToJson.service.js.map