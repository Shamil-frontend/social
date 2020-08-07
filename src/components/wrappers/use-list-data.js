import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useListData = (fetchData, selectors) => {

  const dispatch = useDispatch();
  const socialGroups = useSelector(selectors.socialGroups);
  const loading = useSelector(selectors.loading);
  const error = useSelector(selectors.error);

  useEffect(() => {
    dispatch(fetchData());
  }, [fetchData, dispatch])
  return [socialGroups, loading, error]
}

export default useListData;