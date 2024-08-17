export default function BannerContainer({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="flex w-full max-sm:h-fit h-52 banner-complex-background rounded-3xl">
      <div className="flex w-full h-full banner-complex-background-100 rounded-3xl">
        <div className="flex w-full h-full banner-complex-background-200 rounded-3xl">
          <div className="flex w-full h-full banner-complex-background-300 rounded-3xl">
            <div className="flex w-full h-full banner-complex-background-image-layer rounded-3xl">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
