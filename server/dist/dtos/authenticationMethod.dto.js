"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAutheticationMethodDto = exports.UpdateAutheticationMethodDto = exports.AddAutheticationMethodDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class AddAutheticationMethodDto {
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", Object)
], AddAutheticationMethodDto.prototype, "userId", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], AddAutheticationMethodDto.prototype, "type", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", String)
], AddAutheticationMethodDto.prototype, "password", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", String)
], AddAutheticationMethodDto.prototype, "accessToken", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", String)
], AddAutheticationMethodDto.prototype, "refreshToken", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", Number)
], AddAutheticationMethodDto.prototype, "expiresIn", void 0);
exports.AddAutheticationMethodDto = AddAutheticationMethodDto;
class UpdateAutheticationMethodDto {
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", Object)
], UpdateAutheticationMethodDto.prototype, "userId", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateAutheticationMethodDto.prototype, "type", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateAutheticationMethodDto.prototype, "password", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateAutheticationMethodDto.prototype, "accessToken", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateAutheticationMethodDto.prototype, "refreshToken", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", Number)
], UpdateAutheticationMethodDto.prototype, "expiresIn", void 0);
exports.UpdateAutheticationMethodDto = UpdateAutheticationMethodDto;
class DeleteAutheticationMethodDto {
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", Object)
], DeleteAutheticationMethodDto.prototype, "userId", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], DeleteAutheticationMethodDto.prototype, "type", void 0);
exports.DeleteAutheticationMethodDto = DeleteAutheticationMethodDto;
//# sourceMappingURL=authenticationMethod.dto.js.map