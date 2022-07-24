export default function getImageUrl(s: string) {
  const companyId = JSON.parse(localStorage.getItem('user'))?.company_id;
  return `https://erp.digitwires.com/storage/products/company-${companyId}/${s}`;
}
