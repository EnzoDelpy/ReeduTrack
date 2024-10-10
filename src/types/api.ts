export interface User {
    id: number;
    Nom: string;
    Prenom: string;
    role: string;
    health_conditions_id: number;
    "id_kine": number,
  }
  
export interface Exercise{
    Nom_exo: string,
    description: string,
    Difficulte: string,
    video_link: string,
    id_exercice: number
}