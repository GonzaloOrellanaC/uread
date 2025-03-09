import { Organization } from '../interfaces/roles.interface';
declare const _default: {
    createOrganization: (orgInfo: Organization, locale?: string) => Promise<Organization>;
    deleteOrgById: (organizationId: string, locale?: string) => Promise<Organization>;
    getOrganizations: () => Promise<Organization[]>;
    updateOrgById: (organizationId: string, organizationData: object, locale?: string) => Promise<Organization>;
    getOrgById: (_id: string) => Promise<Organization>;
    editOrganization: (orgInfo: Organization, locale?: string) => Promise<Organization>;
};
export default _default;
