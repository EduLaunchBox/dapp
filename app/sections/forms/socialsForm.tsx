"use client";
import { Button } from "@/app/components/buttons";
import FormContainer from "@/app/components/formContainer";
import { Input, ImageInput } from "@/app/components/inputsBoxes";
import { useAppDispatch } from "@/app/store/hooks";
import { useState } from "react";

export default function SocialsForm({
  formStep,
  nextStep,
  prevStep,
}: {
  formStep: number;
  nextStep: any;
  prevStep: any;
}) {
  const [twitterUrl, setTwitterUrl] = useState("");
  const dispatch = useAppDispatch();

  const handleNext = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(nextStep());
  };

  const handlePrev = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(prevStep());
  };

  return (
    <FormContainer
      stateToShow={2}
      className="flex w-full p-6 flex-col gap-4"
      currentState={formStep}
    >
      <ImageInput labelText={"Token Logo"} id={"tokenName"} />

      <Input
        labelName={"Project Twitter URL"}
        id={"xUrl"}
        placeholder={"Enter X Url"}
        value={twitterUrl}
        setValue={setTwitterUrl}
      />

      <div className="flex justify-between pt-4 gap-6">
        <Button onclick={handlePrev} text={"Previous"} arrow={"backward"} />
        <Button
          onclick={handleNext}
          text={"Next"}
          color="green"
          arrow={"forward"}
        />
      </div>
    </FormContainer>
  );
}
