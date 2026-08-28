export function TryThisArrow({
  color,
  background = "transparent",
}: {
  color: string;
  background?: string;
}) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 321.97367298414383 182.6879955147142"
      width="321.97367298414383"
      height="182.6879955147142"
    >
      <rect
        x="0"
        y="0"
        width="321.97367298414383"
        height="182.6879955147142"
        fill={background}
      ></rect>
      <g transform="translate(10 109.6879955147142) rotate(0 101.45513916015625 31.5)">
        <text
          x="0"
          y="44.40240000000001"
          fontFamily="Excalifont, Xiaolai, sans-serif, Segoe UI Emoji"
          fontSize="50.40000000000001px"
          fill={color}
          textAnchor="start"
          style={{ whiteSpace: "pre" } as React.CSSProperties}
          direction="ltr"
          dominantBaseline="alphabetic"
        >
          Try this
        </text>
      </g>
      <g strokeLinecap="round">
        <g transform="translate(220.29867952404948 139.6235046233387) rotate(0 35.77577063200374 -63.04804450612028)">
          <path
            d="M-0.42 1.1 C5.21 -2.07, 23.4 -10.19, 33.44 -19.84 C43.47 -29.48, 53.62 -45.65, 59.8 -56.78 C65.99 -67.92, 68.96 -74.93, 70.55 -86.64 C72.14 -98.35, 69.33 -120.47, 69.32 -127.04 M1.57 0.63 C7.01 -2.81, 22.57 -12.2, 32.19 -21.64 C41.82 -31.08, 52.88 -45.29, 59.34 -56.03 C65.79 -66.77, 68.95 -74.2, 70.92 -86.06 C72.89 -97.92, 71.55 -120.36, 71.16 -127.2"
            stroke={color}
            strokeWidth="4"
            fill="none"
          ></path>
        </g>
      </g>
      <mask></mask>
      <g strokeLinecap="round">
        <g transform="translate(289.1875684129386 13.17906017889436) rotate(0 -13.7455081279752 8.775314733469258)">
          <path
            d="M-0.52 -0.94 C-5.08 2.18, -23.52 15.46, -27.89 18.49 M1.41 1.19 C-3.27 3.98, -24.17 13.89, -28.9 16.74"
            stroke={color}
            strokeWidth="4"
            fill="none"
          ></path>
        </g>
      </g>
      <mask></mask>
      <g strokeLinecap="round">
        <g transform="translate(290.2986795240495 10.956837956672643) rotate(0 10.282331705572915 12.018459356047515)">
          <path
            d="M-1.11 0.06 C2.19 4.15, 15.81 19.66, 19.32 23.8 M0.51 -0.96 C4.24 3.34, 18.57 21.04, 21.67 24.99"
            stroke={color}
            strokeWidth="4"
            fill="none"
          ></path>
        </g>
      </g>
      <mask></mask>
    </svg>
  );
}
