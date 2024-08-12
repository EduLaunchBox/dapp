"use client";
import TokenDetailsForm from "../sections/forms/tokenDetailsForm";
import SocialsForm from "../sections/forms/socialsForm";
import DeployForm from "../sections/forms/deployForm";

export default function CreateTokens() {
  return (
    <section className="flex px-10 py-6 ">
      <div className="flex w-full flex-col gap-4">
        <h1 className="flex text-[1.75rem] text-grey/700 font-semibold">
          Create/Deploy token on EDUCHAIN
        </h1>
        <div className="flex flex-col gap-6 mx-auto">
          <TokenDetailsForm />
          <SocialsForm />
          <DeployForm />
        </div>
      </div>
    </section>
  );
}
