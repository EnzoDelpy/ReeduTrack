import DatePicker from "../shared/DatePicker";

import ExerciceItem from "./ExerciceItem";
import TitleItem from "./TitleItem";
import React, { useEffect, useState } from "react";
import ComboBox from "../shared/ComboBox.tsx";
import { motion } from "framer-motion";
import AddExercisePopup from "./AddExercisePopUp.tsx";
import { ComboBoxItem, ExerciseFormData } from "../../types/types.ts";
import { getUsers } from "../../api/userApi.ts";
import { ExericeByUser, User } from "../../types/api.ts";
import {
  createUserExercise,
  getUserExercice,
} from "../../api/userExerciceAPI.ts";

export default function Home() {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedUser, setSelectedUser] = useState<ComboBoxItem | null>(null); // Utilisateur sélectionné
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [usersList, setUsersList] = useState<ComboBoxItem[]>([]);
  const [exercisesList, setExercisesList] = useState<ExericeByUser[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const role = localStorage.getItem("userRole");
  const firstName = localStorage.getItem("userFirstName");
  const userId = localStorage.getItem("userId");

  const handleAddExercise = async (exerciseData: ExerciseFormData) => {
    console.log("Exercice ajouté :", exerciseData);
    console.log(exerciseData);

    let user_id;

    if (role === "KINE" && selectedUser) {
      user_id = selectedUser.id;
    } else if (role === "USER") {
      user_id = userId;
    } else {
      //erreur
      return;
    }

    if (exerciseData.exercise && user_id) {
      const date = formatDate(selectedDate);

      console.log("series " + exerciseData.sets);

      const newUserExercice = {
        user_id: Number(user_id),
        exercice_id: Number(exerciseData.exercise.id),
        date: date,
        Optional: exerciseData.isOptional,
        Checked: false,
        series: exerciseData.sets,
        repetitions: exerciseData.reps,
      };
      try {
        const response = await createUserExercise(newUserExercice);
        setIsSubmitted(true);
        console.log("UserExercice créé avec succès:", response);
      } catch (error) {
        console.error("Erreur lors de la création du UserExercice:", error);
      }
    }
  };

  React.useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
      }, 2000);
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [isSubmitted]);

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  useEffect(() => {
    const fetchPatients = async () => {
      if (role === "KINE" && userId) {
        setUsersList([]);
        try {
          const patients = await getUsers({ id_kine: userId });
          const newUsersList = patients.map((patient: User) => {
            return { id: patient.id, text: `${patient.Prenom} ${patient.Nom}` };
          });
          setUsersList(newUsersList);
        } catch (error) {
          console.error("Erreur lors de la récupération des patients :", error);
        }
      }
    };

    fetchPatients();
  }, [role, userId]);

  useEffect(() => {
    const fetchExercises = async () => {
      if (role === "USER" && selectedDate && userId) {
        try {
          const date = formatDate(selectedDate);
          const exercises = await getUserExercice(
            { exercise_date: date },
            Number(userId)
          );
          const sortedExercises = exercises.sort(
            (a: ExericeByUser, b: ExericeByUser) =>
              Number(a.optional) - Number(b.optional)
          );
          setExercisesList(sortedExercises);
          //const newUsersList = patients.map((patient: User) => {return {id: patient.id, text: `${patient.Prenom} ${patient.Nom}`}});
          //setUsersList(newUsersList)
        } catch (error) {
          setExercisesList([]);
          console.error(
            "Erreur lors de la récupération des exercices :",
            error
          );
        }
      }

      if (role === "KINE" && selectedDate && selectedUser) {
        if (selectedUser.id) {
          try {
            const date = formatDate(selectedDate);
            const exercises = await getUserExercice(
              { exercise_date: date },
              Number(selectedUser.id)
            );
            const sortedExercises = exercises.sort(
              (a: ExericeByUser, b: ExericeByUser) =>
                Number(a.optional) - Number(b.optional)
            );
            setExercisesList(sortedExercises);
            //const newUsersList = patients.map((patient: User) => {return {id: patient.id, text: `${patient.Prenom} ${patient.Nom}`}});
            //setUsersList(newUsersList)
          } catch (error) {
            setExercisesList([]);
            console.error(
              "Erreur lors de la récupération des exercices :",
              error
            );
          }
        }
      }
    };

    fetchExercises();
  }, [selectedDate, selectedUser, isSubmitted]);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Les mois commencent à 0, donc on ajoute 1
    const day = String(date.getDate()).padStart(2, "0"); // On formate le jour avec deux chiffres

    return `${year}-${month}-${day}`;
  };

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
            {exercisesList.map((exercise, index) => {
              const shouldShowFirstNotOptional =
                !firstNotOptional && !exercise.optional;
              const shouldShowFirstOptional =
                !firstOptional && exercise.optional;

              console.log(exercise);

              if (!firstNotOptional && !exercise.optional) {
                firstNotOptional = true;
              } else if (!firstOptional && exercise.optional) {
                firstOptional = true;
              }

              return (
                <React.Fragment key={`${selectedDate}${index}`}>
                  {shouldShowFirstNotOptional && (
                    <TitleItem color="bg-green-custom">À faire</TitleItem>
                  )}
                  {shouldShowFirstOptional && (
                    <TitleItem color="bg-yellow-custom">Optionnel</TitleItem>
                  )}

                  <ExerciceItem
                    title={exercise.Nom_exo}
                    description={exercise.description}
                    video_id={exercise.video_id}
                    id={index}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                    sets={exercise.series}
                    reps={exercise.repetitions}
                  ></ExerciceItem>
                </React.Fragment>
              );
            })}
            {exercisesList.length == 0 && (
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
