import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PollsService } from '../../core/services/polls';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MatIconModule, MatSnackBarModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin implements OnInit {
  polls: any[] = [];
  view: 'list' | 'form' = 'list';
  editingPoll: any = null;
  loading = false;
  submitting = false;

  pollForm!: FormGroup;

  constructor(
    private pollsService: PollsService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadPolls();
  }

  get options(): FormArray {
    return this.pollForm.get('options') as FormArray;
  }

  loadPolls() {
    this.loading = true;
    this.pollsService.getPolls().subscribe({
      next: (res: any) => {
        this.polls = res;
        this.loading = false;
      },
      error: () => { this.loading = false; },
    });
  }

  openCreate() {
    this.editingPoll = null;
    this.pollForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      options: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
      ]),
    });
    this.view = 'form';
  }

  openEdit(poll: any) {
    this.editingPoll = poll;
    this.pollForm = this.fb.group({
      title: [poll.title, Validators.required],
      description: [poll.description, Validators.required],
      options: this.fb.array(
        poll.options.map((o: any) => this.fb.control(o.optionText, Validators.required))
      ),
    });
    this.view = 'form';
  }

  addOption() {
    if (this.options.length < 4) {
      this.options.push(this.fb.control('', Validators.required));
    }
  }

  removeOption(index: number) {
    if (this.options.length > 2) {
      this.options.removeAt(index);
    }
  }

  submitForm() {
    if (this.pollForm.invalid) return;
    this.submitting = true;

    const payload = {
      title: this.pollForm.value.title,
      description: this.pollForm.value.description,
      options: this.pollForm.value.options,
    };

    const request$ = this.editingPoll
      ? this.pollsService.updatePoll(this.editingPoll.id, payload)
      : this.pollsService.createPoll(payload);

    request$.subscribe({
      next: () => {
        this.snackBar.open(
          this.editingPoll ? 'Poll updated' : 'Poll created',
          'Close',
          { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' }
        );
        this.submitting = false;
        this.view = 'list';
        this.loadPolls();
      },
      error: (err) => {
        this.snackBar.open(err?.error?.message || 'Something went wrong', 'Close', {
          duration: 4000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.submitting = false;
      },
    });
  }

  closePoll(poll: any) {
    this.pollsService.closePoll(poll.id).subscribe({
      next: () => {
        this.snackBar.open('Poll closed', 'Close', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });
        this.loadPolls();
      },
      error: (err) => {
        this.snackBar.open(err?.error?.message || 'Failed to close poll', 'Close', {
          duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'right', verticalPosition: 'top',
        });
      },
    });
  }

  deletePoll(poll: any) {
    this.pollsService.deletePoll(poll.id).subscribe({
      next: () => {
        this.snackBar.open('Poll deleted', 'Close', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });
        this.loadPolls();
      },
      error: (err) => {
        this.snackBar.open(err?.error?.message || 'Failed to delete poll', 'Close', {
          duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'right', verticalPosition: 'top',
        });
      },
    });
  }

  viewResults(poll: any) {
    this.router.navigate(['/polls', poll.id, 'results']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  cancel() {
    this.view = 'list';
    this.editingPoll = null;
  }
}
