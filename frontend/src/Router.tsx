import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '@pages/Login';
import Home from '@pages/Home';
import Feed from '@pages/Feed';
import MyDiary from '@pages/MyDiary';
import Edit from '@pages/Edit';
import Detail from '@pages/Detail';
import AuthLogin from '@pages/OAuthLogin';

import { PAGE_URL } from './util/constants';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${PAGE_URL.HOME}`} element={<Home />} />
        <Route path={`${PAGE_URL.HOME}/:userId`} element={<Home />} />
        <Route path={`${PAGE_URL.LOGIN}`} element={<Login />} />
        <Route path={`${PAGE_URL.FEED}`} element={<Feed />} />
        <Route path={`${PAGE_URL.MY_DIARY}`} element={<MyDiary />} />
        <Route path={`${PAGE_URL.EDIT}`} element={<Edit />} />
        <Route path={`${PAGE_URL.DETAIL}/:diaryId`} element={<Detail />} />
        <Route path={`${PAGE_URL.AUTH}`} element={<AuthLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
