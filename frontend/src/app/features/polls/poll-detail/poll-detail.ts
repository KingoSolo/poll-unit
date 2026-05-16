import { Component, OnInit } from '@angular/core';
import { PollsService } from '../../../core/services/polls';

import { ActivatedRoute, RouterModule } from '@angular/router';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-poll-detail',
  imports: [ReactiveFormsModule, CommonModule, RouterModule, MatSnackBarModule, MatIconModule],
  templateUrl: './poll-detail.html',
  styleUrls: ['./poll-detail.scss']
})
export class PollDetailComponent implements OnInit {

  poll: any;
  loading = true;
  voteForm!: FormGroup;
  hasVoted = false;

  constructor(
    private pollsService: PollsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {

    this.voteForm = this.fb.group({
      optionId: ['', Validators.required]
    });

    this.getPoll();

  }

  getPoll() {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.pollsService.getPoll(id).subscribe({

      next: (res: any) => {
        this.poll = res;
        this.loading = false;
      },

      error: (err) => {
        this.loading = false;
        this.snackBar.open(err?.error?.message || 'Failed to load poll', 'Close', {
          duration: 4000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }

    });

  }

  submitVote() {

    if (this.voteForm.invalid) {
      return;
    }

    const data = {
      pollId: this.poll.id,
      optionId: this.voteForm.value.optionId
    };

    this.pollsService.vote(data).subscribe({

      next: () => {

        this.snackBar.open('Vote submitted successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });

        this.hasVoted = true;

        this.voteForm.disable();

      },

      error: (err) => {
        this.snackBar.open(err?.error?.message || 'Vote failed', 'Close', {
          duration: 4000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }

    });

  }
}