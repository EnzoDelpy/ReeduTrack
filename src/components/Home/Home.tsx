import DatePicker from "../shared/DatePicker";

import ExerciceItem from "./ExerciceItem";
import TitleItem from "./TitleItem";
import React, { useEffect, useState } from "react";
import ComboBox from "../shared/ComboBox.tsx";
import { motion } from "framer-motion";
import AddExercisePopup from "./AddExercisePopUp.tsx";
import { ComboBoxItem, ExerciseFormData, Item } from "../../types/types.ts";
import { getUsers } from "../../api/userApi.ts";
import { User } from "../../types/api.ts";

export default function Home() {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedUser, setSelectedUser] = useState<ComboBoxItem | null>(null); // Utilisateur sélectionné
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [usersList, setUsersList] = useState<ComboBoxItem[]>([]);
  const role = localStorage.getItem("userRole");
  const firstName = localStorage.getItem("userFirstName");
  const userId = localStorage.getItem("userId");

  const handleAddExercise = (exerciseData: ExerciseFormData) => {
    console.log("Exercice ajouté :", exerciseData);
    // Logique pour ajouter l'exercice à la liste
  };

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  useEffect(() => {
    const fetchPatients = async () => {
      if (role === "KINE" && userId) {
        setUsersList([])
        try {
          const patients = await getUsers({ id_kine: userId });
          console.log(userId);
          console.log(patients);
          const newUsersList = patients.map((patient: User) => {return {id: patient.id, text: `${patient.Prenom} ${patient.Nom}`}});
          setUsersList(newUsersList)
        } catch (error) {
          console.error('Erreur lors de la récupération des patients :', error);
        }
      }
    };

    fetchPatients();
  }, [role, userId]);

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
    <>
      <div className="max-w-[60rem] w-full flex flex-col gap-4">
        <div
          className={`flex justify-between ${
            role == "KINE" ? "flex-col items-start gap-4" : "items-center"
          }`}
        >
          <motion.h1
            initial={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.5 }}
            className="font-semibold text-[2rem]"
          >
            {`Bonjour, ${firstName}!`}
          </motion.h1>
          {role == "KINE" ? (
            <motion.div
              initial={{ opacity: 0, translateY: -10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-between w-full z-10"
            >
              <ComboBox items={usersList} setSelectedItem={setSelectedUser}>
                patient
              </ComboBox>
              <DatePicker
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, translateY: -10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="z-10"
            >
              <DatePicker
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
              />
            </motion.div>
          )}
        </div>
        {((role == "KINE" && selectedUser != null) || role == "USER") && (
          <motion.div
            initial={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.5, delay: role == "KINE" ? 0 : 0.3 }}
            className="flex flex-col gap-4"
          >
            {sortedItemsData.map((item, index) => {
              const shouldShowFirstNotOptional =
                !firstNotOptional && !item.optional;
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
            {sortedItemsData.length == 0 && (
              <TitleItem color="bg-red-custom">
                {role == "USER"
                  ? "Vous n'avez pas d'exercice pour ce jour"
                  : "Pas d'exercice pour ce jour"}
              </TitleItem>
            )}
            {role == "KINE" && (
              <div
                className="bg-white rounded-lg h-12 flex items-center px-4 py-1 w-fit self-center hover:bg-gray-custom cursor-pointer"
                onClick={() => setIsPopupOpen(true)}
              >
                <span className="h-min">Ajouter un exercice</span>
              </div>
            )}
          </motion.div>
        )}
      </div>
      {role == "KINE" && selectedUser != null && (
        <AddExercisePopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSubmit={handleAddExercise}
        />
      )}
    </>
  );
}
