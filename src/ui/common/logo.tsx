export function Logo(): JSX.Element {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_18_31)">
        <path
          d="M-9.15527e-05 27.2323L39.2156 159.329L53.4758 176.4L70.5881 185.342C70.5881 185.342 84.1354 185.342 94.8306 176.4C105.526 167.459 109.804 159.329 109.804 159.329L70.5881 27.2323H-9.15527e-05Z"
          className="fill-zinc-700 dark:fill-zinc-400"
        />
        <g filter="url(#filter0_d_18_31)">
          <path
            d="M131.551 160.142L200 0H131.551L68.0927 139.413L68.0439 139.512C62.5013 150.742 52.6884 170.623 39.5722 160.142C75.508 232.328 115.865 190.22 131.551 160.142Z"
            className="fill-zinc-500 dark:fill-zinc-200"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_18_31"
          x="14.5723"
          y="-21"
          width="210.428"
          height="250"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="12.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_18_31"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_18_31"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
