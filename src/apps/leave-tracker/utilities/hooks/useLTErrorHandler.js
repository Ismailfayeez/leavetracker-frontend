function useLTErrorHandler(errorResponse, navigate) {
  if (errorResponse.status === 404 && errorResponse.data.code === 'SESSION.NOT.FOUND') {
    navigate('/switch-accounts');
  }
}
export default useLTErrorHandler;
