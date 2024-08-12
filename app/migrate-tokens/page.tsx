"use client";
import SocialsForm from "../sections/forms/socialsForm";
import DeployForm from "../sections/forms/deployForm";
import VerifyOwnershipForm from "../sections/forms/verifyOwnershipForm";
import VerifyTokenDetailsForm from "../sections/forms/verifyTokendetailsFrom";
import AddLiquidityForm from "../sections/forms/addLiquidityForm";
import { useAppSelector } from "../store/hooks";
import {
  nextStep,
  prevStep,
  verificationNext,
  verificationPrev,
} from "../store/slice/migrateToken";

export default function MigrateTokens() {
  const { formStep, verificationStep } = useAppSelector(
    (state) => state.migrateToken
  );

  return (
    <section className="flex px-10 py-6 ">
      <div className="flex w-full flex-col gap-4">
        <h1 className="flex text-[1.75rem] text-grey/700 font-semibold">
          Migrate token to EDUCHAIN
        </h1>
        <div className="flex flex-col gap-6 mx-auto">
          <VerifyOwnershipForm
            formStep={formStep}
            verificationStep={verificationStep}
            verificationNext={verificationNext}
          />
          <VerifyTokenDetailsForm
            formStep={formStep}
            verificationStep={verificationStep}
            nextStep={nextStep}
            prevStep={verificationPrev}
          />
          <SocialsForm
            formStep={formStep}
            nextStep={nextStep}
            prevStep={prevStep}
          />
          <DeployForm
            formStep={formStep}
            nextStep={nextStep}
            prevStep={prevStep}
          />
          <AddLiquidityForm formStep={formStep} />
        </div>
      </div>
    </section>
  );
}
