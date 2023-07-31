import { FileHandel } from "./file-handel.model";

export interface Vestido {
    vestidoId: number,
    vestidoName: String,
    vestidoDescription: String,
    vestidoDiscountedPrice: number,
    vestidoActualPrice: number,
    vestidoImages: FileHandel[]
}