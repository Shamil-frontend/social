import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useTableData = (fetchData, selectors) => {

  const dispatch = useDispatch();
  const livingWages = useSelector(selectors.livingWages);
  const loading = useSelector(selectors.loading);
  const error = useSelector(selectors.error);

  useEffect(() => {
    dispatch(fetchData());
  }, [fetchData, dispatch])
  return [livingWages, loading, error];
};

export default useTableData;