import Label from "src/components/Label/Label";
import React from "react";

const FormItem = ({ children, className = "", label, desc }) => {
  return (
    <div className={className}>
      {label && <Label>{label}</Label>}
      <div className="mt-1.5">{children}</div>
      {desc && (
        <div className="block mt-3 text-xs text-neutral-500 dark:text-neutral-400 ">
          {desc}
        </div>
      )}
    </div>
  );
};

export default FormItem;
