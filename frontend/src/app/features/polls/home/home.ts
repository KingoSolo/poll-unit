import { Component, OnInit } from '@angular/core';
import { PollsService } from '../../../core/services/polls';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, MatIconModule, MatSnackBarModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {

  polls: any[] = [];

  constructor(private pollsService: PollsService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getPolls();
  }

  getPolls() {

    this.pollsService.getPolls().subscribe({

      next: (res: any) => {
        this.polls = res;
      },

    
      error: (err) => {
        this.snackBar.open(err?.error?.message || 'Failed to load polls', 'Close', {
          duration: 4000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    });

  }
}