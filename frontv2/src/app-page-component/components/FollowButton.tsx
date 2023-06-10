import React from 'react';
import PrimaryButton from '@/components/button/PrimaryButton';

interface IFollowButtonProps {
  followed: boolean;
  follow: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
function FollowButton(props: IFollowButtonProps) {
  return (
    <PrimaryButton
      title={props.followed ? 'Following' : 'Follow'}
      loading={false}
      disabled={false}
      buttonClassName={`p-1 ${
        props.followed ? ' text-indigo-500 bg-white hover:bg-gray-100' : ''
      }`}
      onClick={event => {
        props.follow(event);
      }}
    />
  );
}

export default FollowButton;
