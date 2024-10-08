import React, { useState } from "react";
import ChevronUp from "../icons/ChevronUp";

type CustomCalendarProps = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
};

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const [currentYear, setCurrentYear] = useState<number>(
    selectedDate.getFullYear()
  );
  const [currentMonth, setCurrentMonth] = useState<number>(
    selectedDate.getMonth()
  );

  // Obtenir le premier jour du mois (1er jour)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  let firstDayIndex = firstDayOfMonth.getDay() - 1;
  if (firstDayIndex === -1) firstDayIndex = 6; // Ajustement pour commencer par lundi

  // Obtenir le nombre de jours dans le mois
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Générer les jours du mois
  const generateCalendarDays = () => {
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentYear, currentMonth, i));
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  // Gérer la sélection d'un jour
  const handleDayClick = (date: Date) => {
    onDateChange(date);
  };

  // Changer de mois
  const handleMonthChange = (offset: number) => {
    const newMonth = currentMonth + offset;
    if (newMonth < 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else if (newMonth > 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(newMonth);
    }
  };

  // Sélectionner la date d'aujourd'hui
  const handleTodayClick = () => {
    const today = new Date();
    onDateChange(today);
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  return (
    <>
      {/* En-tête pour la sélection du mois */}
      <div className="month-year flex justify-between items-center mb-4">
        <div
          className="h-8 w-8 bg-bg-color rounded-md flex items-center justify-center hover:bg-gray-custom cursor-pointer transition-all"
          onClick={() => handleMonthChange(-1)}
        >
          <div className="-rotate-90 scale-[0.60]">
            <ChevronUp></ChevronUp>
          </div>
        </div>
        <span className="font-semibold text-lg">
          {months[currentMonth]} {currentYear}
        </span>
        <div
          className="h-8 w-8 bg-bg-color rounded-md flex items-center justify-center hover:bg-gray-custom cursor-pointer transition-all"
          onClick={() => handleMonthChange(1)}
        >
          <div className="rotate-90 scale-[0.60]">
            <ChevronUp></ChevronUp>
          </div>
        </div>
      </div>

      {/* Jours de la semaine */}
      <div className="weekdays grid grid-cols-7 gap-1 text-center font-bold mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="weekday aspect-square flex items-center justify-center"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Jours du mois */}
      <div className="days grid grid-cols-7 gap-1">
        {/* Espace pour les jours avant le 1er du mois */}
        {Array(firstDayIndex)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="empty-day p-2"></div>
          ))}
        {/* Jours du mois */}
        {calendarDays.map((day) => (
          <div
            key={day.getDate()}
            onClick={() => handleDayClick(day)}
            className={`day cursor-pointer rounded aspect-square w-full flex items-center justify-center transition-all ${
              day.toDateString() === selectedDate.toDateString()
                ? "bg-gray-custom"
                : "hover:bg-bg-color"
            }`}
          >
            {day.getDate()}
          </div>
        ))}
      </div>

      {/* Bouton "Aujourd'hui" */}
      <div className="mt-4 text-center">
        <button
          onClick={handleTodayClick}
          className="px-4 py-2 bg-bg-color text-black rounded hover:bg-gray-custom w-full transition-all"
        >
          Aujourd'hui
        </button>
      </div>
    </>
  );
};

export default CustomCalendar;
