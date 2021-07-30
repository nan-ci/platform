const gen = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const TiretSvg = ({ colour }) => {
  return (
    <div>
      <svg
        width="100"
        height="50"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={`M 0 25 C ${gen(80, 20)} ${gen(30, 20)},${gen(80, 20)} ${gen(
            30,
            20,
          )},80 ${gen(30, 20)} L 100 25 `}
          stroke={colour}
          fill="transparent"
          stroke-width="2"
        />
      </svg>
    </div>
  )
}
