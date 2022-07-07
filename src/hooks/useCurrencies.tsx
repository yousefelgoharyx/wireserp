import cc from 'currency-codes';
const useCurrencies = () => {
    return cc.codes().map((code) => {
        let c = cc.code(code);
        return {
            label: c.code,
            description: c.currency,
            value: c.code,
        };
    });
};

export default useCurrencies;
