import { useState } from "react";

export default function PatientChoice() {

    const patients = [
    "Pierre Araure", "Albert Sautin", "Dimitri Griache",
    "Sofiane El-Otmani", "Victor Delcourt", "André Andrezieux",
    "Pascal Vichere", "Loann Formal", "Cassandre Belgien",
    "Alice Larisse"
  ];

  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  const handlePatientClick = (patient: string) => {
    setSelectedPatient(selectedPatient === patient ? null : patient);
  };

  return (
    <div className="max-h-[400px] overflow-y-auto grid grid-cols-3 gap-4 p-4 bg-gray-300 border border-gray-300 rounded-lg">
      {patients.map((patient) => (
        <div
          key={patient}
          onClick={() => handlePatientClick(patient)}
          className={`cursor-pointer rounded-lg h-20 px-4 flex items-center shadow-2xl border border-black transition-colors ${
            selectedPatient === patient ? "bg-green-custom" : "bg-white"
          }`}
        >
          <span className="pl-2">{patient}</span>
        </div>
      ))}
    </div>
  );
}
