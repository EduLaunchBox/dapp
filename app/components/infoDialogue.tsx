export function SmallDialogue({ content }: { content: string }) {
  return (
    <div className="relative flex flex-col w-fit">
      <div className="flex w-fit px-2 py-3 rounded-lg bg-grey/50 shadow-lg">
        <span className="text-[0.875rem] text-wrap font-semibold text-grey/800 text-black leading-snug flex">
          {content}
        </span>
      </div>
      {/* Tooltip */}
      <div className="w-5 h-5 absolute left-1/2 bottom-[-0.5rem] rounded-md bg-grey/50 rotate-45"></div>
    </div>
  );
}
