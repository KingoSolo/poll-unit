import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PollsService } from '../../../core/services/polls';

@Component({
  selector: 'app-results',
  imports: [CommonModule, ReactiveFormsModule,],
  templateUrl: './results.html',
  styleUrl: './results.scss',
})
export class Results implements OnInit{
   results: any[] = [];

  pollId!: number;

  filterForm!: FormGroup;

  states = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi',
    'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta',
    'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi',
    'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun',
    'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
    'Taraba', 'Yobe', 'Zamfara'
  ];

  constructor(
    private route: ActivatedRoute,
    private pollsService: PollsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {

    // get poll id from route
    this.pollId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    // build form
    this.filterForm = this.fb.group({
      state: ['']
    });
    this.getResults();

    this.filterForm
      .get('state')
      ?.valueChanges
      .subscribe((state) => {

        this.getResults(state);

      });

  }

  getResults(state?: string) {

    this.pollsService
      .getResults(this.pollId, state)
      .subscribe({

        next: (res: any) => {

          this.results = res;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }
}
