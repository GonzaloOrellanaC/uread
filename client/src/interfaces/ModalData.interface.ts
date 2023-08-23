import { Contenido } from "./Contenido.interface"
import { User } from "./User.interface"

export interface ModalData {
    open: boolean
    closeModal: () => void
    data?: Contenido | null
    user?: User | null
    getDataModal?: (data: {isAuth: boolean, user: User}) => void
    deleteUser?: (user: User) => void
}