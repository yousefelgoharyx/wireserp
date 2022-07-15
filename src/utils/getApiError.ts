import i18n from '../i18n';

const getApiError = (data) => {
    return data ? data[`alert_${i18n.language}`] : 'Server error';
};

export default getApiError;
