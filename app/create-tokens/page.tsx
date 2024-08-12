"use client";
import TokenDetailsForm from "../sections/forms/tokenDetailsForm";
import SocialsForm from "../sections/forms/socialsForm";
import DeployForm from "../sections/forms/deployForm";
import AddLiquidityForm from "../sections/forms/addLiquidityForm";
import { useAppSelector } from "../store/hooks";
import { nextStep, prevStep } from "../store/slice/createToken";

export default function CreateTokens() {
  const { formStep } = useAppSelector((state) => state.createToken);

  return (
    <section className="flex px-10 py-6 ">
      <div className="flex w-full flex-col gap-4">
        <h1 className="flex text-[1.75rem] text-grey/700 font-semibold">
          Create/Deploy token on EDUCHAIN
        </h1>
        <div className="flex flex-col gap-6 mx-auto">
          <TokenDetailsForm formStep={formStep} nextStep={nextStep} />
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
