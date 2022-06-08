import { List } from "phosphor-react";

import { useThemesColors } from "../../hooks/useThemesColors";
import { NaviItem } from "./NaviItem";

export function NaviBar() {
  const { theme } = useThemesColors();

  return (
    <>
      <div className="hidden lg:flex lg:flex-row">
        <NaviItem />
        <NaviItem />
        <NaviItem />
      </div>
      <div className="lg:hidden justify-end items-center hover:bg-zinc-700 hover:dark:bg-zinc-200">
        <List size={24} color={theme === 'DARK' ? 'white' : "#27272A"} />
      </div>
    </>
  )
}