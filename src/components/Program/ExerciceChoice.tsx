import { useState } from "react";

export default function ExerciceChoice() {
  const exercices = [
    "Squat", "Fente sur une jambe", "Contraction sur le mur",
    "Burpees", "Gainage Quadri Lesté"
  ];

  const [selectedExercices, setSelectedExercices] = useState<string[]>([]);

  const handleExerciceClick = (exercice: string) => {
    if (selectedExercices.includes(exercice)) {
      setSelectedExercices(selectedExercices.filter(e => e !== exercice));
    } else {
      setSelectedExercices([...selectedExercices, exercice]);
    }
  };

  return (
    <div className="max-h-[400px] overflow-y-auto grid grid-cols-3 gap-4 p-4 bg-gray-300 border border-gray-300 rounded-lg">
      {exercices.map((exercice) => (
        <div
          key={exercice}
          onClick={() => handleExerciceClick(exercice)}
          className={`cursor-pointer rounded-lg h-20 px-4 flex items-center shadow-2xl border border-black transition-colors ${
            selectedExercices.includes(exercice) ? "bg-yellow-custom" : "bg-white"
          }`}
        >
          <span className="pl-2">{exercice}</span>
        </div>
      ))}
    </div>
  );
}
