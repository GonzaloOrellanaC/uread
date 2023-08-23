import { Organization } from '../interfaces/roles.interface';
export declare class CreateRoleDto {
    name: string;
    organizationId?: Organization;
    resources: object;
    description: string;
}
export declare class CreateGlobalRoleDto {
    name: string;
    resources: object;
    description: string;
}
export declare class UpdateRoleDto {
    name: string;
    resources: object;
    description: string;
}
