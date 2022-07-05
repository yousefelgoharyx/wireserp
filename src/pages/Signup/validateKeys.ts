export default function validateKeys(errors: {}, keys: string[]): boolean {
    return !Object.keys(errors).some((errorKey) => keys.includes(errorKey));
}
