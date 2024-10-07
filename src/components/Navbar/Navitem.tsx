import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  currentPage: string;
  setActiveTab: (tabName: string) => void;
  page: string;
}

export default function Navitem({
  children,
  currentPage,
  setActiveTab,
  page,
}: Props) {
  return (
    <li
      className={
        "flex items-center rounded-lg w-full h-12 gap-3 px-4 hover:bg-bg-color transition-all cursor-pointer " +
        (currentPage == page ? "bg-bg-color font-semibold" : "")
      }
      onClick={() => setActiveTab(page)}
    >
      {children}
    </li>
  );
}
