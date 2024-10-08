import Title from "./Title";
import PatientChoice from "./PatientChoice"
import ExerciceChoice from "./ExerciceChoice"
import PeriodChoice from "./PeriodChoice"




export default function Program() {
  return <div className="max-w-[60rem] w-full flex flex-col gap-4">
    <h1 className="font-semibold text-[2rem]">Créez votre programme</h1>
    <Title color="bg-green-custom">Sélectionnez votre patient</Title>
    <PatientChoice></PatientChoice>
    <Title color="bg-yellow-custom">Ajoutez les exercices du programme</Title>
    <ExerciceChoice></ExerciceChoice>
    <Title color="bg-blue-custom">Sélectionnez la durée de ce programme</Title>
    <PeriodChoice></PeriodChoice>
  </div>;
}
  