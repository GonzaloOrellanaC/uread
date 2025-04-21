/// <reference types="mongoose" />
export declare const pagosAlumno: (alumnoId: string) => Promise<import("mongoose").Document<any, any, any>>;
export declare const actualizarPago: (pagosId: string, fechaValidacion: Date) => Promise<import("mongoose").Document<any, any, any>>;
