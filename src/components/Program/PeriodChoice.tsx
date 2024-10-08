import { useState } from "react";

export default function PeriodeChoice() {

  const [startDate, setStartDate] = useState<string>(""); 
  const [endDate, setEndDate] = useState<string>("");     


  return (
    <div>
      <div className="mt-4">
        <label className="block mb-2 text-lg font-semibold">Date de début :</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded-lg px-3 py-2 mb-4 w-full"
        />

        <label className="block mb-2 text-lg font-semibold">Date de fin :</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded-lg px-3 py-2 mb-4 w-full"
        />
      </div>
    </div>
  );
}
