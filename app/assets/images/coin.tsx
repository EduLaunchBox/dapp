export default function CoinSvg({
  className,
  color,
}: {
  className: string;
  color: string;
}) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.75 21C12.6495 21 15 16.9706 15 12C15 7.02944 12.6495 3 9.75 3C6.85051 3 4.5 7.02944 4.5 12C4.5 16.9706 6.85051 21 9.75 21Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.75 3H14.25C17.1497 3 19.5 7.03125 19.5 12C19.5 16.9688 17.1497 21 14.25 21H9.75"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.6641 6H18.1641"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 12H19.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.6641 18H18.1641"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
