export interface ComboBoxItem {
  id: string;
  text: string;
}

export interface ExerciseFormData {
  exercise: ComboBoxItem | null;
  isOptional: boolean;
  seriesCount: number;
  repsCount: number;
}

export type Item = {
  title: string;
  video_id: string;
  description: string;
  optional: boolean;
};