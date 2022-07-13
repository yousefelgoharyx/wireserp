declare module 'signup' {
    import type { UseFormReturnType } from '@mantine/form/lib/use-form';
    type StepProps = {
        onNext: () => void;
        onPrev: () => void;
        handleSignup: () => void;
        form: UseFormReturnType<SignupFormValues>;
    };

    export type SignupFormValues = {
        company_name: string;
        company_phone: string;
        company_country: string;
        company_currency: string;
        fiscal_year: number;
        fiscal_start_date: Date;
        fiscal_end_date: Date;
        manager_name: string;
        manager_phone: string;
        manager_email: string;
        manager_password: string;
    };

    export type User = {
        branch_id: number;
        company_id: number;
        email: string;
        full_name: string;
        id: number;
        image: string;
        phone: string;
        role: string;
        status: string;
        token: string;
    };
}
