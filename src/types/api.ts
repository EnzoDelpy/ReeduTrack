export interface User {
  id: number;
  Nom: string;
  Prenom: string;
  role: string;
  health_conditions_id: number;
  id_kine: number;
}

export interface Exercise {
  Nom_exo: string;
  description: string;
  Difficulte: string;
  video_link: string;
  id_exercice: number;
}

export interface UserExercise {
  id: number;
  user_id: number;
  exercice_id: number;
  date: Date;
  Optional: boolean;
  Checked: boolean;
}

export interface ExericeByUser {
  id_exercice: number;
  Nom_exo: string;
  description: string;
  date: Date;
  userId: number;
  checked: boolean;
  series: number;
  repetitions: number;
  optional: boolean;
  video_id: string;
}
