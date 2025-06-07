interface FormatOptions {
    relative?: boolean;
    format?: string;
    autoUpdate?: boolean;
}

export const formatTimestamp = (timestamp: number, options: FormatOptions) => {
    // 合并默认选项
    const {
        relative = true,
        format = 'YYYY-MM-DD HH:mm:ss',
        autoUpdate = false,
    } = options;

    // 转换时间戳为 Date 对象
    let date;
    // 处理秒级时间戳
    if (timestamp.toString().length === 10) {
        timestamp = timestamp * 1000;
    }
    date = new Date(timestamp);

    // 如果日期无效
    if (isNaN(date.getTime())) {
        return '无效时间';
    }

    // 计算相对时间
    if (relative) {
        const now = new Date();
        const diff = now.getTime() - date.getTime();

        // 小于1分钟：刚刚
        if (diff < 60 * 1000) {
            return '刚刚';
        }

        // 小于1小时：X分钟前
        if (diff < 60 * 60 * 1000) {
            const minutes = Math.floor(diff / (60 * 1000));
            return `${minutes}分钟前`;
        }

        // 小于24小时：X小时前
        if (diff < 24 * 60 * 60 * 1000) {
            const hours = Math.floor(diff / (60 * 60 * 1000));
            return `${hours}小时前`;
        }

        // 小于7天：X天前
        if (diff < 7 * 24 * 60 * 60 * 1000) {
            const days = Math.floor(diff / (24 * 60 * 60 * 1000));
            return `${days}天前`;
        }
    }

    return date.toDateString().split('T')[0];
};
