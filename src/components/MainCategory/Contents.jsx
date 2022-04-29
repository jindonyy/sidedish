/* eslint-disable camelcase */
import React from 'react';
import styled from 'styled-components';
import Card from 'components/common/Card/Card';

export default function Contents({ sideDishes, setClickedCard, setCardHash }) {
  return (
    <Wrap>
      {sideDishes.map(({ detail_hash, image, title, description, s_price, n_price, badge, alt }) => (
        <Card
          key={detail_hash}
          id={detail_hash}
          setCardHash={setCardHash}
          setClickedCard={setClickedCard}
          size="LARGE"
          imageURL={image}
          title={title}
          desc={description}
          sellingPrice={s_price}
          normalPrice={n_price}
          tags={badge}
          alt={alt}
        />
      ))}
    </Wrap>
  );
}

const Wrap = styled.div({
  display: 'flex',
  gap: '24px',
  paddingTop: '34px'
});
