import React from 'react';
import { sliceFirstLettersOfSentence } from '../../utilities/helper';
import './userProfileImageHolder.scss';

function UserProfileImageHolder({ sentence, ...others }) {
  return (
    <div className="logo-container logo-container--sm user-profile-image-holder" {...others}>
      <div className="first-letter-logo first-letter-logo--black">
        {sliceFirstLettersOfSentence(sentence, 1, true)}
      </div>
    </div>
  );
}

export default UserProfileImageHolder;
