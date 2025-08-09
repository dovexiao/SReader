// 定义导航属性类型
import { RootStackParamList } from '@/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

type RecycleBinNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'RecycleBin'
>;

// 定义路由参数类型
type RecycleBinRouteProp = RouteProp<
    RootStackParamList,
    'RecycleBin'
>;

// RecycleBin 组件属性类型
export type RecycleBinProps = {
    navigation: RecycleBinNavigationProp;
    route: RecycleBinRouteProp;
};

export type Tab = {
    label: string;
    icon: string;
}
