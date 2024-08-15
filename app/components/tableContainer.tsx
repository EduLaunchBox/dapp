import { IoCheckmark } from "react-icons/io5";

export default function TableContainer({
  children,
  className,
  title,
}: {
  children?: React.ReactNode;
  className?: string;
  title: string;
}) {
  return (
    <form className={"flex w-full p-[0.2rem] rounded-3xl bg-grey/50"}>
      <div className="border border-primary/100 shadow-inner shadow-grey/50 rounded-3xl w-full flex flex-col bg-gradient-to-b from-primary/100/70 from-5% via-primary/100/50 via-10% to-white to-20%">
        <div className="flex gap-8 border-b border-primary/100 px-6 py-4 rounded-t-3xl">
          <span className="mx-auto font-bold text-primary/500 text-[1.2rem]">
            {title}
          </span>
        </div>
        <div className={className}>{children}</div>
      </div>
    </form>
  );
}
