import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types';
import { RouteProp } from '@react-navigation/native';

type VerificationLoginNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'VerificationLogin'
>;

// 定义路由参数类型
type VerificationLoginRouteProp = RouteProp<
    RootStackParamList,
    'VerificationLogin'
>;

// VerificationLogin 组件属性类型
export type VerificationLoginProps = {
    navigation: VerificationLoginNavigationProp;
    route: VerificationLoginRouteProp;
};
