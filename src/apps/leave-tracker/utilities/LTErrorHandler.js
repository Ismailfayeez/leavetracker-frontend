function LTErrorHandler(errorResponse, navigate) {
  if (
    errorResponse.status === 404 &&
    errorResponse.data &&
    ['PREF.NOT.FOUND', 'PREF.PRJCT.NOT.FOUND', 'PREF.EMP/PRJCT.NOT.FOUND'].includes(
      errorResponse.data.code
    )
  ) {
    navigate('/switch-accounts');
    return true;
  }
}
export default LTErrorHandler;
