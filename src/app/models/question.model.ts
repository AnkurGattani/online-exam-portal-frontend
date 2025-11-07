export interface Option {
    id?: number;
    optionText: string;
    isCorrect: boolean;
}

export interface Question {
    questionId?: number;
    text: string;
    options: Option[];
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    questionType: 'NUMERIC' | 'MULTIPLE_CHOICE_QUESTION' | 'MULTIPLE_SELECT_QUESTION';
    marks: number;
    correctAnswer: string[];
}