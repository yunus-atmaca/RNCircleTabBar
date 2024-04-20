import React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export default function Discover({color, ...props}: SvgProps) {
  return (
    <Svg width="26" height="26" viewBox="0 0 26 26" fill="none" {...props}>
      <Path
        d="M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z"
        stroke={color}
        strokeWidth="1.51416"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.0765 9.98468L17 9L16.0153 13.9235C15.8041 14.9791 14.9791 15.8041 13.9235 16.0153L9 17L9.98468 12.0765C10.1958 11.0209 11.0209 10.1958 12.0765 9.98468Z"
        stroke={color}
        strokeWidth="1.51416"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
