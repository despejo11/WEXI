import { StylesConfig } from 'react-select'

import { TOption } from './types'

export const customStyles: StylesConfig<TOption> = {
  control: (provided, state) => ({
    ...provided,
    width: 'clamp(9.313rem, 7.563rem + 8.75vw, 11.938rem)',
    paddingInline: '22px',
    borderRadius: '25px',
    color: '#111110',
    transition: 'all 0.3s ease',
    backgroundColor: '#f8fffd',
    boxShadow: 'none',
    border: state.isFocused ? '2px solid #aee05e' : '2px solid #919291',
    ':hover': {
      border: state.isFocused ? '2px solid #aee05e' : '2px solid #919291',
    },
    cursor: 'text',
  }),

  placeholder: (provided) => ({
    ...provided,
    color: '#c2c2c2',
  }),

  singleValue: (provided) => ({
    ...provided,
    cursor: 'pointer',
    fontSize: '11px',
    color: '#111110',
    paddingBlock: '4px',
    paddingInline: '12px',
    borderRadius: '25px',
    backgroundColor: '#c9fd74',
    ':hover': {
      backgroundColor: '#c9fd74',
    },
    ':active': {
      backgroundColor: '#c9fd74',
    },
  }),

  menu: (provided) => ({
    ...provided,
    borderRadius: '25px',
    padding: '13px 20px 13px 20px',
    border: '2px solid #919291',
    boxShadow: 'none',
    backgroundSize: 'cover',
    backgroundImage:
      "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='200' height='200' preserveAspectRatio='none' viewBox='0 0 200 200'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1115%26quot%3b)' fill='none'%3e%3crect width='200' height='200' x='0' y='0' fill='rgba(42%2c 43%2c 41%2c 1)'%3e%3c/rect%3e%3cpath d='M0%2c90.302C16.626%2c87.555%2c22.239%2c65.767%2c36.559%2c56.886C51.253%2c47.773%2c74.079%2c52.556%2c83.855%2c38.295C93.539%2c24.167%2c87.901%2c4.584%2c83.812%2c-12.05C80.007%2c-27.529%2c70.392%2c-40.037%2c61.369%2c-53.177C51.173%2c-68.025%2c43.915%2c-86.341%2c27.582%2c-93.935C10.499%2c-101.878%2c-10.12%2c-101.177%2c-27.786%2c-94.632C-44.927%2c-88.282%2c-57.987%2c-74.142%2c-67.679%2c-58.644C-76.465%2c-44.595%2c-77.66%2c-27.905%2c-79.794%2c-11.473C-81.899%2c4.731%2c-86.397%2c21.5%2c-80.044%2c36.555C-73.623%2c51.772%2c-58.956%2c61.195%2c-45.244%2c70.402C-31.283%2c79.776%2c-16.591%2c93.043%2c0%2c90.302' fill='%23222221'%3e%3c/path%3e%3cpath d='M200 261.835C216.143 261.139 230.822 276.57 246.36 272.13800000000003 262.814 267.445 277.79200000000003 254.246 283.346 238.063 288.819 222.115 279.591 205.413 274.80899999999997 189.244 270.69 175.317 266.94100000000003 161.211 257.382 150.278 247.849 139.375 234.546 133.453 221.171 127.897 206.33 121.731 190.535 110.816 175.4 116.22 160.22899999999998 121.637 157.143 141.579 147.25 154.292 138.03 166.14 122.278 173.686 119.239 188.388 116.164 203.263 126.154 217.081 131.317 231.36599999999999 136.985 247.047 135.755 269.49 150.997 276.251 166.883 283.298 182.637 262.584 200 261.835' fill='%23323431'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1115'%3e%3crect width='200' height='200' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e\")",
  }),

  option: (provided) => ({
    ...provided,
    cursor: 'pointer',
    fontSize: '14px',
    color: '#111110',
    borderRadius: '25px',
    marginTop: '12px',
    marginBottom: '12px',
    backgroundColor: '#c9fd74',
    ':hover': {
      backgroundColor: '#c9fd74',
    },
    ':active': {
      backgroundColor: '#c9fd74',
    },
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    cursor: 'pointer',
    color: '#2a2b29',
    ':hover': {
      color: '#2a2b29',
    },
    ':active': {
      color: '#2a2b29',
    },
  }),

  clearIndicator: (provided) => ({
    ...provided,
    cursor: 'pointer',
    color: '#2a2b29',
    ':hover': {
      color: '#2a2b29',
    },
    ':active': {
      color: '#2a2b29',
    },
  }),

  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: '#2a2b29',
    width: '2px',
    borderRadius: '25px',
  }),

  noOptionsMessage: (provided) => ({
    ...provided,
    color: '#d2d2d280',
    textTransform: 'uppercase',
    fontSize: '13px',
  }),
}
