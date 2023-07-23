import { Libro } from './Libro'

//Plantilla para mapear clase Respuesta (en Back-End)
export class Respuesta {
    tipo!: string;
    mensaje!: string;
    obj!: any;
    valor !: number;
}