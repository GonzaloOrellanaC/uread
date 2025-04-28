import notificacionesModel from "@/models/notificaciones.model"

export const crearNotificacion = async (not: any) => {
    const response = await notificacionesModel.create(not)
    return response
}

export const editNotification = async (not: any) => {
    const response = await notificacionesModel.findByIdAndUpdate(not._id, not)
    return response
}

export const findNotificationsByUser = async (userId: string, skip: number, limit: number) => {
    const response = await notificacionesModel.find({user: userId}).sort({_id: -1}).skip(skip).limit(limit).populate('metadata.alumno')
    return response
}

export const leerNotificaciones = async (query: any = {}) => {
    const response = await notificacionesModel.find(query).populate('user')
    return response
}

export const leerUltimaNotificacionPagoPendiente = async (userId: string, alumnoId: string) => {
    const response = await notificacionesModel.find({idType: 'recordatorio_pago', user: userId, 'metadata.alumno': alumnoId}).sort({_id:-1}).limit(1)
    if (response.length > 0) {
        return response[0]
    } else {
        return null
    }
}