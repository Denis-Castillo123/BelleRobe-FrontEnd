export interface Product{
    idVestido: number;
    nombreVestido: string;
    descripcion: string;
    valoracion: string;
    precio: number;
    imagen: string;
    idTipo: {
      idDireccion: number;
      tipo: string;
    };
}