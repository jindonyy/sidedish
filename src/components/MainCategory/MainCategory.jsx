import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Text from 'components/utils/Text';
import TabBar from 'components/MainCategory/Tab/TabBar';
import Contents from 'components/MainCategory/Contents';
import sideDishDummyData from './sideDishDummyData';

const MAIN_CATEGORY_TITLE = '한 번 주문하면 두 번 반하는 반찬';
const TAB_NAMES = ['정갈한 밑반찬', '뜨끈뜨끈 국물 요리', '든든한 메인 요리'];
const END_POINT = 'https://api.codesquad.kr/onban/';
const PATHs = ['main', 'soup', 'side'];

export default function MainCategory() {
  const [selectedTabNum, setSelectedTabNum] = useState(0);
  const [sideDishes, setSideDishes] = useState(sideDishDummyData);

  useEffect(() => {
    fetchCategoryData();
  }, []);

  return (
    <Wrap>
      <Title>
        <Label>기획전</Label>
        <Text size="40px" weight="BOLD" value={MAIN_CATEGORY_TITLE} />
      </Title>
      <TabBar tabNames={TAB_NAMES} selectedTabNum={selectedTabNum} setSelectedTabNum={setSelectedTabNum} />
      <Contents sideDishes={sideDishes[selectedTabNum] || []} />
    </Wrap>
  );

  function fetchCategoryData() {
    const URLs = PATHs.map(path => `${END_POINT}${path}`);
    const sideDishData = [];

    Promise.all(URLs.map(fetchRandomSideDish));

    function fetchRandomSideDish(URL) {
      fetch(URL)
        .then(res => res.json())
        .then(saveRandomSideDish)
        .then(() => setSideDishes(sideDishData), handleError);
    }

    function saveRandomSideDish(res) {
      const MAX_LENGTH = 3;
      const randomSideDish = extractRandomLenInArr(res.body, MAX_LENGTH);
      sideDishData.push(randomSideDish);
    }

    function extractRandomLenInArr(arr, length) {
      if (length > arr.length) {
        throw new Error('추출하는 길이보다 배열의 길이가 작습니다.');
      }
      const extractedSet = new Set();
      const arrLen = arr.length;
      while (extractedSet.size < length) {
        const idx = getRandomNumber(0, arrLen - 1);
        extractedSet.add(arr[idx]);
      }
      return Array.from(extractedSet);
    }

    function getRandomNumber(min, max) {
      return Math.floor(min + Math.random() * (max - min + 1));
    }

    function handleError(error) {
      setSideDishes([]);
      throw new Error(`${error}: 데이터를 성공적으로 불러오지 못했습니다.`);
    }
  }
}

const Wrap = styled.div({
  padding: '56px 80px'
});

const Title = styled.h2({
  display: 'flex',
  gap: '16px',
  marginBottom: '24px'
});

const Label = styled.div({
  padding: '0 16px',
  lineHeight: '42px',
  border: ({ theme }) => `2px solid ${theme.COLOR.BLACK[100]}`,
  fontSize: ({ theme }) => theme.FONT.SIZE.MEDIUM,
  borderRadius: '21px'
});
