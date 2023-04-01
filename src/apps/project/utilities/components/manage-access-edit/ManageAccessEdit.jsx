import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { updateCoreAccessList } from '../../../store/projects';
import usePageNav from '../../../../../utilities/hooks/usePageNav';
import { PageNavContext } from '../../../../../utilities/context/PageNavContext';
import { renderButton } from '../../../../../utilities/uiElements';
import ModalNavContext from '../../../../../utilities/context/ModalNavContext';
import useModalNav from '../../../../../utilities/hooks/useModalNav';
import './manageAccessEdit.scss';

function ManageAccessEdit({ sectionConstants }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { name, totalAccessName, baseUrl, id } = sectionConstants;
  const [{ moveToPrevPage }] = usePageNav(PageNavContext);
  const [{ closeModal }] = useModalNav(ModalNavContext);
  const sectionDataDetail = useSelector((state) => state.entities.projects.core[name].detail);
  const currentList = sectionDataDetail.access;
  const totalList = useSelector((state) => state.entities.projects.accessList[totalAccessName]);
  const currentCode = useMemo(() => currentList.map((item) => item.code), [currentList]);
  const availableList = useMemo(
    () => totalList.filter((item) => !currentCode.includes(item.code)),
    [totalList, currentCode]
  );

  const initialState = useMemo(
    () => ({
      currentList,
      availableList
    }),
    [currentList, availableList]
  );

  const [data, setData] = useState({ ...initialState });

  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setData({ ...initialState });
  }, [initialState]);

  const handleSelect = (code) => {
    const selectedData = [...selected];
    const index = selectedData.findIndex((item) => item === code);
    if (index !== -1) {
      selectedData.splice(index, 1);
      setSelected(selectedData);
    } else {
      setSelected([...selected, code]);
    }
  };
  const moveSelected = (source, target) => {
    const result = { source: [], target: [] };
    const selectedItems = source.filter((item) => selected.includes(item.code));
    result.source = source.filter((item) => !selected.includes(item.code));
    result.target = [...target, ...selectedItems];
    const selectedCodes = selectedItems.map((item) => item.code);
    setSelected(selected.filter((item) => !selectedCodes.includes(item)));
    return result;
  };

  const addToCurrentList = () => {
    const result = moveSelected(data.availableList, data.currentList);
    setData({
      availableList: result.source,
      currentList: result.target
    });
  };
  const removeFromCurrentList = () => {
    const result = moveSelected(data.currentList, data.availableList);
    setData({
      currentList: result.source,
      availableList: result.target
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const postData = {
        access_code_list: [...data.currentList.map((item) => item.code)]
      };

      await dispatch(updateCoreAccessList({ baseUrl, name, id, data: postData }));
      closeModal();
    } catch (err) {}
    setIsLoading(false);
  };

  return (
    <div className="manage-access-edit">
      <header>
        <p className="margin-bottom--0 bold">
          <FontAwesomeIcon icon={faArrowLeft} className="back-arrow" onClick={moveToPrevPage} />
          Edit
        </p>
      </header>
      <div className="flex-item-grow overflow--auto">
        current list:
        <div className="flex flex-wrap">
          {data.currentList.map((item) => (
            <span
              className={`badge sub-text ${
                selected.includes(item.code) ? 'badge--black' : 'badge--primary'
              }`}
              onClick={() => handleSelect(item.code)}
              role="presentation">
              {item.name}
            </span>
          ))}
        </div>
        available list:
        <div className="flex flex-wrap">
          {data.availableList.map((item) => (
            <span
              key={item.code}
              className={`badge sub-text ${
                selected.includes(item.code) ? 'badge--black' : 'badge--primary'
              }`}
              onClick={() => handleSelect(item.code)}
              role="presentation">
              {item.name}
            </span>
          ))}
        </div>
      </div>
      <div className="btn-container-grow">
        {renderButton({
          content: 'add',
          className: 'btn--md btn--matte-black',
          onClick: addToCurrentList
        })}

        {renderButton({
          content: 'remove',
          className: 'btn--md btn--brown',
          onClick: removeFromCurrentList
        })}
        {renderButton({
          content: 'submit',
          className: 'btn--md btn--matte-black',
          onClick: handleSubmit,
          loading: isLoading ? 1 : 0
        })}
      </div>
    </div>
  );
}

export default ManageAccessEdit;
