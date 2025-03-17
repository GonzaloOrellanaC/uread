"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leerClassroomsPorNivelPlan = exports.getClassrooms = exports.guardarClassroom = void 0;
const tslib_1 = require("tslib");
const classroom_model_1 = (0, tslib_1.__importDefault)(require("../models/classroom.model"));
const guardarClassroom = async (req, res) => {
    const { classRoomList } = req.body;
    /* classRoomList.forEach(c=> {
        console.log(c)
    }) */
    const classRoomListEdited = await Promise.all(classRoomList.map(async (c) => {
        if (c._id) {
            const classRoom = await classroom_model_1.default.findByIdAndUpdate(c._id, c);
            return classRoom;
        }
        else {
            const classRoom = await classroom_model_1.default.create(c);
            return classRoom;
        }
    }));
    res.status(200).json({ list: classRoomListEdited });
};
exports.guardarClassroom = guardarClassroom;
const getClassrooms = async (req, res) => {
    const list = await classroom_model_1.default.find();
    res.status(200).json({ list });
};
exports.getClassrooms = getClassrooms;
const leerClassroomsPorNivelPlan = async (req, res) => {
    const { nivel, plan } = req.query;
    try {
        const list = await classroom_model_1.default.find();
        const listToSend1 = [];
        list.forEach((item) => {
            item.planes.forEach((p) => {
                if (p.name === plan && p.checked) {
                    listToSend1.push(item);
                }
            });
        });
        const listToSend2 = [];
        listToSend1.forEach((item) => {
            item.niveles.forEach((n) => {
                if (Number(n.number) === Number(nivel) && n.checked) {
                    listToSend2.push(item);
                }
            });
        });
        res.status(200).json({ list: listToSend2 });
    }
    catch ({ name, message }) {
        res.status(400).json({ name, message });
    }
};
exports.leerClassroomsPorNivelPlan = leerClassroomsPorNivelPlan;
//# sourceMappingURL=classroom.controller.js.map