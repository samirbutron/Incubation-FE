import { Farmaco } from "./Farmaco";

export class Farmacia {
    id !: number;
    ciudad !: String;
    colonia !: String;
    calle !: String;
    numero !: number;
    farmacos !: Farmaco[];
}