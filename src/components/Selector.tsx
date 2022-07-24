import {
    Avatar,
    Group,
    Loader,
    Select,
    SelectProps,
    Text,
} from '@mantine/core';
import { forwardRef } from 'react';
interface SelectorProps extends SelectProps {
    loading?: boolean;
}
interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    label: string;
    description?: string;
    image?: string;
}
const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    (props: ItemProps, ref) => {
        const { image, label, description, ...others } = props;
        return (
            <div ref={ref} {...others}>
                <Group noWrap>
                    {image && <Avatar src={image} />}
                    <div>
                        <Text size="sm">{label}</Text>
                        {description && (
                            <Text size="xs" color="dimmed">
                                {description}
                            </Text>
                        )}
                    </div>
                </Group>
            </div>
        );
    }
);

const Selector = (props: SelectorProps) => {
    const { loading = false, ...rest } = props;

    return (
        <Select
            {...rest}
            itemComponent={SelectItem}
            disabled={rest.disabled || loading}
            rightSection={loading ? <Loader size={16} /> : rest.rightSection}
            placeholder={loading ? 'Please wait...' : rest.placeholder}
        />
    );
};

export default Selector;
