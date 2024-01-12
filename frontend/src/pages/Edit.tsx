import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import NavBar from '@components/Common/NavBar';
import Header from '@components/Edit/Header';
import Editor from '@components/Edit/Editor';
import KeywordBox from '@components/Edit/KeywordBox';

import useEditStore from '@store/useEditStore';

const Edit = () => {
  const { state } = useLocation();
  const { setDiaryId, setTitle, setEmoji, setThumbnail, setContent, setKeywordList, setStatus } =
    useEditStore();

  useEffect(() => {
    if (state?.type !== 'update') {
      setDiaryId(0);
      setTitle('');
      setContent(' ');
      setEmoji('😁');
      setThumbnail('');
      setKeywordList([]);
      setStatus('나만 보기');
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-start">
      <NavBar />
      <Header />
      <Editor />
      <KeywordBox />
    </div>
  );
};

export default Edit;
