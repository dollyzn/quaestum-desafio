import React, { HTMLAttributes } from "react";

interface HTMLSkeletonElement {
  className?: string;
}

const Skeleton: React.FC<HTMLAttributes<HTMLSkeletonElement>> = (props) => {
  const hasHeightClass = /h-\d+/.test(props.className || "");
  const hasWidthClass = /w-\d+/.test(props.className || "");

  const defaultClasses = [];
  if (!hasHeightClass) {
    defaultClasses.push("h-3");
  }
  if (!hasWidthClass) {
    defaultClasses.push("w-5");
  }

  return (
    <div
      className={`bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse ${
        props.className || ""
      } ${defaultClasses.join(" ")}`}
    />
  );
};

export default Skeleton;
