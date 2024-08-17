import AddLiquidityForm from "@/app/sections/forms/addLiquidityForm";

export default function AddLiquidityPage() {
  return (
    <section className="flex max-md:px-8 max-sm:px-6 max-xs:px-4 px-10 py-6 ">
      <div className="flex w-full flex-col gap-4">
        <div>
          <h1 className="flex max-sm:text-[1.2rem] py-1 text-[1.75rem] text-grey/700 font-semibold">
            Add Liquidity
          </h1>
          <div></div>
        </div>

        <div className="flex flex-col gap-6 mx-auto">
          <AddLiquidityForm formStep={-1} />
        </div>
      </div>
    </section>
  );
}
