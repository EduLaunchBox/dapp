"use client";
import { Button } from "@/app/components/buttons";
import FormContainer from "@/app/components/formContainer";
import { Input, ImageInput } from "@/app/components/inputsBoxes";
import { useAppDispatch } from "@/app/store/hooks";
import { TokenDetails } from "@/app/types";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useState } from "react";
import Swal from "sweetalert2";

export default function SocialsForm({
  formStep,
  nextStep,
  prevStep,
  tokenDetails,
  verificationPrev,
}: {
  formStep: number;
  nextStep: ActionCreatorWithPayload<TokenDetails, any>;
  prevStep: any;
  verificationPrev?: any;
  tokenDetails: TokenDetails;
}) {
  const [logo, setLogo] = useState<any>();
  const [twitterUrl, setTwitterUrl] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const dispatch = useAppDispatch();

  const handleNext = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    // Verifications
    let errorMessage = "";
    if (!logo) errorMessage = "Please add a logo for your token";
    if (!twitterUrl)
      errorMessage = "Please provide an X(formerly Twitter) url.";

    if (errorMessage !== "") {
      Swal.fire({
        title: "Error!!",
        text: errorMessage,
        icon: "error",
        cancelButtonText: "Okay",
      });
      setErrMsg(errorMessage);
      return;
    }

    dispatch(nextStep({ ...tokenDetails, xUrl: twitterUrl, logo }));
  };

  const handlePrev = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(prevStep());
    if (verificationPrev) dispatch(verificationPrev());
  };

  return (
    <FormContainer
      stateToShow={2}
      className="flex w-full max-sm:p-4 p-6 flex-col gap-4"
      currentState={formStep}
    >
      <ImageInput
        setImage={setLogo}
        labelText={"Token Logo"}
        id={`tokenName-${formStep}`}
        helpInfo="Upload a logo that represents your token. Recommended dimensions: 128x128 pixels in PNG format for optimal display across platforms."
      />

      <Input
        labelName={"Project Twitter URL"}
        id={"xUrl"}
        placeholder={"Enter X Url"}
        value={twitterUrl}
        setValue={setTwitterUrl}
        helpInfo="Provide your project’s official Twitter URL. This helps with verification and allows users to follow your project’s updates easily."
      />

      <div className="flex justify-between max-sm:pt-0 pt-4 gap-6">
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
