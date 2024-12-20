import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

type HomeSvgProps = SvgProps & {
  focused: boolean;
};

export const PersonSvg = ({focused, ...props}: HomeSvgProps) => (
  <Svg
    width={20}
    height={20}
    viewBox="-3 0 19 19"
    {...props}
    fill={focused ? '#FDFDFD' : '#B3BABE'}>
    <Path d="M12.517 12.834v1.9a1.27 1.27 0 0 1-1.267 1.267h-9.5a1.27 1.27 0 0 1-1.267-1.267v-1.9A3.176 3.176 0 0 1 3.65 9.667h5.7a3.176 3.176 0 0 1 3.167 3.167zM3.264 5.48A3.236 3.236 0 1 1 6.5 8.717a3.236 3.236 0 0 1-3.236-3.236z" />
  </Svg>
);
