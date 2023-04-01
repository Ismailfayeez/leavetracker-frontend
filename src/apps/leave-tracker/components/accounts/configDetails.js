import { myAccounts, leaveTrackerSession } from '../../../api-endpoints/urls';

export const getMyAccountsConfig = () => {
  const url = myAccounts;
  return {
    name: 'myAccounts',
    label: 'my accounts',
    getCurrentUrl: () => url
  };
};
export const leaveTrackerSessionConfig = () => {
  const url = leaveTrackerSession;
  return {
    name: 'session',
    label: 'session',
    getCurrentUrl: () => url
  };
};
