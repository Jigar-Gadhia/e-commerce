import React from "react";
import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";

type IconName = keyof typeof LucideIcons;

interface IconProps extends LucideProps {
  name: IconName;
  size?: number;
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  name = "Filter",
  size = 20,
  className = "",
  ...props
}) => {
  const LucideIcon = LucideIcons[name] as React.ComponentType<LucideProps>;

  return (
    <LucideIcon
      size={size}
      className={className}
      {...props}
    />
  );
};

export default Icon;
