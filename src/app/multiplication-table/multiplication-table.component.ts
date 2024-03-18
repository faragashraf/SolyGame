import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multiplication-table',
  templateUrl: './multiplication-table.component.html',
  styleUrls: ['./multiplication-table.component.scss']
})
export class MultiplicationTableComponent {

constructor(private router: Router){}

  question: string = '';
  choices: number[] = [];
  answer: number = 0;

  clapSound!: HTMLAudioElement;
  ohhSound!: HTMLAudioElement;

  backToMenu(): void {
    this.router.navigate(['']);
  }
  ngOnInit(): void {
    this.clapSound = new Audio('/assets/claps2.mp3');
    this.ohhSound = new Audio('/assets/ohhh.mp3');
    this.generateQuestion();
  }

  generateQuestion(): void {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    this.answer = num1 * num2;
    this.question = `${num1} x ${num2} = ?`;

    // Generate choices
    this.choices = [];
    this.choices.push(this.answer);
    while (this.choices.length < 3) {
      const choice = Math.floor(Math.random() * 100) + 1;
      if (this.choices.indexOf(choice) === -1) {
        this.choices.push(choice);
      }
    }
    this.shuffleArray(this.choices);
  }

  shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  checkAnswer(selectedAnswer: number): void {
    if (selectedAnswer === this.answer) {
      this.clapSound.play();
    } else {
      this.ohhSound.play();
    }
    this.generateQuestion();
  }
}
