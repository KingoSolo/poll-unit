import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PollsService } from '../../../core/services/polls';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatIconModule],
  templateUrl: './results.html',
  styleUrl: './results.scss',
})
export class Results implements OnInit {
  poll: any = null;
  results: { optionText: string; voteCount: string }[] = [];
  pollId!: number;
  filterForm!: FormGroup;
  loading = true;

  states = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi',
    'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta',
    'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi',
    'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun',
    'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
    'Taraba', 'Yobe', 'Zamfara',
  ];

  constructor(
    private route: ActivatedRoute,
    private pollsService: PollsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.pollId = Number(this.route.snapshot.paramMap.get('id'));

    this.filterForm = this.fb.group({ state: [''] });

    this.pollsService.getPoll(this.pollId).subscribe({
      next: (res: any) => { this.poll = res; },
    });

    this.getResults();

    this.filterForm.get('state')?.valueChanges.subscribe((state) => {
      this.getResults(state || undefined);
    });
  }

  getResults(state?: string) {
    this.loading = true;
    this.pollsService.getResults(this.pollId, state).subscribe({
      next: (res: any) => {
        this.results = res;
        this.loading = false;
      },
      error: () => { this.loading = false; },
    });
  }

  get totalVotes(): number {
    return this.results.reduce((sum, r) => sum + Number(r.voteCount), 0);
  }

  getPercentage(voteCount: string): number {
    if (!this.totalVotes) return 0;
    return Math.round((Number(voteCount) / this.totalVotes) * 100);
  }
}
