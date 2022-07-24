interface CouponForm {
    code: string;
    discount: number;
    expire_date: Date;
    section: Section;
    id: number;
}

type Section = 'clients' | 'categories' | 'products';
