"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrgDto = exports.CreateOrgDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateOrgDto {
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], CreateOrgDto.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", String)
], CreateOrgDto.prototype, "description", void 0);
exports.CreateOrgDto = CreateOrgDto;
class UpdateOrgDto {
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateOrgDto.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateOrgDto.prototype, "description", void 0);
exports.UpdateOrgDto = UpdateOrgDto;
//# sourceMappingURL=organizations.dto.js.map