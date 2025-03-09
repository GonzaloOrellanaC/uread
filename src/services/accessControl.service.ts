import { AccessControl } from 'accesscontrol'
import bcrypt from 'bcrypt'
import { __ } from 'i18n'
import { ObjectId } from 'mongoose'
import { User } from '@/interfaces/users.interface'
import userModel from '@/models/users.model'
import { isEmpty } from '@/utils/util'
import { env } from '@/configs'
import { HttpException } from '@/exceptions/HttpException'
import RoleModel from '@/models/roles.model'
import { superAdmin, admin, user/* , seller */ } from '@/configs/roles.config'
import { CreateRoleDto, UpdateRoleDto } from '@/dtos/roles.dto'
import { Role } from '@interfaces/roles.interface'

const ac = new AccessControl()

const initAccessControl = async () => {
    try {
        const findRole = await RoleModel.findOne({ name: superAdmin.name })
        let adminResult = ''
        if (!findRole) {
            await createRole(superAdmin)
            await createRole(admin)
            await createRole(user)
            adminResult = 'Super admin Role created'
        }
        console.info(`Initialized access control. ${adminResult}`)
        
    } catch (error) {
        console.error(error)
    }
}

const createRole = async (role: any): Promise<Role> => {
    try {
        const newRole = new RoleModel({
            name: role.name,
        })
        await newRole.save()
        return newRole
    } catch (error) {
        // Add error message to be sent
        throw new Error(error.message)
    }
}

/* const createRole = async (
    roleInfo: CreateRoleDto,
    org: string,
    rolesMatchs: boolean,
    locale: string = env.locale
): Promise<Role> => {
    if (rolesMatchs) {
        const organizationFound = await organizationModel.findById(org)
        try {
            const newRole = RoleModel.create({
                name: roleInfo.name,
                organizationId: org,
                resources: roleInfo.resources,
                description: roleInfo.description
            })
            await updateAccessControl()
            return newRole
        } catch (error) {
            if (organizationFound) {
                throw new HttpException(
                    409,
                    __(
                        { phrase: 'Role {{role}} already exists for organization {{organization}}', locale },
                        { role: roleInfo.name, organization: organizationFound.name }
                    )
                )
            } else {
                throw new HttpException(409, __({ phrase: 'Could not find organization', locale }))
            }
        }
    } else throw new HttpException(409, __({ phrase: 'You do not have permission to create that role', locale }))
} */

const createGlobalRole = async (
    roleInfo: CreateRoleDto,
    rolesMatchs: boolean,
    locale: string = env.locale
): Promise<Role> => {
    if (rolesMatchs) {
        try {
            const newRole = RoleModel.create({
                name: roleInfo.name,
                resources: roleInfo.resources,
                description: roleInfo.description
            })
            await updateAccessControl()
            return newRole
        } catch (error) {
            throw new HttpException(409, __({ phrase: 'Role already exists', locale }))
        }
    } else throw new HttpException(409, __({ phrase: 'You do not have permission to create that role', locale }))
}

const updateSuperAdmin = async (roleId: ObjectId, newResources: object) => {
    try {
        const updated = await RoleModel.findByIdAndUpdate(roleId, { resources: newResources }, { new: true })
        if (!updated) {
            throw new Error()
        }
        await updateAccessControl()
        return updated
    } catch (error) {
        // Add error message to be sent
        throw new Error(error.message)
    }
}

const createRoleAdmin = async (roleInfo: CreateRoleDto): Promise<Role> => {
    try {
        const findAdmin = await userModel.findOne({ email: env.email })

        const newRole = new RoleModel({
            name: roleInfo.name,
            resources: roleInfo.resources,
        })
        await newRole.save()
        findAdmin.roles.push(newRole._id)
        findAdmin.save()
        await updateAccessControl()
        return newRole
    } catch (error) {
        // Add error message to be sent
        throw new Error(error.message)
    }
}

const createRoleSeller = async (roleInfo: CreateRoleDto): Promise<Role> => {
    try {
        const newRole = new RoleModel({
            name: roleInfo.name,
            resources: roleInfo.resources
        })
        await newRole.save()
        await updateAccessControl()
        return newRole
    } catch (error) {
        // Add error message to be sent
        throw new Error(error.message)
    }
}

const updateAccessControl = async () => {
    const parsedRoles = {}
    ac.setGrants(parsedRoles)
    return 'Access Control updated'
}

const check = (role: ObjectId, resource: string, type: string) => {
    const typeResponses = {
        createAny: ac.can(role.toString()).createAny(resource),
        readAny: ac.can(role.toString()).readAny(resource),
        updateAny: ac.can(role.toString()).updateAny(resource),
        deleteAny: ac.can(role.toString()).deleteAny(resource),
        createOwn: ac.can(role.toString()).createOwn(resource),
        readOwn: ac.can(role.toString()).readOwn(resource),
        updateOwn: ac.can(role.toString()).updateOwn(resource),
        deleteOwn: ac.can(role.toString()).deleteOwn(resource)
    }
    console.log(typeResponses)
    if (!Object.keys(typeResponses).includes(type)) return ac.can(role.toString()).readAny('NONRESOURCE')
    return typeResponses[type]
}

const createSuperAdmin = async (): Promise<User> => {
    const hashedPassword = await bcrypt.hash(env.password, 10)
    const user: User = await userModel.findOneAndUpdate(
        { email: env.email },
        {
            $setOnInsert: {
                name: env.name,
                ...(!isEmpty(env.lastName) && { lastName: env.lastName }),
                email: env.email,
                run: env.run,
                password: hashedPassword,
                state: true,
                idUser: 1
            }
        },
        { new: true, upsert: true }
    )
    return user
}

const updateRole = async (roleInfo: Role, locale: string = env.locale) => {
    const updated = await RoleModel.findByIdAndUpdate(
        roleInfo._id,
        {
            name: roleInfo.name,
            /* resources: roleInfo.resources,
            description: roleInfo.description */
        },
        { new: true }
    )
    if (!updated) throw new HttpException(409, __({ phrase: 'Role not found', locale }))
    await updateAccessControl()
    return updated
}

const deleteRole = async (roleId: string, locale: string = env.locale) => {
    const deleted = await RoleModel.findByIdAndDelete(roleId)
    if (!deleted) throw new HttpException(409, __({ phrase: 'Role not found', locale }))
    await updateAccessControl()
    return deleted
}

const findRolesByOrg = async (orgId: ObjectId): Promise<Role[]> => {
    const roles: Role[] = await RoleModel.find({ organizationId: orgId })
    return roles
}

const findRolesAdmin = async (): Promise<Role[]> => {
    const roles: Role[] = await RoleModel.find({ $or : [{ name: 'SuperAdmin' }, { name: 'seller' }] })
    return roles
}

const findAllRoles = async (): Promise<Role[]> => {
    const roles: Role[] = await RoleModel.find()
    return roles
}

const updateRoleById = async (roleId: string, roleData: UpdateRoleDto, locale: string = env.locale): Promise<Role> => {
    const updated = await RoleModel.findByIdAndUpdate(roleId, roleData, { new: true })
    if (!updated) throw new HttpException(404, __({ phrase: 'Role not found', locale }))
    await updateAccessControl()
    return updated
}

export default {
    ac,
    check,
    createSuperAdmin,
    initAccessControl,
    updateAccessControl,
    createRole,
    createGlobalRole,
    updateRole,
    deleteRole,
    findRolesByOrg,
    findRolesAdmin,
    findAllRoles,
    updateRoleById
}
