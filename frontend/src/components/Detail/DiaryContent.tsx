import { useState } from 'react';
import ProfileItem from '@components/Common/ProfileItem';
import Reaction from '@components/Common/Reaction';
import Modal from '@components/Common/Modal';
import ReactionList from '@components/Diary/ReactionList';

interface DiaryContentProps {
  createdAt: string;
  profileImage: string;
  authorName: string;
  title: string;
  content: string;
  keywords: string[];
  reactionCount: number;
}

const DiaryContent = ({
  createdAt,
  profileImage,
  authorName,
  title,
  content,
  keywords,
  reactionCount,
}: DiaryContentProps) => {
  const [showModal, setShowModal] = useState(false);
  const toggleShowModal = () => {
    setShowModal((prev) => !prev);
  };

  const formatDateString = (str: string) => {
    const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

    const DateObject = new Date(str);
    const year = DateObject.getFullYear();
    const month = DateObject.getMonth() + 1;
    const day = DateObject.getDate();
    const date = DateObject.getDay();

    return `${year}년 ${month}월 ${day}일 ${week[date]}`;
  };

  return (
    <>
      <div className="border-brown mb-3 rounded-2xl border-2 border-solid bg-white p-3">
        <ProfileItem img={profileImage} nickName={authorName} />
        <div className="mb-3 flex items-center justify-between">
          <p className="text-lg font-bold">{title}</p>
          <p className="text-sm font-medium">{formatDateString(createdAt)}</p>
        </div>
        <div className="flex flex-col justify-center">
          <div className="mb-3  whitespace-pre-wrap text-sm font-medium">
            <p>{content}</p>
          </div>
        </div>
        <div className="mb-3 flex flex-wrap gap-3 text-base">
          {keywords.map((keyword, index) => (
            <div key={index} className="bg-mint rounded-lg px-3 py-1">
              <p>#{keyword}</p>
            </div>
          ))}
        </div>
        <Reaction count={reactionCount} onClick={toggleShowModal} />
        <Modal showModal={showModal} closeModal={toggleShowModal}>
          <ReactionList />
        </Modal>
      </div>
    </>
  );
};

export default DiaryContent;