import { useState } from "react";

export default function PeriodeChoice() {

  const [startDate, setStartDate] = useState<string>(""); 
  const [endDate, setEndDate] = useState<string>("");     


  return (
    <div className="max-h-[400px] overflow-y-auto grid divide-x divide-black grid-cols-2 gap-8 p-4 bg-gray-300 border border-gray-300 rounded-lg">
      <div className="mt-4 pr-4">
        <label className="block mb-2 text-lg font-semibold">Date de début :</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border shadow-2xl rounded-lg px-3 py-2 mb-4 w-full"
        />
    </div>
    <div className="mt-4 pl-4">
        <label className="block mb-2 text-lg font-semibold">Date de fin :</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border shadow-2xl rounded-lg px-3 py-2 mb-4 w-full"
        />
      </div>
    </div>
  );
}
