import ExerciceItem from "./ExerciceItem";
import TitleItem from "./TitleItem";
import { useState } from "react";

export default function Home() {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const itemData = [
    {
      title: "Fentes marchées",
      video_id: "xxLjUeVPYYk",
      description:
        "En position debout, faites un grand pas en avant avec une jambe, puis descendez en pliant les deux genoux jusqu'à ce que le genou arrière approche du sol, formant un angle de 90° avec le genou avant. Le torse reste droit et le genou avant ne dépasse pas les orteils. Poussez sur le talon avant pour revenir à la position initiale, puis alternez avec l'autre jambe. Cet exercice améliore également l'équilibre et peut être intensifié avec des haltères ou des fentes sautées. 4o",
    },
    {
      title: "Fentes marchées",
      video_id: "xxLjUeVPYYk",
      description:
        "En position debout, faites un grand pas en avant avec une jambe, puis descendez en pliant les deux genoux jusqu'à ce que le genou arrière approche du sol, formant un angle de 90° avec le genou avant. Le torse reste droit et le genou avant ne dépasse pas les orteils. Poussez sur le talon avant pour revenir à la position initiale, puis alternez avec l'autre jambe. Cet exercice améliore également l'équilibre et peut être intensifié avec des haltères ou des fentes sautées. 4o",
    },
    {
      title: "Fentes marchées",
      video_id: "xxLjUeVPYYk",
      description:
        "En position debout, faites un grand pas en avant avec une jambe, puis descendez en pliant les deux genoux jusqu'à ce que le genou arrière approche du sol, formant un angle de 90° avec le genou avant. Le torse reste droit et le genou avant ne dépasse pas les orteils. Poussez sur le talon avant pour revenir à la position initiale, puis alternez avec l'autre jambe. Cet exercice améliore également l'équilibre et peut être intensifié avec des haltères ou des fentes sautées. 4o",
    },
  ];

  return (
    <div className="max-w-[60rem] w-full flex flex-col gap-4">
      <h1 className="font-semibold text-[2rem]">Bonjour, Enzo!</h1>
      <TitleItem color="bg-green-custom">À faire</TitleItem>
      {itemData.map((item, index) => (
        <ExerciceItem
          key={index}
          title={item.title}
          description={item.description}
          video_id={item.video_id}
          id={index}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        ></ExerciceItem>
      ))}
      <TitleItem color="bg-yellow-custom">Optionnel</TitleItem>
    </div>
  );
}
