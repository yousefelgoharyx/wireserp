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

  type PriceType = 'retail' | 'wholesale';
  interface PriceTypeSelect {
    label: string;
    value: PriceType;
  }
}
