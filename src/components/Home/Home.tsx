import ExerciceItem from "./ExerciceItem";
import TitleItem from "./TitleItem";

export default function Home() {
  return <div className="max-w-[60rem] w-full flex flex-col gap-4">
    <h1 className="font-semibold text-[2rem]">Bonjour, Enzo!</h1>
    <TitleItem color="bg-green-custom">À faire</TitleItem>
    <ExerciceItem></ExerciceItem>
    <TitleItem color="bg-yellow-custom">Optionnel</TitleItem>
  </div>;
}
