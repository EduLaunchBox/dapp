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
  const { formStep, verificationStep, tokenDetails } = useAppSelector(
    (state) => state.migrateToken
  );

  return (
    <section className="flex max-md:px-8 max-sm:px-6 max-xs:px-4 px-10 py-6 ">
      <div className="flex w-full flex-col gap-4">
        <h1 className="flex max-sm:text-[1.2rem] py-1 text-[1.75rem] text-grey/700 font-semibold">
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
            verificationNext={verificationNext}
            nextStep={nextStep}
            prevStep={verificationPrev}
            tokenDetails={tokenDetails}
          />
          <SocialsForm
            formStep={formStep}
            nextStep={nextStep}
            prevStep={prevStep}
            tokenDetails={tokenDetails}
            verificationPrev={verificationPrev}
          />
          <DeployForm
            formStep={formStep}
            nextStep={nextStep}
            prevStep={prevStep}
            tokenDetails={tokenDetails}
          />
          <AddLiquidityForm
            formStep={formStep}
            tokenAddress={tokenDetails?.contract}
          />
        </div>
      </div>
    </section>
  );
}
