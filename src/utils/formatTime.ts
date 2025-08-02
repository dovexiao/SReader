/**
 * 处理时间输入并转换为指定格式
 * @param input 时间输入（时间戳、Date对象、ISO 8601字符串）
 * @param options 配置选项
 * @returns 根据配置返回格式化字符串或Date对象
 * @throws 无效输入时抛出错误
 */
export const formatTime = (
    input: number | Date | string,
    options: {
        format?: 'date' | 'datetime' | 'datetime-second' | 'iso' | 'utc' | 'utc-ms' | 'relative';
        timezone?: 'local' | 'utc';
    } = {}
): string => {
    // 统一转换为Date对象
    const date = typeof input === 'number' ? new Date(input) :
        input instanceof Date ? input : new Date(input);

    // 验证有效性
    if (isNaN(date.getTime())) {
        return 'Invalid date time';
    }

    type DateComponent = 'FullYear' | 'Month' | 'Date' | 'Hours' | 'Minutes' | 'Seconds' | 'Milliseconds';

    // 时区处理（默认本地时间）
    const get = (fn: DateComponent) => options.timezone === 'utc' ?
        (date[`getUTC${String(fn)}` as keyof Date] as Function)() :
        (date[`get${String(fn)}` as keyof Date] as Function)();

    // 1. 直接返回Date对象
    if (!options.format) {
        return date.toDateString();
    }

    // 2. 格式处理
    const pad = (num: number) => num.toString().padStart(2, '0');
    const year = get('FullYear');
    const month = pad(get('Month') + 1);
    const day = pad(get('Date'));
    const hour = pad(get('Hours'));
    const minute = pad(get('Minutes'));
    const second = pad(get('Seconds'));
    const ms = pad(get('Milliseconds'));

    switch (options.format) {
        case 'date': // YYYY年MM月DD日
            return `${year}年${month}月${day}日`;
        case 'datetime': // YYYY年MM月DD日 HH:mm
            return `${year}年${month}月${day}日 ${hour}:${minute}`;
        case 'datetime-second': // YYYY年MM月DD日 HH:mm:SS
            return `${year}年${month}月${day}日 ${hour}:${minute}:${second}`;
        case 'iso': // 带时区的完整ISO格式
            return date.toISOString().replace('Z', getTimezoneOffset(date));
        case 'utc': // UTC时间（无毫秒）
            return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
        case 'utc-ms': // UTC时间（带毫秒）
            return `${year}-${month}-${day}T${hour}:${minute}:${second}.${ms}Z`;
        case 'relative': // 相对时间
            return getRelativeTime(date);
    }
}

/** 计算时区偏移量（如 +08:00） */
function getTimezoneOffset(date: Date): string {
    const offset = -date.getTimezoneOffset();
    const sign = offset >= 0 ? '+' : '-';
    const absOffset = Math.abs(offset);
    const hours = Math.floor(absOffset / 60).toString().padStart(2, '0');
    const minutes = (absOffset % 60).toString().padStart(2, '0');
    return `${sign}${hours}:${minutes}`;
}

/** 生成相对时间字符串 */
function getRelativeTime(input: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - input.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffMs < 0) {
        return 'error time';
    }
    if (diffSec < 60) {
        return '刚刚';
    }
    if (diffMin < 60) {
        return `${diffMin}分钟前`;
    }
    if (diffHour < 24) {
        return `${diffHour}小时前`;
    }
    if (diffDay < 15) {
        return `${diffDay}天前`;
    }
    if (diffDay < 31) {
        return `${Math.floor(diffDay / 7)}周前`;
    }

    // 跨年判断
    if (now.getFullYear() !== input.getFullYear()) {
        return `${now.getFullYear() - input.getFullYear()}年前`;
    }

    // 同年内月份差
    const monthDiff = now.getMonth() - input.getMonth();
    return `${monthDiff}个月前`;
}
