import { Moon, SunDim } from "phosphor-react";

import { useThemesColors } from "../hooks/useThemesColors";
import { Avatar } from "./Avatar";
import { Logo } from "./Logo";
import { NaviBar } from "./NaviBar";

export function Header() {
  const { theme, changeThemesColors } = useThemesColors();

  return (
    <div className="w-[100vw] h-[72px] bg-zinc-100 dark:bg-zinc-800 flex justify-center">
      <div className="w-full max-w-[1220px] h-[72px] px-[50px] absolute flex bg-zinc-100 dark:bg-zinc-800 justify-between items-center">
        <Logo />

        <NaviBar />

        <div className="hidden lg:flex lg:flex-row lg:items-center">
          <div className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-700"></div>

          <div className="w-8 h-8 rounded-full mx-4 hover:bg-zinc-200 hover:dark:bg-zinc-700 flex justify-center items-center">
            <button
              type="button"
              onClick={() => changeThemesColors()}
            >
              {theme === 'DARK' ? (
                <SunDim size={24} color="white" />
              ) : (
                <Moon size={24} color="#27272A" />
              )}
            </button>
          </div>

          <Avatar />
        </div>
      </div>
    </div>
  )
}