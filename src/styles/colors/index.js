export const LIGHT_BLACK = '#3a3a3a';

export const BLUE_GRAY = '#f1f6fc';

export const LIGHT_GRAY = '#f7f7f7';

export const DARK_GRAY = '#737373';

export const PURPLE_GRAY = '#c2c2d6';

export const GRAY = '#222222';

export const getAppBackgroundColor = mode => {
	if (mode === 'dark') {
		return '#020E37';
	}
	return '#fff';
};

export const getHeaderBackgroundColor = mode => {
	if (mode === 'dark') {
		return '#010D36';
	}
	return '#fff';
};

export const getFooterBackgroundColor = mode => {
	if (mode === 'dark') {
		return '#020E37';
	}
	return '#3a3a3a';
};
