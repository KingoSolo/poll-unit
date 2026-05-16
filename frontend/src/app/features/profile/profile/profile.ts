import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class Profile implements OnInit {
  user = { fullName: '', email: '', voterId: '', verified: false, state: '' };
  stats = { totalPollsParticipated: 0 };

  showPasswordForm = false;
  passwordForm!: FormGroup;
  passwordSubmitting = false;
  passwordError = '';
  passwordSuccess = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });

    if (!isPlatformBrowser(this.platformId)) return;

    this.authService.getMe().subscribe({
      next: (res: any) => {
        this.user = {
          fullName: `${res.firstName} ${res.lastName}`,
          email: res.email,
          voterId: res.voterId,
          verified: res.verified,
          state: res.state,
        };
        this.stats = { totalPollsParticipated: res.totalPollsParticipated };
        this.cdr.detectChanges();
      },
      error: () => {
        this.router.navigate(['/login']);
      },
    });
  }

  togglePasswordForm() {
    this.showPasswordForm = !this.showPasswordForm;
    this.passwordForm.reset();
    this.passwordError = '';
    this.passwordSuccess = '';
  }

  submitPassword() {
    if (this.passwordForm.invalid) return;

    const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;

    if (newPassword !== confirmPassword) {
      this.passwordError = 'New passwords do not match.';
      return;
    }

    this.passwordSubmitting = true;
    this.passwordError = '';
    this.passwordSuccess = '';

    this.authService.updatePassword(currentPassword, newPassword).subscribe({
      next: () => {
        this.passwordSuccess = 'Password updated successfully.';
        this.passwordSubmitting = false;
        this.passwordForm.reset();
        this.showPasswordForm = false;
      },
      error: (err) => {
        this.passwordError = err?.error?.message || 'Failed to update password.';
        this.passwordSubmitting = false;
      },
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
