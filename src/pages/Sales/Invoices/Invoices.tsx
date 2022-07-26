import InvoicesForm from './InvoicesForm';

const Invoices = () => {
  function handleSubmit(values: SaleBillForm) {
    console.log(values);
  }
  return (
    <div>
      <InvoicesForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Invoices;
