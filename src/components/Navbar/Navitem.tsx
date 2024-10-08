import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
  currentPage: string;
  setActiveTab: (tabName: string) => void;
  setIsCollapsed: (tabName: boolean) => void;
  page: string;
  route: string;
}

export default function Navitem({
  children,
  currentPage,
  setActiveTab,
  setIsCollapsed,
  page,
  route,
}: Props) {
  return (
    <li
      onClick={() => {
        setActiveTab(page);
        setIsCollapsed(false);
      }}
    >
      <Link
        to={route}
        className={
          "flex items-center rounded-lg w-full h-12 gap-3 px-4 hover:bg-bg-color transition-all cursor-pointer " +
          (currentPage == page ? "bg-bg-color font-semibold" : "")
        }
      >
        {children}
      </Link>
    </li>
  );
}
