import React from "react";

interface HoverableTextProps {
  targetBool: boolean;
  valueWhenNotHovered: string;
  valueWhenHovered: string;
}

const HoverableText: React.FC<HoverableTextProps> = ({
  targetBool,
  valueWhenNotHovered,
  valueWhenHovered,
}) => {
  return <span>{targetBool ? valueWhenHovered : valueWhenNotHovered}</span>;
};

export default HoverableText;
