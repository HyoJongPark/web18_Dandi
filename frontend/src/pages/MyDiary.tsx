import NavBar from '@components/Common/NavBar';
import KeywordSearch from '@components/MyDiary/KeywordSearch';
import ViewType from '@components/MyDiary/ViewType';
import { useEffect, useState } from 'react';
import DiaryListItem from '@components/Common/DiaryListItem';
import { IDiaryContent } from '@type/components/Common/DiaryList';
import { viewTypes } from '@type/pages/MyDiary';
import DateController from '@components/MyDiary/DateController';
import { getNowMonth, getNowWeek } from '@util/funcs';
import Calendar from '@components/MyDiary/Calendar';
import { DUMMY_DATA } from '@util/constants';
import Card from '@components/MyDiary/Card';
import { formatDate } from '@util/funcs';
import CarouselContainer from '@components/MyDiary/CarouselContainer';

const calPeriod = () => {
  const date = new Date();
  let startDate = new Date(date);
  startDate.setDate(date.getDate() - date.getDay());
  let endDate = new Date(date);
  endDate.setDate(date.getDate() + (6 - date.getDay()));
  return [startDate, endDate];
};

const MyDiary = () => {
  const [viewType, setViewType] = useState<viewTypes>('Day');
  const [diaryData, setDiaryData] = useState<IDiaryContent[]>(DUMMY_DATA);
  const [nowMonth, setNowMonth] = useState(new Date());
  const [nowWeek, setNowWeek] = useState(getNowWeek(new Date()));
  const [period, setPeriod] = useState(calPeriod());

  const setPrevOrNextMonth = (plus: number) => {
    const month = new Date(nowMonth);
    month.setMonth(month.getMonth() + plus);
    setNowMonth(month);
  };

  const setPrevOrNextWeek = (plus: number) => {
    setPeriod(changePeriod(plus));
    setNowWeek(getNowWeek(period[1]));
  };

  const changePeriod = (plus: number) => {
    const [startDate, endDate] = period;
    startDate.setDate(startDate.getDate() + plus * 7);
    endDate.setDate(endDate.getDate() + plus * 7);
    return [startDate, endDate];
  };

  useEffect(() => setDiaryData(DUMMY_DATA), []);

  return (
    <>
      <NavBar />
      <main className="mx-auto mb-28 flex max-w-5xl flex-col items-center justify-start">
        <header className="my-10 flex w-full justify-between">
          <KeywordSearch />
          <ViewType setViewType={setViewType} viewType={viewType} />
        </header>
        <section className="flex flex-col items-center">
          {viewType === 'Day' &&
            diaryData.map((data, index) => <DiaryListItem diaryItem={data} key={index} />)}
          {viewType === 'Week' && (
            <>
              <DateController
                titles={[
                  `Week ${nowWeek < 10 ? '0' + nowWeek : nowWeek}`,
                  `${formatDate(period[0], 'dot')} ~ ${formatDate(period[1], 'dot')}`,
                ]}
                leftOnClick={() => setPrevOrNextWeek(-1)}
                rightOnClick={() => setPrevOrNextWeek(1)}
              />
              {DUMMY_DATA.length < 3 && (
                <section className="flex gap-5">
                  {DUMMY_DATA.map((data) => (
                    <Card {...data} />
                  ))}
                </section>
              )}
              {DUMMY_DATA.length >= 3 && <CarouselContainer />}
            </>
          )}
          {viewType === 'Month' && (
            <>
              <DateController
                titles={[getNowMonth(nowMonth).join(' '), String(nowMonth.getFullYear())]}
                leftOnClick={() => setPrevOrNextMonth(-1)}
                rightOnClick={() => setPrevOrNextMonth(1)}
              />
              <Calendar date={nowMonth} />
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default MyDiary;
