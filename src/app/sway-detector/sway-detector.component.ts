import { Component } from '@angular/core';

@Component({
  selector: 'app-sway-detector',
  templateUrl: './sway-detector.component.html',
  styleUrls: ['./sway-detector.component.scss']
})
export class SwayDetectorComponent {
  beta: number | null = null; // Initialize beta value
  alpha: number | null = null; // Initialize beta value
  gamma: number | null = null; // Initialize beta value

  Any:any
  constructor() {
    this.handleDeviceOrientation = this.handleDeviceOrientation.bind(this); // Bind the context of the method
  }

  ngOnInit() {
    window.addEventListener('deviceorientation', this.handleDeviceOrientation);
  }

  ngOnDestroy() {
    window.removeEventListener('deviceorientation', this.handleDeviceOrientation);
  }

  handleDeviceOrientation(event: DeviceOrientationEvent) {
    // Extract beta value (X-axis rotation)
    this.alpha = event.alpha as number; // Z-axis rotation (0 to 360 degrees)
    this.beta = event.beta as number;   // X-axis rotation (-180 to 180 degrees)
    this.gamma = event.gamma as number; // Y-axis rotation (-90 to 90 degrees)


    this.Any = event
  }
}
