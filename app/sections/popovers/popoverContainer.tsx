import React, { Dispatch, SetStateAction, useState } from "react";

export default function PopoverContainer({
  show,
  setShow,
  className,
  children,
  callback,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  className: string;
  children: React.ReactNode;
  callback?: any;
}) {
  const [canDisable, setCanDisable] = useState(false);

  return (
    <div
      onClick={() => {
        if (canDisable) {
          setShow(false);
          if (callback) callback();
        }
      }}
      className={
        (show ? "flex" : "hidden") +
        " fixed top-0 left-0 h-screen w-screen flex bg-black/20 justify-center overflow-none overscroll-none"
      }
    >
      <div
        onMouseEnter={() => setCanDisable(false)}
        onMouseLeave={() => setCanDisable(true)}
        className={className}
      >
        {children}
      </div>
    </div>
  );
}
