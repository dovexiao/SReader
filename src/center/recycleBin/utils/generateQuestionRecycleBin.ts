// 生成示例数据
import { QuestionSection } from '@/center/recycleBin/types';
import { ALPHABET } from '@/center/recycleBin/components/noteRecycleBin/AlphabetNavigator.tsx';
import { SectionListData } from 'react-native';
import { QuestionType } from '@/question/questionBank/types';

export const generateQuestionRecycleBin = (): SectionListData<QuestionSection>[] => {
    const sectionListData: SectionListData<QuestionSection>[] = [];

    ALPHABET.forEach(letter => {
        const questionSections: QuestionSection[] = [];
        const questionCount: number = Math.floor(Math.random() * 5);

        for (let i = 1; i <= questionCount; i++) {
            questionSections.push({
                questionId: `${letter}${i}`,
                content: '这是' + letter + '题目 ' + i + ' 的内容',
                type: getRandomQuestionTypeWithWeight(),
                createdAt: new Date().toISOString(),
            });
        }

        if (questionSections.length > 0) {
            sectionListData.push({
                title: letter,
                data: questionSections,
            });
        }
    });

    return sectionListData;
};

/**
 * 根据权重随机返回一个 QuestionType
 * @param weights 各题型的权重，默认均等
 */
export const getRandomQuestionTypeWithWeight = (
    weights: Record<QuestionType, number> = {
        '单选题': 1,
        '多选题': 1,
        '判断题': 1,
        '填空题': 1,
        '简答题': 1,
    }
): QuestionType => {
    const questionTypes: QuestionType[] = ['单选题', '多选题', '判断题', '填空题', '简答题'];

    // 计算总权重
    const totalWeight = questionTypes.reduce((sum, type) => sum + weights[type], 0);

    // 生成随机数
    let random = Math.random() * totalWeight;

    // 根据权重选择
    for (const type of questionTypes) {
        random -= weights[type];
        if (random <= 0) {
            return type;
        }
    }

    return questionTypes[0]; // fallback
};


