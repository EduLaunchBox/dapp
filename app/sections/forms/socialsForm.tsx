"use client";
import { Button } from "@/app/components/buttons";
import FormContainer from "@/app/components/formContainer";
import { Input, ImageInput } from "@/app/components/inputsBoxes";
import { useState } from "react";

export default function SocialsForm() {
  const [twitterUrl, setTwitterUrl] = useState("");

  return (
    <FormContainer className="flex w-full p-6 flex-col gap-4" currentState={1}>
      <ImageInput labelText={"Token Logo"} id={"tokenName"} />

      <Input
        labelName={"Project Twitter URL"}
        id={"xUrl"}
        placeholder={"Enter X Url"}
        value={twitterUrl}
        setValue={setTwitterUrl}
      />

      <div className="flex justify-between pt-4 gap-6">
        <Button text={"Previous"} arrow={"backward"} />
        <Button text={"Next"} color="green" arrow={"forward"} />
      </div>
    </FormContainer>
  );
}
