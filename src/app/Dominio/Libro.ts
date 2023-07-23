//Plantilla para mapear clase Libro (en Back-End)
export class Libro {
    //Exclamacion para asegurar a typescript que estos datos no seran nulos
    folio!: string;
    titulo!: string;
    autor!: string;
    editorial!: string;
    genero!: string;
    precio!: number;
    paginas!: number;
}
//Entidad dentro de servidor Spring (en Java)