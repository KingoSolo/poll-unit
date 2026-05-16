import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class Profile implements OnInit {
  user = {
    fullName: '',
    email: '',
    voterId: '',
    verified: false,
    state: '',
  };

  stats = {
    totalPollsParticipated: 0,
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getMe().subscribe({
      next: (res: any) => {
        this.user = {
          fullName: `${res.firstName} ${res.lastName}`,
          email: res.email,
          voterId: res.voterId,
          verified: res.verified,
          state: res.state,
        };
        this.stats = {
          totalPollsParticipated: res.totalPollsParticipated,
        };
      },
      error: () => {
        this.router.navigate(['/login']);
      },
    });
  }

  updatePassword() {
    // placeholder — wire to dialog when password change flow is built
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
