import { StateType } from "@/store";
import { Input } from "@nextui-org/react";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const Header = (props: Props) => {
  const titleState = useSelector((state: StateType) => state.titleState);

  return (
    <header className="p-3 h-[48px] flex items-center border-b border-border">
      <div className="flex-1 flex items-center justify-between text-sm">
        <div className="flex gap-3 items-center truncate">
          <div className="flex items-center gap-2 px-2 hover:bg-accent p-1 rounded-sm cursor-pointer">
            <span className="truncate flex-1 overflow-hidden">
              {titleState.title}
            </span>
          </div>
          <span>Saved</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
