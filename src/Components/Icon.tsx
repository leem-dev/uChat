import React from "react";
import { IconType } from "react-icons";

type IconProps = {
  IconName: IconType;
  size?: number;
  className?: string;
  loading?: boolean;
  ping?: boolean;
  reduceOpacityOnHover?: boolean;
  onClick?: () => void;
};

function Icon({
  IconName,
  className,
  loading,
  onClick,
  ping,
  reduceOpacityOnHover,
  size,
}: IconProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`p-3 rounded-full cursor-pointer hover:bg-myBlue ${
        reduceOpacityOnHover
          ? "hover:bg-opacity-30"
          : "bg-myBlue text-white border-2 border-white hover:drop-shadow-lg"
      }
      ${loading && "cursor-wait"} ${className}`}
    >
      {loading ? "Loading" : <IconName size={size} />}
    </button>
  );
}

export default Icon;
