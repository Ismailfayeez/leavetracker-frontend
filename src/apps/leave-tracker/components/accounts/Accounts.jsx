import React, { Profiler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../../../ui-kit/modal/Modal";
import "./accounts.scss";
import { useState } from "react";
import LoadingScreen from "../../../../ui-kit/loading/loadingScreen/LoadingScreen";
import { ACCOUNT_PREFERENCE_URL } from "../../apiConstants";
import {
  addCurrentProjectToSession,
  loadMyLtAccounts,
} from "../../../auth/store/userProfile";
import { clearEmployeeData } from "../../store/authActions";
import { useEffect } from "react";
function Accounts(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [displayModal, setDisplayModal] = useState(true);
  const currentProject =
    useSelector(
      (state) =>
        state.entities.auth.userProfile.currentUser.data.leaveTracker
          .currentProject
    ) || {};
  const accounts =
    useSelector(
      (state) =>
        state.entities.auth.userProfile.currentUser.data.leaveTracker.accounts
    ) || [];
  const [isLoading, setIsLoading] = useState(true);

  const handleAddCurrentProjectToPreference = async (account) => {
    if (account.project == currentProject.id) return;
    setIsLoading(true);
    try {
      await dispatch(
        addCurrentProjectToSession({
          url: ACCOUNT_PREFERENCE_URL,
          data: { project_id: account.project },
          account,
        })
      );
      dispatch(clearEmployeeData());
      setIsLoading(false);
      navigate("/lt/dashboard");
    } catch (err) {
      setIsLoading(false);
    }
  };
  const fetchMyLtAccounts = async () => {
    try {
      await dispatch(loadMyLtAccounts());
    } catch (err) {}
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMyLtAccounts();
  }, []);

  return (
    <div>
      <Modal
        open={displayModal}
        handleClose={() => navigate("/my-profile", { replace: true })}
        title="My Accounts"
        height="md"
        width="sm"
      >
        {isLoading && (
          <div style={{ height: "100%" }}>
            <LoadingScreen />
          </div>
        )}
        {!isLoading && (
          <section className="full-height">
            {accounts.length == 0 && (
              <div className="flex flex--center full-height">
                <div>
                  <div> No accounts found.</div>
                  <Link to="/my-profile">go to my profile</Link>
                </div>
              </div>
            )}
            {accounts.length > 0 && (
              <div>
                <p className="margin-bottom--1">Select your project</p>
                <ul className="account-card-list">
                  {accounts.map((account) => (
                    <div
                      key={account.id}
                      className={`account-card ${
                        account.project == currentProject.id ? "active" : ""
                      }`}
                      onClick={() =>
                        handleAddCurrentProjectToPreference(account)
                      }
                    >
                      <div>{account.project_name}</div>
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}
      </Modal>
    </div>
  );
}

export default Accounts;
