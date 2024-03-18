import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { MsgsService } from '../msgs.service';

@Component({
  selector: 'app-brick-breaker',
  templateUrl: './brick-breaker.component.html',
  styleUrls: ['./brick-breaker.component.scss']
})
export class BrickBreakerComponent implements OnInit, OnDestroy {
  screenHeight: number = 400;
  level: number = 10;
  mute: boolean = false;

  beta: number | null = null; // Initialize beta value
  alpha: number | null = null; // Initialize beta value
  gamma: number | null = null; // Initialize beta value

  @HostListener('window:deviceorientation', ['$event'])

  onDeviceOrientation(event: DeviceOrientationEvent) {
    // Handle device orientation data here
    this.alpha = event.alpha as number; // Z-axis rotation (0 to 360 degrees)
    this.beta = event.beta as number;   // X-axis rotation (-180 to 180 degrees)
    this.gamma = event.gamma as number; // Y-axis rotation (-90 to 90 degrees)

    if (this.gamma > 0 && this.paddleX <= ((window.innerWidth * .9) - 105))
      this.paddleX = this.paddleX + 5
    else if (this.gamma < 0 && this.paddleX > 0)
      this.paddleX = this.paddleX - 5
    // Detect swaying or tilting based on the orientation data
    // Example: Check if beta or gamma values exceed certain thresholds
  }

  paddleX: number = 0;
  ballX: number = 50;
  ballY: number = 50;
  dx: number = 2;
  dy: number = -2;

  mySubsctription!: Subscription
  constructor(private msgsService: MsgsService) { }
  ngOnDestroy(): void {
    this.mySubsctription.unsubscribe();
    window.removeEventListener('deviceorientation', this.onDeviceOrientation);
  }

  ngOnInit(): void {
    window.addEventListener('deviceorientation', this.onDeviceOrientation);
    this.mySubsctription = interval(this.level).subscribe(x => {
      this.moveBall();
    })
  }

  playHitSound() {
    const audioElement = <HTMLAudioElement>document.getElementById('hitSound');
    audioElement.play();
  }

  movePaddle(event: any) {
    this.paddleX = event.clientX - event.target.getBoundingClientRect().left - (this.paddleX > 100 ? 100 : 0);
  }

  moveBall() {
    if (this.ballX + this.dx > ((window.innerWidth * .9) - 30) || this.ballX + this.dx < 10) {
      this.dx = -this.dx;
    }
    if (this.ballY + this.dy < 0) {
      this.dy = -this.dy; 
      if (!this.mute)
        this.playHitSound();
    } else if (this.ballY + this.dy > this.screenHeight - 25 &&
      this.ballY + this.dy < this.screenHeight &&
      this.ballX > this.paddleX &&
      this.ballX < this.paddleX + 150) {
      this.dy = -this.dy;
    } else if (this.ballY + this.dy > this.screenHeight - 25) {
      this.msgsService.msgSuccess('Game Over', 1000, true)
      this.paddleX = 0;
      this.ballX = 50;
      this.ballY = 50;
      this.dx = 2;
      this.dy = -2;
    }

    this.ballX += this.dx;
    this.ballY += this.dy;
  }
}
