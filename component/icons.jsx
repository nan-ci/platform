import { css } from '../lib/dom.js'

css(`
svg.icon {
  height: 2ch;
  margin: -0.5ch 0;
}
`)

const Icon = (d, props) => (rest) => (
  <svg class="icon" viewBox="0 0 24 24" {...props} {...rest}>
    <path d={d} />
  </svg>
)

export const Github = Icon(
  'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22',
  {
    'stroke-width': '2',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    stroke: 'currentColor',
    fill: 'none',
  },
)

export const Discord = Icon(
  'M13.914 14.58a8.998 8.998 0 0 1-.484.104 7.06 7.06 0 0 1-2.664-.01c-.154-.03-.372-.083-.653-.158l-.921 1.197c-2.273-.073-3.137-1.596-3.137-1.596 0-3.381 1.481-6.122 1.481-6.122 1.481-1.133 2.89-1.102 2.89-1.102l.403.525a1.12 1.12 0 0 1 .112-.01 8.527 8.527 0 0 1 2.314.01l.442-.525s1.41-.031 2.89 1.103c0 0 1.482 2.74 1.482 6.121 0 0-.875 1.522-3.148 1.596l-1.007-1.134zM10.076 11C9.475 11 9 11.45 9 12s.485 1 1.076 1c.6 0 1.075-.45 1.075-1 .01-.55-.474-1-1.075-1zm3.848 0c-.6 0-1.075.45-1.075 1s.485 1 1.075 1c.601 0 1.076-.45 1.076-1s-.475-1-1.076-1zM21 23l-4.99-5H19V4H5v14h11.003l.57 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v19z',
  { fill: 'currentColor' },
)

export const Location = ({ color, size, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill={color}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          style="fill:#61DE56;"
          d="M317.8,335.3c-5.7-0.3-11.1,2.1-14.099,6.901L256,416.6l-47.701-74.399
c-2.999-4.801-8.399-7.5-14.099-6.901C94.9,345.801,31,379.701,31,422c0,58.5,115.8,90,225,90s225-31.5,225-90
C481,379.701,417.1,345.801,317.8,335.3z"
        />
        <path
          style="fill:#13C37B;"
          d="M481,422c0,58.5-115.8,90-225,90v-95.4l47.701-74.399c2.999-4.801,8.399-7.202,14.099-6.901
C417.1,345.801,481,379.701,481,422z"
        />
        <path
          style="fill:#FD3018;"
          d="M256,0C166,0,91,72.599,91,165c0,35.099,10.499,66.599,30.901,96l121.5,191.6
c2.999,4.799,7.8,6.899,12.6,6.899c4.799,0,9.6-2.1,12.599-6.899l122.1-192.2c19.801-28.2,30.3-61.2,30.3-95.4
C421,74.099,346.901,0,256,0z M256,240c-41.355,0-75-33.645-75-75s33.645-75,75-75s75,33.645,75,75S297.355,240,256,240z"
        />
        <path
          style="fill:#E61E14;"
          d="M256,0v90l0,0c41.355,0,75,33.645,75,75s-33.645,75-75,75l0,0v219.5c4.799,0,9.6-2.1,12.599-6.899
L390.7,260.4c19.801-28.2,30.3-61.2,30.3-95.4C421,74.099,346.901,0,256,0z"
        />
      </g>
    </svg>
  )
}

export const Point = ({ color, size, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 426.667 426.667"
      fill={color}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M213.333,106.667c-58.88,0-106.667,47.787-106.667,106.667S154.453,320,213.333,320S320,272.213,320,213.333
				S272.213,106.667,213.333,106.667z"
        />
        <path
          d="M213.333,0C95.467,0,0,95.467,0,213.333s95.467,213.333,213.333,213.333S426.667,331.2,426.667,213.333
				S331.2,0,213.333,0z M213.333,384c-94.293,0-170.667-76.373-170.667-170.667S119.04,42.667,213.333,42.667
				S384,119.04,384,213.333S307.627,384,213.333,384z"
        />
      </g>
    </svg>
  )
}

export const Progress = ({ size, color, ...props }) => {
  return (
    <svg
      fill={color}
      height={size}
      viewBox="0 0 512 512"
      width={size}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="m122.912 391.28h-103.258c-8.284 0-15 6.716-15 15v90.72c0 8.284 6.716 15 15 15h118.259v-105.72c-.001-8.284-6.716-15-15.001-15z" />
        <path d="m271.171 307.28h-88.259c-8.284 0-15 6.716-15 15v189.72h118.259v-189.72c0-8.284-6.716-15-15-15z" />
        <path d="m477.798 81.01 30.23-32.81c4.04-4.38 5.1-10.73 2.71-16.18-2.39-5.46-7.78-8.98-13.74-8.98h-96.699v-8.04c0-8.28-6.71-15-15-15-8.28 0-15 6.72-15 15v175h-39.13c-8.284 0-15 6.716-15 15v307h120.809c8.29 0 15-6.72 15-15v-292c0-8.28-6.71-15-15-15h-36.679v-53.67h96.699c6.07 0 11.54-3.66 13.86-9.27s1.03-12.07-3.27-16.35z" />
        <path d="m254.552 128.785c3.681 7.422 12.679 10.454 20.102 6.774 7.422-3.681 10.455-12.681 6.774-20.103-27.194-54.837-24.443-49.309-24.838-50.054-2.819-5.326-8.619-8.542-14.796-7.902-.042.004-.085.013-.128.018-1.227.138 2.05-.505-54.764 11.451-8.107 1.706-13.295 9.661-11.59 17.768 1.487 7.065 7.72 11.914 14.663 11.914 2.088 0 .743.173 27.124-5.379-19.67 38.61-45.271 73.796-76.36 104.887-38.103 38.104-82.373 67.977-131.58 88.789-7.63 3.228-11.199 12.028-7.972 19.658 3.229 7.637 12.034 11.197 19.658 7.973 52.783-22.325 100.258-54.357 141.106-95.207 33.293-33.293 60.725-70.978 81.813-112.338z" />
      </g>
    </svg>
  )
}
