import {
  LocationStrategy,
  NgIf,
  NgFor,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
  JsonPipe,
} from '@angular/common';
import { Component, OnInit, inject, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Quiz } from '../../services/viewExam/quiz';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ReportService } from '../../services/report/report';
import { LoginService } from '../../services/login/login';

export interface OptionForTest {
  optionId: number;
  optionText: string;
}

export interface QuestionForTest {
  questionId: number;
  text: string;
  questionType: 'MULTIPLE_CHOICE_QUESTION' | 'NUMERIC' | 'MULTIPLE_SELECT_QUESTION' | string;
  marks: number;
  difficulty: string;
  options: OptionForTest[]; // Holds student’s response.

  studentAnswer?: string | string[] | number | null | number[];
}

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
  ],
  templateUrl: './start.html',
  styleUrls: ['./start.css'],
})
export class Start implements OnInit {
  qid = '';
  loading = false;
  errorMsg = '';
  questions: QuestionForTest[] = []; // --- TIMER PROPERTIES ---

  timer: any;
  totalTimeInSeconds: number = 0;
  isQuizStarted: boolean = false;
  examDurationInMinutes: number = 0; // ------------------------ // --- PROPERTIES FOR PERSISTENCE ---
  quizStartTime: number = 0;
  quizDurationSeconds: number = 0;

  // 💡 NEW: This will hold saved answers fetched from the API
  private savedAnswers: { [key: number]: any } = {};

   // 💡 NEW: This holds the user ID.
  // TODO: You MUST replace '1' with your actual authentication logic (e.g., from an AuthService)
  // private userId: number=1;
  private userId: number=1;

  constructor(private locationSt: LocationStrategy, private route: ActivatedRoute,private reportService:ReportService,private loginService:LoginService) {
    // initialize userId after loginService is constructed
    this.userId = this.loginService.getUserId()!;
  }

 

  private examService = inject(Quiz);
  private ngZone: NgZone = inject(NgZone);
  private router = inject(Router);

  // constructor(private locationSt: LocationStrategy, private route: ActivatedRoute,private reportService:ReportService,private loginService:LoginService) {}

  ngOnInit(): void {
    this.qid = this.route.snapshot.params['qid'];
    this.getRemainingTime(); // Check localStorage first
    this.preventBackButton(); // Call after initialization check
  } // --- TIMER PERSISTENCE: CHECK LOCAL STORAGE ON INIT ---

  getRemainingTime() {
    const storedStartTime = localStorage.getItem('quizStartTime_' + this.qid);
    const storedDuration = localStorage.getItem('quizDurationSeconds_' + this.qid);

    if (storedStartTime && storedDuration) {
      this.quizStartTime = parseInt(storedStartTime, 10);
      this.quizDurationSeconds = parseInt(storedDuration, 10);

      const elapsedTime = Math.floor((Date.now() - this.quizStartTime) / 1000);
      const remainingTime = this.quizDurationSeconds - elapsedTime;

      if (remainingTime > 0) {
        // Quiz is ACTIVE and running
        this.totalTimeInSeconds = remainingTime;
        this.startTimer();
        this.isQuizStarted = true;
        this.loading = false;
        // 💡 MODIFIED: Load answers from API *then* load questions
        this.loadSavedAnswersAndQuestions(true);
        console.log(`Resuming timer for QID ${this.qid}. Remaining: ${this.totalTimeInSeconds}s`);
        return;
      } else {
        // Quiz found but EXPIRED -> Auto-submit
        this.totalTimeInSeconds = 0;
        this._handleSubmission(true);
        this.loading = false;
        return;
      }
    } // No stored data found -> Start NEW Quiz

    this.loadQuizDetailsAndQuestions();
  } // --- STEP 1: LOAD QUIZ DETAILS (Duration) AND THEN LOAD QUESTIONS ---

  loadQuizDetailsAndQuestions() {
    this.loading = true;
    this.errorMsg = '';

    this.examService.getQuizDetails(this.qid).subscribe({
      next: (quizData: any) => {
        const rawDuration = quizData.duration;
        this.examDurationInMinutes = parseInt(rawDuration, 10) || 15;
        this.quizDurationSeconds = this.examDurationInMinutes * 60;
        localStorage.setItem(
          'quizDurationSeconds_' + this.qid,
          this.quizDurationSeconds.toString()
        );
        this.totalTimeInSeconds = this.quizDurationSeconds;
        // 💡 MODIFIED: Load questions (no answers exist yet)
        this.loadQuestionsArray(false); // isResuming = false
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = 'Error loading quiz details (duration)';
        Swal.fire('Error', 'Error loading quiz details', 'error');
      },
    });
  }

  // 💡 NEW: Fetches saved answers and *then* questions
  loadSavedAnswersAndQuestions(isResuming: boolean) {
    this.loading = true;
    this.examService.getSavedResponses(this.userId, this.qid).subscribe({
      next: (responses: any[]) => {
        // 1. Populate the savedAnswers map
        this.populateSavedAnswers(responses);
        // 2. Now load the questions
        this.loadQuestionsArray(isResuming);
      },
      error: (err) => {
        console.error('Error fetching saved responses:', err);
        // Still load questions even if responses fail
        this.loadQuestionsArray(isResuming);
      },
    });
  } // --- STEP 2: LOAD QUESTIONS ARRAY (Separated from duration logic) ---

  loadQuestionsArray(isResuming: boolean) {
    if (!isResuming) this.loading = true;

    this.examService.getQuestionsForTest(this.qid).subscribe({
      next: (data: any) => {
        const received: any[] = Array.isArray(data) ? data : data.questions || [];

        this.questions = received.map((q): QuestionForTest => {
          // 💡 MODIFIED: Check for a saved answer *before* defaulting to null
          const savedAnswer = this.savedAnswers[q.questionId];

          const normalized: QuestionForTest = {
            questionId: q.questionId,
            text: q.text,
            questionType: q.questionType,
            marks: q.marks,
            difficulty: q.difficulty,
            options: Array.isArray(q.options) ? q.options : [],
            studentAnswer: savedAnswer, // Use the pre-parsed saved answer
          };

          // 💡 MODIFIED: Only initialize if no answer was saved
          if (savedAnswer === undefined) {
            switch (normalized.questionType) {
              case 'MULTIPLE_CHOICE_QUESTION':
              case 'NUMERIC':
                normalized.studentAnswer = null;
                break;
              case 'MULTIPLE_SELECT_QUESTION':
                normalized.studentAnswer = [];
                break;
              default:
                normalized.studentAnswer = null;
                break;
            }
          }
          return normalized;
        });

        this.loading = false; // Start Timer and store the START TIME only if it's a brand NEW quiz start

        if (!isResuming && this.totalTimeInSeconds > 0) {
          this.quizStartTime = Date.now();
          localStorage.setItem('quizStartTime_' + this.qid, this.quizStartTime.toString());

          this.startTimer();
          this.isQuizStarted = true;
        }
      },
      error: (err) => {
        console.error('Error loading questions:', err);
        this.loading = false;
        this.errorMsg = 'Error in loading questions of quiz';
        Swal.fire('Error', 'Error in loading questions of quiz', 'error');
      },
    });
  } // --- TIMER METHODS (Unchanged) ---

  startTimer() {
    this.ngZone.runOutsideAngular(() => {
      this.timer = setInterval(() => {
        if (this.totalTimeInSeconds > 0) {
          this.ngZone.run(() => {
            this.totalTimeInSeconds--;
          });
        } else {
          clearInterval(this.timer);
          this.ngZone.run(() => {
            this.clearTimerStorage();
            this._handleSubmission(true);
          });
        }
      }, 1000);
    });
  }

  getFormattedTime(): string {
    const minutes = Math.floor(this.totalTimeInSeconds / 60);
    const seconds = this.totalTimeInSeconds % 60;

    const minStr = minutes < 10 ? '0' + minutes : minutes.toString();
    const secStr = seconds < 10 ? '0' + seconds : seconds.toString();

    return `${minStr}:${secStr}`;
  }

  // --- 💡 NEW: API-BASED ANSWER HANDLING ---

  // Populates the this.savedAnswers map from the API response
  private populateSavedAnswers(responses: any[]) {
    this.savedAnswers = {};
    if (!responses) return;

    // We must parse the API's string[] back into the frontend's number | number[]
    responses.forEach((resp) => {
      const savedValue = resp.selectedResponse; // This is string[]

 
      this.savedAnswers[resp.questionId] = resp.selectedResponse;
    });
  }

  // Called by all answer change methods to save to API
  private saveSingleResponse(question: QuestionForTest) {
    if (!this.isQuizStarted) return; // Don't save if quiz is not active

    const payload = {
      userId: this.userId, // TODO: Replace with dynamic user ID
      examId: parseInt(this.qid, 10),
      questionId: question.questionId,
      selectedResponse: this.formatAnswerForApi(question.studentAnswer),
      markedForReview: false, // TODO: Add a checkbox for this
    };

    // Fire-and-forget save
    this.examService.saveResponse(payload).subscribe({
      next: (resp) => console.log('Saved response for QID:', question.questionId, resp),
      error: (err) => console.error('Failed to save response for QID:', question.questionId, err),
    });
  }

  // Formats the frontend answer (number | number[]) into the backend DTO (string[])
  private formatAnswerForApi(answer: any): string[] {
    if (answer === null || answer === undefined) {
      return [];
    }
    if (Array.isArray(answer)) {
      // For MULTIPLE_SELECT_QUESTION (number[])
      return answer.map(String);
    }
    // For MULTIPLE_CHOICE_QUESTION or NUMERIC (number)
    return [String(answer)];
  } // --- ANSWER HANDLING METHODS (UPDATED to save to API) ---

  // Helper to parse API string[] back to frontend format
  // This is now done inside the `loadQuestionsArray` map

  isCheckedMulti(question: QuestionForTest, optionId: number): boolean {
    if (Array.isArray(question.studentAnswer)) {
      const answers = question.studentAnswer as number[];
      return answers.includes(optionId);
    }
    return false;
  }

  onSelectSingle(question: QuestionForTest, option: OptionForTest) {
    question.studentAnswer = option.optionText;
    this.saveSingleResponse(question); // 💡 Save to API
  }

  onToggleMulti(question: QuestionForTest, option: OptionForTest, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const arr = (question.studentAnswer as string[]) ?? [];
    const key = option.optionText;

    if (checkbox.checked) {
      if (!arr.includes(key)) arr.push(key);
    } else {
      const idx = arr.indexOf(key);
      if (idx !== -1) arr.splice(idx, 1);
    }
    question.studentAnswer = arr;
    this.saveSingleResponse(question); // 💡 Save to API
  }

  onNumericInput(question: QuestionForTest, event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();
    question.studentAnswer = value === '' ? null : Number(value);
    this.saveSingleResponse(question); // 💡 Save to API
  }

  trackByQuestionId(_index: number, q: QuestionForTest) {
    return q.questionId;
  } // --- SUBMISSION LOGIC (MODIFIED) ---

  submitAnswers() {
    // Confirmation for Manual Submission
    Swal.fire({
      title: 'Submit Quiz?',
      text: 'Are you sure you want to finish the quiz now?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Submit!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._handleSubmission();
      }
    });
  }

  private _handleSubmission(isAutoSubmit: boolean = false) {
  if (this.timer) {
    clearInterval(this.timer);
  }

  this.clearTimerStorage();
  this.isQuizStarted = false;

  this.examService.getFinalResult(this.qid, this.userId).subscribe({
    next: (response: any) => {
      const finalScore = response.totalMarks;

      console.log('Final Result Fetched:', response);

      // ✅ Call report generation API
      const examId = parseInt(this.qid, 10);
      if (!examId) {
        console.error('Invalid exam id:', this.qid);
      } else {
        this.reportService.generateReport(this.userId, examId).subscribe({
          next: (report) => {
            console.log('Report saved successfully:', report);
          },
          error: (err) => {
            console.error('Failed to save report:', err);
          }
        });
      }

      const title = isAutoSubmit ? 'Time is Up!' : 'Submitted!';
      let text = isAutoSubmit
        ? 'Your answers have been automatically recorded.'
        : 'Quiz submitted successfully.';

      Swal.fire({
        title: title,
        text: `${text} Your score is: ${finalScore} marks.`,
        icon: 'success',
      }).then(() => {
        this.router.navigate(['/'], { replaceUrl: true });
      });
    },
    error: (err) => {
      console.error('Failed to fetch final result:', err);
      Swal.fire('Error', 'Submission successful, but failed to fetch final result.', 'error').then(() => {
        this.router.navigate(['/'], { replaceUrl: true });
      });
    }
  });
}

//   private _handleSubmission(isAutoSubmit: boolean = false) {
//     // 1. Stop the timer
//     if (this.timer) {
//         clearInterval(this.timer);
//     }

//     this.clearTimerStorage(); // Mark quiz as finished
//     this.isQuizStarted = false;

//     // 2. Call the new API to fetch the aggregated result
//     this.examService.getFinalResult(this.qid, this.userId).subscribe({
//         next: (response: any) => {
//             const finalScore = response.totalMarks; // Expects { "totalMarks": 50.0 }

//             console.log('Final Result Fetched:', response);

//             const title = isAutoSubmit ? 'Time is Up!' : 'Submitted!';
//             let text = isAutoSubmit
//                 ? 'Your answers have been automatically recorded.'
//                 : 'Quiz submitted successfully.';

//             // 3. Display the score in the success alert
//             Swal.fire({
//                 title: title,
//                 text: `${text} Your score is: ${finalScore} marks.`,
//                 icon: 'success',
//             }).then(() => {
//                 // Navigate to home page
//                 this.router.navigate(['/'], { replaceUrl: true });
//             });
//         },
//         error: (err) => {
//             console.error('Failed to fetch final result:', err);

//             // Handle errors (e.g., the 404/CORS issue) by showing a generic message
//             Swal.fire('Error', 'Submission successful, but failed to fetch final result. Check console.', 'error').then(() => {
//                 this.router.navigate(['/'], { replaceUrl: true });
//             });
//         }
//     });
// }

// Helper function to clear local storage

  clearTimerStorage() {
    localStorage.removeItem('quizStartTime_' + this.qid);
    localStorage.removeItem('quizDurationSeconds_' + this.qid);
    // 💡 We don't clear answers from localStorage anymore, as they are on the server
  } // ------------------------ // 🚀 FIX: Implement submission prompt logic for the browser back button
  preventBackButton() {
    history.pushState(null, '', location.href);

    this.locationSt.onPopState(() => {
      if (this.isQuizStarted && this.totalTimeInSeconds > 0) {
        Swal.fire({
          title: 'WARNING: Exit Quiz?',
          // 💡 Text updated to reflect auto-save
          text: 'Your answers are being saved automatically. Leaving will end your attempt. Do you wish to exit?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, Exit',
          cancelButtonText: 'No, Continue Quiz',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            // User confirmed exit -> Just handle the submission finalization
            // We call _handleSubmission() without auto-submit flag
            this._handleSubmission();
          } else {
            // Stay on the page
            history.pushState(null, '', location.href);
          }
        });
      } else {
        // Allow navigation
      }
    });
  }
}
