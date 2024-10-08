"use client";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaPaste } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import { SmallDialogue } from "./infoDialogue";

export function Label({
  text,
  htmlFor,
  helpInfo,
}: {
  text: string;
  htmlFor: string;
  helpInfo?: string;
}) {
  const [showHelp, setShowHelp] = useState(false);
  return (
    <label className="flex justify-between w-full" htmlFor={htmlFor}>
      <span className="font-semibold my-auto max-sm:text-[0.875rem]">
        {text}
      </span>
      <span
        onMouseEnter={() => setShowHelp(true)}
        onMouseLeave={() => setShowHelp(false)}
        className="cusor-pointer my-auto relative"
      >
        <AiOutlineInfoCircle size={"1.2rem"} className="text-grey/500" />
        {helpInfo && (
          <div
            className={
              (showHelp ? "flex" : "hidden") +
              " absolute bottom-[2rem] left-[-15rem] z-50 min-w-[30rem]"
            }
          >
            <SmallDialogue content={helpInfo} />
          </div>
        )}
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

export function SelectInput({
  errMsg,
  id,
  value,
  setValue,
  labelName,
  children,
  helpInfo,
}: {
  errMsg?: string;
  labelName: string;
  id: string;
  value?: string;
  setValue: Dispatch<SetStateAction<string>>;
  children: React.ReactNode;
  helpInfo?: string;
}) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isHoveredOver, setIsHoveredOver] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-2">
      <Label text={labelName} htmlFor={id} helpInfo={helpInfo} />
      <div
        className={
          (isHoveredOver ? "  border-primary/200 " : "") +
          (isActive ? " bg-primary/50 " : "") +
          " flex flex-row border rounded-lg"
        }
      >
        <select
          required
          className="flex w-full bg-transparent outline-none p-2 text-grey/800 font-semibold"
          id={id}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setIsActive(false)}
          onFocus={() => setIsActive(true)}
          onMouseEnter={() => setIsHoveredOver(true)}
          onMouseLeave={() => setIsHoveredOver(false)}
        >
          {children}
        </select>
      </div>
      <ErrSpan show={Boolean(errMsg)} text={errMsg || ""} />
    </div>
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
  labelName,
  className,
  disabled,
  helpInfo,
}: {
  type?: "default" | "link" | "paste";
  errMsg?: string;
  inputType?: string;
  labelName: string;
  id: string;
  placeholder?: string;
  value?: string | number;
  setValue: Dispatch<SetStateAction<any>>;
  className?: string;
  disabled?: boolean;
  helpInfo?: string;
}) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isHoveredOver, setIsHoveredOver] = useState<boolean>(false);

  const handlePasteClick = async () => {
    try {
      // Check if the clipboard API is available
      if (navigator.clipboard && navigator.clipboard.readText) {
        // Read text from the clipboard
        const text = await navigator.clipboard.readText();
        // Update the input value with the pasted text
        setValue(text);
      } else {
        alert("Clipboard API not supported in this browser");
      }
    } catch (err) {
      console.error("Failed to read clipboard contents:", err);
    }
  };

  return (
    <div className={(className ? className : "") + " flex flex-col gap-2"}>
      <Label text={labelName} htmlFor={id} helpInfo={helpInfo} />
      <div
        className={
          (isHoveredOver ? "  border-primary/200 " : "") +
          (isActive ? " bg-primary/50 " : "") +
          " flex flex-row border rounded-lg"
        }
      >
        {/* Checks Intended Input type and displays appropriate inpute prefix */}
        {type === "link" && (
          <span
            className={
              (isActive ? " border-primary/200 " : "") +
              "p-3 border-r mr-[0.5rem] pr-[0.5rem]"
            }
          >
            <span className="text-grey/800">https://</span>
          </span>
        )}

        <input
          required
          className="flex w-full bg-transparent outline-none placeholder-grey/300 p-2"
          placeholder={placeholder}
          id={id}
          value={value}
          type={inputType || "text"}
          disabled={disabled}
          onChange={(e) =>
            setValue(
              inputType === "number" ? Number(e.target.value) : e.target.value
            )
          }
          onBlur={() => setIsActive(false)}
          onFocus={() => setIsActive(true)}
          onMouseEnter={() => setIsHoveredOver(true)}
          onMouseLeave={() => setIsHoveredOver(false)}
        />

        {/* Checks the type to display appropriate surfix */}
        {type === "paste" && (
          <button
            onClick={handlePasteClick}
            type={"button"}
            className="flex gap-2 bg-secondary/700 rounded-md m-[0.3rem] py-[0.2rem] px-4"
          >
            <span className="flex my-auto">
              <FaPaste color="#fff" size={"1rem"} />
            </span>
            <span className="text-white font-semibold text-[0.875rem] flex my-auto">
              Paste
            </span>
          </button>
        )}
      </div>
      <ErrSpan show={Boolean(errMsg)} text={errMsg || ""} />
    </div>
  );
}

// Edit means there is an existing image or placeholder
export function ImageInput({
  labelText,
  id,
  setImage,
  helpInfo,
}: {
  id: string;
  labelText: string;
  setImage: Dispatch<any>;
  helpInfo?: string;
}) {
  const [preview, setPreview] = useState<any>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result;
      setImage(base64String);
    };
    if (file) {
      reader.readAsDataURL(file);
      setPreview(file);
    }
  };

  return (
    <div className="flex gap-2 flex-col">
      <Label text={labelText} htmlFor={id} helpInfo={helpInfo} />
      <label
        className="border-2 border border-dashed rounded-md flex max-xs:px-3 px-6 py-10 max-xs:gap-2 gap-4 justify-between"
        htmlFor={id}
      >
        {preview ? (
          <Image
            width={500}
            height={500}
            className="flex h-full object-fit"
            src={URL.createObjectURL(preview)}
            alt="Preview"
          />
        ) : (
          <>
            <div className="flex basis-1/4">
              <FiUploadCloud
                color="#A3A3A3"
                size={"2.5rem"}
                className="my-auto flex"
              />
            </div>
            <div className="flex basis-1/2">
              <div className="flex flex-col w-full">
                <span className="flex flex-nowrap mx-auto text-center text-grey/900 font-bold max-xs:text-[0.75rem] text-[0.875rem] text-nowrap">
                  Choose a file or drag and drop logo here
                </span>
                <span className="flex flex-nowrap mx-auto text-center text-grey/100 max-xs:text-[0.5rem] text-[0.75rem] text-nowrap">
                  SVG or png file not exceeding 3mb
                </span>
              </div>
            </div>
            <div className="flex basis-1/4"></div>
          </>
        )}
      </label>
      <input
        required
        id={id}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
