import { useDispatch } from 'react-redux';
import { loadData } from '../../store/common/dispatchMethods';

function useFileDownload() {
  const dispatch = useDispatch();

  const downloadFileFromLink = (data, fileName) => {
    const href = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const handleDownloadFile = async (url, fileName, setLoading) => {
    try {
      if (setLoading) {
        setLoading(true);
      }
      const response = await dispatch(loadData(url, 'blob'));
      downloadFileFromLink(response.data, fileName);
    } catch (err) {}
    if (setLoading) {
      setLoading(false);
    }
  };

  const handleDownloadPdf = async (url, fileName, setLoading) => {
    try {
      if (setLoading) {
        setLoading(true);
      }
      const response = await dispatch(loadData(url));
      downloadFileFromLink(response.data, fileName);
    } catch (err) {}
    if (setLoading) {
      setLoading(false);
    }
  };
  return [{ handleDownloadFile, handleDownloadPdf }];
}

export default useFileDownload;
