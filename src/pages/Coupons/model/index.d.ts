interface CouponForm {
  code: string;
  discount: number;
  expire_date: Date;
  section: Section;
  item_id: number;
}
type CouponUpdate = withID<CouponForm>;

interface Coupon extends CouponForm {
  id: number;
  item_name: string;
}

type Section = 'clients' | 'categories' | 'products';
