import { Farmacia } from "./Farmacia";

export class Farmaco {
    id !: number;
    nombre !: String;
    marca !: String;
    stock !: number;
    precio !: number;
    caducidad !: Date;
    farmacias !: Farmacia[];
}