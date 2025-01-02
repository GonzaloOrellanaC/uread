import { User } from "../interfaces/User.interface"

const init = () => {
    const indexedDb: IDBFactory = window.indexedDB
    const conexion = indexedDb.open('UserDataUread', 1)
    return new Promise<any>(resolve => {
        conexion.onsuccess = () =>{
            let db: IDBDatabase = conexion.result
            resolve(
                {
                    message: "Base de datos abierta",
                    database: db,
                    error: null,
                    state: 'abierta'
                }
            )
        }
    
        conexion.onupgradeneeded = (e) =>{
            let db = (e.target as IDBOpenDBRequest).result
            const coleccionObjetos = db.createObjectStore('User',{
                keyPath: 'id'
            })
            coleccionObjetos.transaction.oncomplete = (event) => {
                resolve(
                    {
                        message: "Base de datos creada / actualizada",
                        database: db,
                        error: null,
                        state: 'actualizada'
                    }
                )
            }
            
        }
    
        conexion.onerror = (error) =>{
            resolve(
                {
                    message: "Error",
                    error: error,
                    state: 'error'
                }
            )
        }
    })
}

const update = (data: User, database: IDBDatabase) => {
    return new Promise<any>(resolve => {
        try {
            const trasaccion = database.transaction(['User'],'readwrite')
            const coleccionObjetos = trasaccion.objectStore('User')
            const conexion = coleccionObjetos.put({
                id: data._id,
                name: data.name,
                lastName: data.lastName,
                roles: data.roles
            })

            conexion.onsuccess = (ev) =>{
                resolve({
                    data: ev,
                    state: true,
                    err: null
                })
            }

            conexion.onerror = (ev) =>{
                resolve({
                    data: ev,
                    state: false,
                    err: null
                })
            }

        } catch (err) {
            resolve({
                err: err,
                state: false
            })
        }
    }) 
}

const deleteDb = (clave: string | number, database: IDBDatabase) =>{      
    return new Promise(resolve => {
        const trasaccion = database.transaction(['User'],'readwrite')
        const coleccionObjetos = trasaccion.objectStore('User')
        const conexion = coleccionObjetos.delete(clave)

        conexion.onsuccess = (ev) =>{
            resolve({
                data: ev,
                state: true
            })
        }

        conexion.onerror = (ev) =>{
            resolve({
                data: ev,
                state: false
            })
        }
    })
}

const readById = (id: string, database: IDBDatabase) => {
    return new Promise<{data?: User, state: boolean, error: any}>(resolve => {
        const trasaccion = database.transaction(['User'],'readonly')
        const coleccionObjetos = trasaccion.objectStore('User')
        const conexion = coleccionObjetos.openCursor()
    
        conexion.onsuccess = () =>{
            const objectResponse: IDBRequest = coleccionObjetos.get(id)
            objectResponse.onsuccess = (ev) => {
                resolve({
                    data: (ev.target as IDBRequest).result,
                    state: (id.length > 1) ? true : false,
                    error: null
                })
            }
            objectResponse.onerror = (err) => {
                resolve({
                    error: err,
                    state: false
                })
            }
        }
    
        conexion.onerror = (err) =>{
            resolve({
                error: err,
                state: false
            })
        }
    })
}


const readAll = (database: IDBDatabase) => {
    return new Promise<any>(resolve => {
        const trasaccion = database.transaction(['User'],'readonly')
        const coleccionObjetos = trasaccion.objectStore('User')
        const conexion = coleccionObjetos.openCursor()
    
        conexion.onsuccess = () =>{
            const allObject: IDBRequest = coleccionObjetos.getAll()
            allObject.onsuccess = (ev) => {
                resolve({
                    data: (ev.target as IDBRequest).result,
                    state: true,
                    error: null
                })
            }
            allObject.onerror = (err) => {
                resolve({
                    error: err,
                    state: false
                })
            }
        }
    
        conexion.onerror = (err) =>{
            resolve({
                error: err,
                state: false
            })
        }
    })
}

export default {
    init,
    update,
    deleteDb,
    readById,
    readAll
}