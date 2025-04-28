"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const i18n_1 = require("i18n");
const configs_1 = require("../configs");
const organizations_model_1 = tslib_1.__importDefault(require("../models/organizations.model"));
const HttpException_1 = require("../exceptions/HttpException");
/**
 * Creates a new Organization
 * @param  {CreateOrgDto} orgInfo Organization data to create
 * @param  {string=env.locale} locale
 * @returns Object with organization information
 */
const createOrganization = async (orgInfo, locale = configs_1.env.locale) => {
    const newOrganization = await organizations_model_1.default.create(orgInfo);
    if (!newOrganization)
        throw new HttpException_1.HttpException(409, (0, i18n_1.__)({ phrase: 'Organization {{name}} already exists', locale }, { name: orgInfo.name }));
    return newOrganization;
};
const editOrganization = async (orgInfo, locale = configs_1.env.locale) => {
    const org = await organizations_model_1.default.findByIdAndUpdate(orgInfo._id, orgInfo);
    if (!org)
        throw new HttpException_1.HttpException(409, (0, i18n_1.__)({ phrase: 'error', locale }, { name: orgInfo.name }));
    return org;
};
/**
 * Deletes an organization using id
 * @param  {string} organizationId Id of the Organization to delete
 * @param  {string=env.locale} locale
 * @returns Object with the information of the deleted organization
 */
const deleteOrgById = async (organizationId, locale = configs_1.env.locale) => {
    const deleted = await organizations_model_1.default.findByIdAndDelete(organizationId);
    if (!deleted)
        throw new HttpException_1.HttpException(404, (0, i18n_1.__)({ phrase: 'Oganization not found', locale }));
    return deleted;
};
/**
 * Search for all organizations in the data base
 * @returns Array of organizations
 */
const getOrganizations = async () => {
    const organizations = await organizations_model_1.default.find().populate('user');
    return organizations;
};
const getOrgById = async (_id) => {
    const organization = await organizations_model_1.default.findById(_id);
    return organization;
};
/**
 * Update an organization
 * @param  {string} organizationId Id of the organization to update
 * @param  {object} organizationData Data to update
 * @param  {string=env.locale} locale
 * @returns Object with the updated organization
 */
const updateOrgById = async (organizationId, organizationData, locale = configs_1.env.locale) => {
    const updated = await organizations_model_1.default.findByIdAndUpdate(organizationId, organizationData, { new: true });
    if (!updated)
        throw new HttpException_1.HttpException(404, (0, i18n_1.__)({ phrase: 'Oganization not found', locale }));
    return updated;
};
exports.default = { createOrganization, deleteOrgById, getOrganizations, updateOrgById, getOrgById, editOrganization };
//# sourceMappingURL=organization.service.js.map