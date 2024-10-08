import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Badge({ children }: Props) {
  return (
    <div className="bg-gray-custom px-[0.375rem] py-1 text-white rounded-md">
      <span>{children}</span>
    </div>
  );
}
