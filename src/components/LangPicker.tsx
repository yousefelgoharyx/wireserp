import React, { useState } from 'react';
import {
    createStyles,
    UnstyledButton,
    Menu,
    Image,
    Group,
} from '@mantine/core';
import { ChevronDown } from 'tabler-icons-react';
import en from '../images/english.png';
import ar from '../images/arabic.png';
import { useLang } from '../AppProvider';

type LangItem = {
    label: string;
    id: Lang;
    image: any;
};
const langs: LangItem[] = [
    { label: 'English', image: en, id: 'en' },
    { label: 'العربية', image: ar, id: 'ar' },
];

const useStyles = createStyles((theme, { opened }: { opened: boolean }) => ({
    control: {
        width: 130,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 15px',
        borderRadius: theme.radius.md,
        border: `1px solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[2]
        }`,
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[opened ? 5 : 6]
                : opened
                ? theme.colors.gray[0]
                : theme.white,

        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[5]
                    : theme.colors.gray[0],
        },
    },

    label: {
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,
    },

    icon: {
        transition: 'transform 150ms ease',
        transform: opened ? 'rotate(180deg)' : 'rotate(0deg)',
    },
}));

export function LanguagePicker() {
    const [lang, setLang] = useLang();

    const [opened, setOpened] = useState(false);
    const { classes } = useStyles({ opened });
    const [selected, setSelected] = useState(langs.find((l) => l.id === lang));

    const handleClick = (lang) => {
        setSelected(lang);
        setLang(lang.id);
    };
    const items = langs.map((lang) => (
        <Menu.Item
            icon={<Image src={lang.image} width={18} height={18} />}
            onClick={() => handleClick(lang)}
            key={lang.id}
        >
            {lang.label}
        </Menu.Item>
    ));

    return (
        <Menu
            transition="pop"
            transitionDuration={150}
            onOpen={() => setOpened(true)}
            onClose={() => setOpened(false)}
            radius="md"
            sx={{ userSelect: 'none' }}
            control={
                <UnstyledButton className={classes.control}>
                    <Group spacing="xs">
                        <Image src={selected.image} width={22} height={22} />
                        <span className={classes.label}>{selected.label}</span>
                    </Group>
                    <ChevronDown size={16} className={classes.icon} />
                </UnstyledButton>
            }
        >
            {items}
        </Menu>
    );
}
