import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import InfoDisplayList from '../../../../ui-kit/info-display-list/InfoDisplayList';
import InfoDisplay from '../../../../ui-kit/info-display/InfoDisplay';
import Modal from '../../../../ui-kit/modal/Modal';
import { renderButton } from '../../../../utilities/uiElements';
import { COUNTRY_URL, TIMEZONE_URL } from '../../apiConstants';
import { loadUtils } from '../../store/userProfile';
import EditProfile from '../edit-profile/EditProfile';
import './myProfile.scss';

function MyProfile({ handleLogoutUser }) {
  const [displayEditProfileModal, setdisplayEditProfileModal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.entities.auth.userProfile.currentUser.data);
  const userLtData = useSelector(
    (state) => state.entities.auth.userProfile.currentUser.data.leaveTracker
  );
  const utils = useSelector((state) => state.entities.auth.userProfile.utils);

  const columns = [
    { name: 'username', label: 'Name' },
    { name: 'email', label: 'Email' },
    { name: 'country', label: 'Country' },
    { name: 'timezone', label: 'Timezone' }
  ];

  useEffect(() => {
    if (!utils.countries.lastFetch) {
      dispatch(loadUtils({ url: COUNTRY_URL, name: 'countries' }));
    }
  }, [utils.countries.lastFetch, dispatch]);
  useEffect(() => {
    if (!utils.timeZone.lastFetch) {
      dispatch(loadUtils({ url: TIMEZONE_URL, name: 'timeZone' }));
    }
  }, [utils.timeZone.lastFetch, dispatch]);
  const handleEditSuccess = () => {
    setdisplayEditProfileModal(false);
    toast.success(<span className="toast-msg">your profile edited successfully</span>);
  };

  return (
    <section className="my-profile-content-layout">
      <div className="app-main-display">
        <main className="app-main">
          <Modal
            title="Edit Profile"
            open={displayEditProfileModal}
            handleClose={() => setdisplayEditProfileModal(false)}
            height="md"
            width="sm">
            <EditProfile handleEditSuccess={handleEditSuccess} />
          </Modal>
          <header>
            <h3>My Profile</h3>{' '}
          </header>
          <div className="flex flex--column gap--10px">
            <InfoDisplayList
              data={[user]}
              columns={columns}
              className="flex flex--column gap--10px"
            />
            {userLtData.currentProject && (
              <InfoDisplay
                item={{ name: userLtData.currentProject.name }}
                name="name"
                label="Current Project"
              />
            )}

            <Link to="/switch-accounts">switch accounts</Link>
            <div className="flex gap--10px">
              {renderButton({
                content: 'edit profile',
                className: 'btn--md btn--brown',
                onClick: () => setdisplayEditProfileModal(true)
              })}
              {renderButton({
                content: 'logout',
                className: 'btn--md btn--matte-black',
                onClick: handleLogoutUser
              })}
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default MyProfile;
