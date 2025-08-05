import React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import { Icon, IconElement, Input, Text } from '@ui-kitten/components';
import { useRegisterStore } from '../stores/register.store.ts';
import { useLoginStore } from '../stores/login.store.ts';

type InputProps = {
    label: string;
    type: 'REGISTER' | 'LOGIN';
};

const AlertIcon = (props: any): IconElement => (
    <Icon
        {...props}
        name="alert-circle-outline"
        fill={props.color}
    />
);

const useEmailAccountField = (type: InputProps['type']) => {
    const store = type === 'LOGIN' ? useLoginStore : useRegisterStore;
    const value = store(state => state.emailAccount);
    const setValue = store(state => state.setEmailAccount);
    const caption = store(state => state.emailCaption);
    return { value, setValue, caption };
};

const EmailInput = ({ label, type }: InputProps): React.ReactElement => {
    const { value, setValue, caption } = useEmailAccountField(type);

    const renderIcon = (props: any): React.ReactElement => (
        <TouchableWithoutFeedback>
            <Icon
                {...props}
                name="email-outline"
                width={35}
                height={35}
            />
        </TouchableWithoutFeedback>
    );

    const renderCaption = (): React.ReactElement => {
        return (
            <>
                {caption && <View style={styles.captionContainer}>
                    {AlertIcon(styles.captionIcon)}
                    <Text style={styles.captionText}>
                        {caption}
                    </Text>
                </View>}
            </>
        );
    };

    // const renderLabel = (): React.ReactElement => {
    //     return (
    //         <Text style={styles.label}>
    //             { label }
    //         </Text>
    //     );
    // };

    return (
        <Input
            style={styles.input}
            value={value}
            // label={renderLabel}
            placeholder={label}
            caption={renderCaption}
            accessoryRight={renderIcon}
            onChangeText={nextValue => setValue(nextValue)}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        borderRadius: 25,
        backgroundColor: '#F6F6F6',
        // borderWidth: 0,
        color: '#333333',
        fontSize: 16,
    },
    captionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    captionIcon: {
        width: 10,
        height: 10,
        marginRight: 5,
        // color: '#A0A0A0',
        color: 'red',
    },
    captionText: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'opensans-regular',
        // color: '#A0A0A0',
        color: 'red',
    },
});

export default EmailInput;
