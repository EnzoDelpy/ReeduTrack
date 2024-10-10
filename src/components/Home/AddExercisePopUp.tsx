import React, { useState, useEffect } from "react";
import Combobox from "../shared/ComboBox";
import { motion, AnimatePresence } from "framer-motion";
import XMark from "../icons/XMark";
import { ComboBoxItem, ExerciseFormData } from "../../types/types";
import { getExercices } from "../../api/exercicesAPI";
import { Exercise } from "../../types/api";

interface AddExercisePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ExerciseFormData) => void;
}


const AddExercisePopup: React.FC<AddExercisePopupProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [selectedExercise, setSelectedExercise] = useState<ComboBoxItem | null>(
    null
  );
  const [isOptional, setIsOptional] = useState<boolean>(false);
  const [seriesCount, setSeriesCount] = useState<string>("");
  const [repsCount, setRepsCount] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [exercicesList, setExercicesList] = useState<ComboBoxItem[]>([]);

  // Fonction de validation des champs
  useEffect(() => {
    if (selectedExercise && seriesCount && repsCount) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [selectedExercise, seriesCount, repsCount]);

  useEffect(() => {
    const fetchExercices = async () => {
        setExercicesList([]);
        try {
          const patients = await getExercices();
          const newExercicesList = patients.map((exercice: Exercise) => {
            return { id: exercice.id_exercice, text: exercice.Nom_exo };
          });
          setExercicesList(newExercicesList);
        } catch (error) {
          console.error("Erreur lors de la récupération des exercices :", error);
      }
    };

    fetchExercices();
  }, []);

  useEffect(() => {
    if (isOpen) {
      setSelectedExercise(null);
      setIsOptional(false);
      setSeriesCount('');
      setRepsCount('');
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (isValid) {
      onSubmit({
        exercise: selectedExercise,
        isOptional,
        sets: parseInt(seriesCount, 10),
        reps: parseInt(repsCount, 10),
      });
      onClose(); // Fermer la popup après validation
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center lg:pl-[23.25rem] z-20"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg p-6 w-96 flex flex-col gap-8"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl">Ajouter un exercice</h2>
              <div className="cursor-pointer" onClick={onClose}>
                <XMark></XMark>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Combobox
                items={exercicesList}
                setSelectedItem={setSelectedExercise}
                border="border border-gray-custom"
              >
                exercice
              </Combobox>

              <label className="flex flex-col gap-1">
                Nombre de séries :
                <input
                  type="number"
                  value={seriesCount}
                  onChange={(e) => setSeriesCount(e.target.value)}
                  className="w-full rounded-lg px-4 py-2 bg-white h-12 flex items-center gap-[0.625rem] border border-gray-custom outline-none"
                />
              </label>

              <label className="flex flex-col gap-1">
                Nombre de répétitions :
                <input
                  type="number"
                  value={repsCount}
                  onChange={(e) => setRepsCount(e.target.value)}
                  className="w-full rounded-lg px-4 py-2 bg-white h-12 flex items-center gap-[0.625rem] border border-gray-custom outline-none"
                />
              </label>

              <label className="flex gap-3 items-center cursor-pointer w-fit">
               
                Exercice optionnel
                 <input type="checkbox" value="" className="sr-only peer" checked={isOptional} onChange={(e) => setIsOptional(e.target.checked)}/>
                <div className="relative w-11 h-6 bg-gray-200  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-custom"></div>
             
              </label>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!isValid}
              className={`px-4 py-2 bg-bg-color text-black rounded w-full transition-all ${
                !isValid ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-custom"
              }`}
            >
              Ajouter
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddExercisePopup;
