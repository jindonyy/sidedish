import React from 'react';
import styled from 'styled-components';
import { SIZE, WEIGHT } from '../variable/font';
import COLOR from '../variable/color';

export default function Text(props) {
  const { size, weight, color, value } = props;
  return (
    <SPAN size={size} weight={weight} color={color}>
      {value}
    </SPAN>
  );
}

Text.defaultProps = {
  size: SIZE.BASE,
  weight: WEIGHT.REGULAR,
  color: COLOR.BLACK,
  value: '',
};

const SPAN = styled.span({
  'font-size': (props) => SIZE[props.size],
  'font-weight': (props) => WEIGHT[props.weight],
  color: (props) => COLOR[props.color],
});
