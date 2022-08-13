import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
	const { search } = useLocation();
	const urlSearchParams = useMemo(() => new URLSearchParams(search), [search]);

	return urlSearchParams;
};

export default useQuery;
