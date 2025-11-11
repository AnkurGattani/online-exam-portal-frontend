import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { Question } from '../../../models/question.model';
import { MatCardTitle, MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-question-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardTitle,
    MatCardModule
  ],
  templateUrl: './question-form.html',
  styleUrls: ['./question-form.css']
})
export class QuestionForm implements OnInit, OnChanges {
  @Input() question?: Question;   // Child component(QuestionForm) receiving question data from parent component
  @Output() save = new EventEmitter<Question>();  // Parent component(QuestionBank) listening to this event to get the form data
  questionForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question'] && changes['question'].currentValue) {
      this.patchForm(changes['question'].currentValue);
    }
  }

  initForm() {

    this.questionForm = this.fb.group({
      text: ['', Validators.required],
      type: ['', Validators.required],
      difficulty: ['', Validators.required],
      marks: [1, [Validators.required, Validators.min(1)]],
      options: this.fb.array([]),
      numericAnswer: ['', [Validators.pattern('^[0-9]+$')]]
    });

  }

  patchForm(question: Question) {
    this.questionForm.patchValue({
      text: question.text,
      type: question.questionType,
      difficulty: question.difficulty,
      marks: question.marks,
      numericAnswer: question.questionType === 'NUMERIC' ? question.correctAnswer?.[0] : ''
    });

    // clear the form's options FormArray (not the model array)
    this.options.clear();
    if (question.questionType === 'MULTIPLE_CHOICE_QUESTION' || question.questionType === 'MULTIPLE_SELECT_QUESTION') {
      question.options?.forEach(opt => {
        this.options.push(this.fb.group({
          text: [opt.optionText, Validators.required],
          isCorrect: [opt.isCorrect]
        }));
      });
    }
  }

  get options(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  onTypeChange(type: string) {
    this.options.clear();
    this.questionForm.get('numericAnswer')?.reset();

    if (type === 'MULTIPLE_CHOICE_QUESTION' || type === 'MULTIPLE_SELECT_QUESTION') {
      // Add 2 default options and allow adding more using addOption
      this.addOption();
      this.addOption();
    }
  }

  addOption() {
    this.options.push(this.fb.group({
      text: ['', Validators.required],
      isCorrect: [false]
    }));
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

  onCorrectOptionChange(index: number) {  // For MCQ type, only one correct option
    if (this.questionForm.get('type')?.value === 'MULTIPLE_CHOICE_QUESTION') {
      this.options.controls.forEach((opt, i) => {
        if (i !== index) {
          opt.get('isCorrect')?.setValue(false, { emitEvent: false });
        }
      });
    }
  }

  onSubmit() {
    if (this.questionForm.valid) {
      const formValue = this.questionForm.value;

      const questionDTO: Question = {
        text: formValue.text,
        questionType: formValue.type, // matches enum
        difficulty: formValue.difficulty, // matches enum
        marks: formValue.marks,
        options: formValue.type === 'NUMERIC'
          ? [{ optionText: formValue.numericAnswer, isCorrect: true }]
          : formValue.options.map((opt: any) => ({
            optionText: opt.text,
            isCorrect: opt.isCorrect
          })),
        correctAnswer: formValue.type === 'NUMERIC'
          ? [formValue.numericAnswer]
          : formValue.options.filter((opt: any) => opt.isCorrect).map((opt: any) => opt.text)
      };

      console.log('Mapped QuestionDTO:', questionDTO);
      // this.initForm(); // Reset form after submission
      this.reload();
      this.save.emit(questionDTO);
    }
  }
  reload() {
    // this.questionForm.reset();
    window.location.reload();
  }
}