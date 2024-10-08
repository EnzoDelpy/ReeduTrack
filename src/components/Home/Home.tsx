import DatePicker from "../shared/DatePicker";
import ExerciceItem from "./ExerciceItem";
import TitleItem from "./TitleItem";
import React, { useState } from "react";

export default function Home() {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  type Item = {
    title: string;
    video_id: string;
    description: string;
    optional: boolean;
  };

  const itemsData: Item[] = [
    {
      title: "Fentes marchées",
      video_id: "kzDXFiKqwy8",
      description:
        "En position debout, faites un grand pas en avant avec une jambe, puis descendez en pliant les deux genoux jusqu'à ce que le genou arrière approche du sol, formant un angle de 90° avec le genou avant. Le torse reste droit et le genou avant ne dépasse pas les orteils. Poussez sur le talon avant pour revenir à la position initiale, puis alternez avec l'autre jambe. Cet exercice améliore également l'équilibre et peut être intensifié avec des haltères ou des fentes sautées. 4o",
      optional: true,
    },
    {
      title: "Fentes marchées",
      video_id: "kzDXFiKqwy8",
      description:
        "En position debout, faites un grand pas en avant avec une jambe, puis descendez en pliant les deux genoux jusqu'à ce que le genou arrière approche du sol, formant un angle de 90° avec le genou avant. Le torse reste droit et le genou avant ne dépasse pas les orteils. Poussez sur le talon avant pour revenir à la position initiale, puis alternez avec l'autre jambe. Cet exercice améliore également l'équilibre et peut être intensifié avec des haltères ou des fentes sautées. 4o",
      optional: false,
    },
    {
      title: "Fentes marchées",
      video_id: "kzDXFiKqwy8",
      description:
        "En position debout, faites un grand pas en avant avec une jambe, puis descendez en pliant les deux genoux jusqu'à ce que le genou arrière approche du sol, formant un angle de 90° avec le genou avant. Le torse reste droit et le genou avant ne dépasse pas les orteils. Poussez sur le talon avant pour revenir à la position initiale, puis alternez avec l'autre jambe. Cet exercice améliore également l'équilibre et peut être intensifié avec des haltères ou des fentes sautées. 4o",
      optional: false,
    },
  ];

  const sortedItemsData = itemsData.sort(
    (a, b) => Number(a.optional) - Number(b.optional)
  );

  let firstNotOptional = false;
  let firstOptional = false;

  return (
    <div className="max-w-[60rem] w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-[2rem]">Bonjour, Enzo!</h1>
        <DatePicker selectedDate={selectedDate} onDateChange={handleDateChange} />
      </div>
      {sortedItemsData.map((item, index) => {
        const shouldShowFirstNotOptional = !firstNotOptional && !item.optional;
        const shouldShowFirstOptional = !firstOptional && item.optional;

        if (!firstNotOptional && !item.optional) {
          firstNotOptional = true;
        } else if (!firstOptional && item.optional) {
          firstOptional = true;
        }

        return (
          <React.Fragment key={index}>
            {shouldShowFirstNotOptional && (
              <TitleItem color="bg-green-custom">À faire</TitleItem>
            )}
            {shouldShowFirstOptional && (
              <TitleItem color="bg-yellow-custom">Optionnel</TitleItem>
            )}

            <ExerciceItem
              title={item.title}
              description={item.description}
              video_id={item.video_id}
              id={index}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            ></ExerciceItem>
          </React.Fragment>
        );
      })}
      {
        sortedItemsData.length == 0 && <TitleItem color="bg-red-custom">Vous n'avez pas d'exercice pour ce jour</TitleItem>
      }
    </div>
  );
}
