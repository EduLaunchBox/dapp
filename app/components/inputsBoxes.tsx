"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaPaste } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import { MdOutlineEast, MdOutlineSouthWest } from "react-icons/md";

function Label({ text, htmlFor }: { text: string; htmlFor: string }) {
  return (
    <label className="flex justify-between w-full" htmlFor={htmlFor}>
      <span className="font-semibold my-auto">{text}</span>
      <span className="cusor-pointer my-auto">
        <AiOutlineInfoCircle size={"1.2rem"} className="text-grey/500" />
      </span>
    </label>
  );
}

function ErrSpan({ text, show }: { text: string; show: boolean }) {
  return show ? (
    <span className="text-[0.875rem] -mt-2 text-grey/500">{text}</span>
  ) : (
    <></>
  );
}

export function Input({
  type,
  errMsg,
  id,
  placeholder,
  value,
  setValue,
  inputType,
}: {
  type?: "default" | "link" | "paste";
  errMsg?: string;
  inputType?: string;
  id: string;
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isHoveredOver, setIsHoveredOver] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-4">
      <Label text="Token Name" htmlFor="default" />
      <div
        className={
          (isHoveredOver ? "  border-primary/200 " : "") +
          (isActive ? " bg-primary/50 " : "") +
          " flex flex-row border rounded-lg"
        }
      >
        {/* Checks Intended Input type and displays appropriate inpute prefix */}
        {type === "link" ? (
          <span
            className={
              (isActive ? " border-primary/200 " : "") +
              "p-3 border-r mr-[0.5rem] pr-[0.5rem]"
            }
          >
            <span className="text-grey/800">https://</span>
          </span>
        ) : (
          <span className="p-3">
            <MdOutlineSouthWest size={"1.2rem"} />
          </span>
        )}

        <input
          className="flex w-full bg-transparent outline-none"
          placeholder={placeholder}
          id={id}
          value={value}
          type={inputType || "text"}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setIsActive(false)}
          onFocus={() => setIsActive(true)}
          onMouseEnter={() => setIsHoveredOver(true)}
          onMouseLeave={() => setIsHoveredOver(false)}
        />

        {/* Checks the type to display appropriate surfix */}
        {type === "paste" ? (
          <button className="flex gap-2 bg-secondary/700 rounded-md m-[0.3rem] py-2 px-4">
            <span>
              <FaPaste color="#fff" size={"1.2rem"} />
            </span>
            <span className="text-white font-semibold">Paste</span>
          </button>
        ) : (
          <span className="p-3">
            <MdOutlineEast size={"1.2rem"} className="text-grey/500" />
          </span>
        )}
      </div>
      <ErrSpan show={Boolean(errMsg)} text={errMsg || ""} />
    </div>
  );
}

// Edit means there is an existing image or placeholder
export function ImageInput({
  edit,
  labelText,
  id,
}: {
  edit: boolean;
  id: string;
  labelText: string;
}) {
  return (
    <div className="flex gap-2 flex-col">
      <Label text={labelText} htmlFor={id} />
      <label
        className="border-2 border border-dashed rounded-md flex p-4 gap-4 justify-between"
        htmlFor={id}
      >
        <div className="flex basis-1/4">
          <FiUploadCloud
            color="#A3A3A3"
            size={"2.5rem"}
            className="my-auto flex"
          />
        </div>
        <div className="flex basis-1/2">
          <div className="flex flex-col w-full">
            <span className="flex flex-nowrap mx-auto text-center text-grey/900 font-bold">
              Choose a file or drag and drop logo here
            </span>
            <span className="flex flex-nowrap mx-auto text-center text-grey/100 text-[0.875rem]">
              SVG or png file not exceeding 3mb
            </span>
          </div>
        </div>
        <div className="flex basis-1/4"></div>
      </label>
      <input id={id} type="file" className="hidden" />
    </div>
  );
}
