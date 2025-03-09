"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRoleDto = exports.CreateGlobalRoleDto = exports.CreateRoleDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateRoleDto {
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], CreateRoleDto.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", Object)
], CreateRoleDto.prototype, "organizationId", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", Object)
], CreateRoleDto.prototype, "resources", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", String)
], CreateRoleDto.prototype, "description", void 0);
exports.CreateRoleDto = CreateRoleDto;
class CreateGlobalRoleDto {
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], CreateGlobalRoleDto.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", Object)
], CreateGlobalRoleDto.prototype, "resources", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", String)
], CreateGlobalRoleDto.prototype, "description", void 0);
exports.CreateGlobalRoleDto = CreateGlobalRoleDto;
class UpdateRoleDto {
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateRoleDto.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", Object)
], UpdateRoleDto.prototype, "resources", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateRoleDto.prototype, "description", void 0);
exports.UpdateRoleDto = UpdateRoleDto;
//# sourceMappingURL=roles.dto.js.map