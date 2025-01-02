import { Contenido } from "../interfaces/Contenido.interface"

const initContentDB = () => {
    const indexedDb: IDBFactory = window.indexedDB
    const conexion = indexedDb.open('Contenidos', 1)
    return new Promise<{message: string,
        database?: IDBDatabase,
        error?: any
        state: boolean}>(resolve => {
        conexion.onsuccess = () =>{
            let db: IDBDatabase = conexion.result
            resolve(
                {
                    message: "Base de datos abierta",
                    database: db,
                    error: null,
                    state: true
                }
            )
        }
    
        conexion.onupgradeneeded = (e) =>{
            let db = (e.target as IDBOpenDBRequest).result
            const coleccionObjetos = db.createObjectStore('Contenido',{
                keyPath: 'idContenido'
            })
            coleccionObjetos.transaction.oncomplete = (event) => {
                resolve(
                    {
                        message: "Base de datos creada / actualizada",
                        database: db,
                        error: null,
                        state: true
                    }
                )
            }
            
        }
    
        conexion.onerror = (error) =>{
            resolve(
                {
                    message: "Error",
                    error: error,
                    state: false
                }
            )
        }
    })
}

export const updateContentIndexedDB = (data: Contenido) => {
    return new Promise<{
        data: any,
        state: boolean,
        err?: any
    }>(async resolve => {
        try {
            const response = await initContentDB()
            if (response && response.database) {
                const trasaccion = response.database.transaction(['Contenido'],'readwrite')
                const coleccionObjetos = trasaccion.objectStore('Contenido')
                const conexion = coleccionObjetos.put(data)

                conexion.onsuccess = (ev: any) =>{
                    resolve({
                        data: ev,
                        state: true,
                        err: null
                    })
                }

                conexion.onerror = (ev: any) =>{
                    resolve({
                        data: ev,
                        state: false,
                        err: null
                    })
                }
            } else {
                resolve({
                    data: null,
                    state: false,
                    err: {
                        msg: 'Error'
                    }
                })
            }

        } catch (err) {
            resolve({
                err: err,
                state: false,
                data: null
            })
        }
    }) 
}