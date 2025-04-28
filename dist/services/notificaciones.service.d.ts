/// <reference types="mongoose" />
export declare const crearNotificacion: (not: any) => Promise<import("mongoose").Document<any, any, any>>;
export declare const editNotification: (not: any) => Promise<import("mongoose").Document<any, any, any>>;
export declare const findNotificationsByUser: (userId: string, skip: number, limit: number) => Promise<import("mongoose").Document<any, any, any>[]>;
export declare const leerNotificaciones: (query?: any) => Promise<import("mongoose").Document<any, any, any>[]>;
export declare const leerUltimaNotificacionPagoPendiente: (userId: string, alumnoId: string) => Promise<import("mongoose").Document<any, any, any>>;
