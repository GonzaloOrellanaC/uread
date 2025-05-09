import { NextFunction, Response } from 'express'
import AccessControlServices from '@/services/accessControl.service'
import { CreateRoleDto } from '@/dtos/roles.dto'
import { RequestWithUser } from '@/interfaces/auth.interface'
import { Role } from '@/interfaces/roles.interface'

/**
 * Creates a new Role for an existing organization
 * @param  {Request} req http request arguments
 * @param  {Response} res http response arguments
 * @param  {NextFunction} next next matching route
 */
const createRole = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
/*         const rolesMatchs = Object.keys(req.body.resources).every(key => {
            return Object.keys(req.role.resources).includes(key)
        }) */

        const roleInfo: CreateRoleDto = req.body
        const newRole = await AccessControlServices.createRole(roleInfo)
        res.status(201).json({ data: newRole, message: 'created' })
    } catch (error) {
        next(error)
    }
}

/**
 * Creates a global role (a global role is not assigned to an organization)
 * @param  {Request} req http request arguments
 * @param  {Response} res http response arguments
 * @param  {NextFunction} next next matching route
 */
const createGlobalRole = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    /* try {
        const rolesMatchs = Object.keys(req.body.resources).every(key => {
            return Object.keys(req.role.resources).includes(key)
        })

        const roleInfo: CreateRoleDto = req.body
        const newRole = await AccessControlServices.createGlobalRole(roleInfo, rolesMatchs)
        res.status(201).json({ data: newRole, message: 'created' })
    } catch (error) {
        next(error)
    } */
}

/**
 * Get roles assigned to a specific organization
 * @param  {Request} req http request arguments
 * @param  {Response} res http response arguments
 * @param  {NextFunction} next next matching route
 */
const getRolesByOrg = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const findAllRoles: Role[] = await AccessControlServices.findRolesByOrg(req.body.organizationId)
        res.status(200).json({ data: findAllRoles, message: 'findRoles' })
    } catch (error) {
        next(error)
    }
}

const getRolesAdmin = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const findAllRoles: Role[] = await AccessControlServices.findRolesAdmin()
        res.status(200).json({ data: findAllRoles, message: 'findRoles' })
    } catch (error) {
        next(error)
    }
}

/**
 * Get all existing roles in the database
 * @param  {Request} req http request arguments
 * @param  {Response} res http response arguments
 * @param  {NextFunction} next next matching route
 */
const getAllRoles = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const findAllRoles: any[] = await AccessControlServices.findAllRoles()
        res.status(200).json({ data: findAllRoles, message: 'findRoles' })
    } catch (error) {
        next(error)
    }
}

/**
 * Get the roles of the user
 * @param  {Request} req http request arguments
 * @param  {Response} res http response arguments
 * @param  {NextFunction} next next matching route
 */
const getMyRoles = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const findMyRoles: Role[] = req.user.roles as Role[]
        res.status(200).json({ data: findMyRoles, message: 'findRoles' })
    } catch (error) {
        next(error)
    }
}

/**
 * Updates a specific role
 * @param  {Request} req http request arguments
 * @param  {Response} res http response arguments
 * @param  {NextFunction} next next matching route
 */
const updateRole = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const roleId = req.params.roleId
        const roleData = req.body
        const updatedRole: Role = await AccessControlServices.updateRoleById(roleId, roleData)
        res.status(200).json({ data: updatedRole, message: 'updated' })
    } catch (error) {
        next(error)
    }
}

/**
 * Delete a specific role
 * @param  {Request} req http request arguments
 * @param  {Response} res http response arguments
 * @param  {NextFunction} next next matching route
 */
const deleteRole = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const roleId = req.params.roleId
        const deletedRole: Role = await AccessControlServices.deleteRole(roleId)
        res.status(200).json({ data: deletedRole, message: 'deleted' })
    } catch (error) {
        next(error)
    }
}

export default { createRole, getRolesByOrg, getRolesAdmin, getAllRoles, updateRole, deleteRole, createGlobalRole, getMyRoles }
