import React, { useState, useRef, useEffect } from "react";
import CustomCalendar from "./CustomCalendar";
import ChevronUp from "../icons/ChevronUp";
import { motion, AnimatePresence } from "framer-motion";

type DatePickerProps = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
};

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [calendarPosition, setCalendarPosition] = useState<{
    left: string;
    right: string;
  }>({ left: "0", right: "auto" });
  const datePickerRef = useRef<HTMLDivElement | null>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  // Calculer la position du calendrier lorsqu'il s'ouvre
  useEffect(() => {
    if (isOpen && datePickerRef.current && calendarRef.current) {
      const datePickerRect = datePickerRef.current.getBoundingClientRect();
      const calendarRect = calendarRef.current.getBoundingClientRect();

      // Si le calendrier dépasse à droite, on ajuste
      if (datePickerRect.left + calendarRect.width > window.innerWidth) {
        setCalendarPosition({ left: "auto", right: "0" });
      } else {
        setCalendarPosition({ left: "0", right: "auto" });
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node) &&
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleDateChange = (date: Date) => {
    onDateChange(date);
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    setIsOpen(!isOpen);
  };

  // Date du jour
  const today = new Date();
  const isToday = (day: Date) => {
    return (
      day.getDate() === today.getDate() &&
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div
      ref={datePickerRef}
      className="relative h-12 px-3 py-1 bg-white rounded-lg"
    >
      <div onClick={handleInputFocus} className="cursor-pointer flex items-center gap-[0.625rem] h-full">
        <div className="h-8 w-8 bg-bg-color rounded-md flex items-center justify-center">
          <div className="rotate-180 scale-[0.60]">
            <ChevronUp></ChevronUp>
          </div>
        </div>
        <span className="h-min">{isToday(selectedDate) ? "Aujourd'hui" : selectedDate.toLocaleDateString("fr-FR")}</span>
      </div>
      <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.1 }}
          className="absolute bg-white p-[0.625rem] z-10 w-80 left-0 right-auto top-[calc(100%_+_0.375rem)] overflow-auto rounded-lg"
          style={calendarPosition}
          ref={calendarRef}
          onMouseDown={(e) => e.preventDefault()} // Empêche la fermeture lors de l'interaction avec le calendrier
        >
          <CustomCalendar
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
          />
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};

export default DatePicker;
