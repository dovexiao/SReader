import {Icon, useTheme} from '@ui-kitten/components';
import type {IconElement} from '@ui-kitten/components';
import React from 'react';

const CheckmarkIcon = (props: any): IconElement => {
    const themes = useTheme();
    return (
        <Icon
            {...props}
            name="checkmark-square-outline"
            fill={themes['color-primary-500']}
        />
    );
};

export { CheckmarkIcon };
