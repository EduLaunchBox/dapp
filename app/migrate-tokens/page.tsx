"use client";
import SocialsForm from "../sections/forms/socialsForm";
import DeployForm from "../sections/forms/deployForm";
import VerifyOwnershipForm from "../sections/forms/verifyOwnershipForm";
import VerifyTokenDetailsForm from "../sections/forms/verifyTokendetailsFrom";

export default function MigrateTokens() {
  return (
    <section className="flex px-10 py-6 ">
      <div className="flex w-full flex-col gap-4">
        <h1 className="flex text-[1.75rem] text-grey/700 font-semibold">
          Migrate token to EDUCHAIN
        </h1>
        <div className="flex flex-col gap-6 mx-auto">
          <VerifyOwnershipForm />
          <VerifyTokenDetailsForm />
          <SocialsForm />
          <DeployForm />
        </div>
      </div>
    </section>
  );
}
