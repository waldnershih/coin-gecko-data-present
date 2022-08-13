import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ children }) => {
	const { pathname, search } = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [pathname, search]);

	return children;
};

export default ScrollToTop;
