import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

type HomeSvgProps = SvgProps & {
  focused: Boolean;
};

export const AddSvg = ({focused, ...props}: HomeSvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      stroke={focused ? '#FDFDFD' : '#B3BABE'}
      strokeWidth={1.5}
      strokeLinecap="round"
      d="M12.5008 4.79688L12.5008 19.1969M19.7008 11.9969L5.30078 11.9969"
    />
  </Svg>
);
