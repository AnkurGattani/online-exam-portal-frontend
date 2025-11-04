export interface Option {
    id?: number;
    text: string;
    isCorrect: boolean;
}

export interface Question {
    id?: number;
    text: string;
    options: Option[];
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    questionType: 'NUMERIC' | 'MULTIPLE_CHOICE_QUESTION' | 'MULTIPLE_SELECT_QUESTION';
    marks: number;
    correctAnswer: string[];
}