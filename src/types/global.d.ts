export {};
declare global {
  type Lang = 'ar' | 'en';
  type Dir = 'rtl' | 'ltr';
  type ProivderProps = {
    children: React.ReactNode;
  };
  type UpdateModal = {
    isOpen: boolean;
    requestClose: () => void;
    selectedId: number;
  };

  interface Context<T> {
    isRemoving: boolean;
    isCreating: boolean;
    isFetching: boolean;
    isUptading: boolean;
    data: T[];
    remove: (id: number) => void;
    create: (data: T) => void;
    update: (data: T) => void;
  }
  type Unit = 'unit' | 'gm' | 'kg' | 'ton';

  type PricingType = 'retail' | 'wholesale';
  interface PricingSelectItem {
    label: string;
    value: PricingType;
  }
  type ID = { id: number };

  type ExpenseType = 'percent' | 'currency';
  type Expense = 'total' | 'shipping';
  interface ExpenseSelectItem {
    label: string;
    value: ExpenseType;
  }
}
