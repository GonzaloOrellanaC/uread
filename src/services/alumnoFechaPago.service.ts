import alumnoFechaPagoModel from "@/models/alumno-fechapago.model"

export const pagosAlumno = async (alumnoId: string) => {
    const alumnoFechaPago = await alumnoFechaPagoModel.findOne({alumno: alumnoId})
    return alumnoFechaPago
}

export const actualizarPago = async (pagosId: string, fechaValidacion: Date) => {
    const obtenerPago = await alumnoFechaPagoModel.findById(pagosId)
    const pagoObj: any = {...obtenerPago.toJSON()}
    const fechasPagadas = [...pagoObj.fechasPagadas]
    fechasPagadas.push(fechaValidacion)
    const fechasPago = [...pagoObj.fechasPago]
    const nuevaFechaPago = new Date(pagoObj.fechasPago[pagoObj.fechasPago.length - 1]).getTime() + (((60000 * 60) * 24) * 30)
    fechasPago.push(new Date(nuevaFechaPago))
    const pagoAEditar = {
        ...obtenerPago.toJSON(),
        fechasPagadas,
        fechasPago
    }
    const pagoEditado = await alumnoFechaPagoModel.findByIdAndUpdate(pagoAEditar._id, pagoAEditar)
    return pagoEditado
}