interface CouponForm {
  code: string;
  discount: number;
  expire_date: Date;
  section: Section;
  item_id: number;
}

interface Coupon extends CouponForm {
  id: number;
  item_name: string;
}

type Section = 'clients' | 'categories' | 'products';
