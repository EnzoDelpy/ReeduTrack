import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    color: string;
  }

export default function TitleItem({children, color}: Props) {
  return (
    <div className={"w-full rounded-lg h-12 px-4 flex items-center " + color}>
      <span className="text-white">{children}</span>
    </div>
  );
}
