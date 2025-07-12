import React from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import { Icon, Input, Text } from '@ui-kitten/components';
import type {IconElement} from '@ui-kitten/components';
import {usePasswordLoginStore} from '../../stores/passwordLogin.store.ts';

type InputProps = {
    label: string;
};

const AlertIcon = (props: any): IconElement => (
    <Icon
        {...props}
        name="alert-circle-outline"
        fill={props.color}
    />
);

// 组合使用
const usePasswordField = () => {
    return {
        value: usePasswordLoginStore(sate => sate.password),
        setValue: usePasswordLoginStore(sate => sate.setPassword),
        caption: usePasswordLoginStore(sate => sate.passwordCaption),
    };
};

const LoginSecureInput = ({ label }: InputProps): React.ReactElement => {
    const { value, setValue, caption } = usePasswordField();

    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    const toggleSecureEntry = (): void => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props: any): React.ReactElement => (
        <Pressable onPress={toggleSecureEntry}>
            <Icon
                {...props}
                name={secureTextEntry ? 'eye-off' : 'eye'}
                width={35}
                height={35}
            />
        </Pressable>
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
            secureTextEntry={secureTextEntry}
            onChangeText={nextValue => setValue(nextValue)}
            maxLength={11}
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

export default LoginSecureInput;
