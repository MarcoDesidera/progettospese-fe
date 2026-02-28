import { CategorieDto } from "./categoria.dto";

export interface TransazioniDto {
  id: number;
  nome: string;
  descrizione: string;
  importo: number;
  dataTransazione: string; // ISO String dal backend (Instant)
  categoria?: CategorieDto; // La categoria può essere un oggetto semplice
  idContoCorrente: number;  // <--- IMPORTANTE: Solo l'ID, non l'intero oggetto!
}