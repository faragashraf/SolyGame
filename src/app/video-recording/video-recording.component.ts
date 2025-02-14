import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { Subject, Subscription, interval } from 'rxjs';
@Component({
  selector: 'app-video-recording',
  templateUrl: './video-recording.component.html',
  styleUrls: ['./video-recording.component.scss'],
  providers:[DatePipe]
})
export class VideoRecordingComponent {
  @ViewChild('videoElement') videoElement!: ElementRef;
  mediaRecorder!: MediaRecorder;
  chunks: Blob[] = [];
  bufferArray: Uint8Array[] = [];
  constructor(private datePipe: DatePipe) { }

  videoStream: MediaStream = {} as MediaStream;
  signalRConnection!: signalR.HubConnection;
  intervalSubscription!: Subscription
  async ngOnInit() {
    // Establish SignalR connection
    this.signalRConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://192.168.1.115/SignalR/ChatHub')
      .configureLogging(signalR.LogLevel.Debug)
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: retryContext => {
          // Set the retry interval to 10 seconds
          return 3000; // 10 seconds in milliseconds
        }
      })
      .build();




    await this.signalRConnection.start()
      .then(y => {
        let sessionTime: number = 15
        this.startRecording()
        this.intervalSubscription = interval(1000).subscribe(x => {
          sessionTime--

          if (sessionTime == 15) {
            this.startRecording()
          }
          else if (sessionTime == 0) {

            this.stopRecording();
            this.saveRecording();
            sessionTime = 16

            //this.intervalSubscription.unsubscribe();
          }
        });
      });
  }

  async startRecording() {

    this.videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
    this.videoElement.nativeElement.srcObject = this.videoStream;
    this.mediaRecorder = new MediaRecorder(this.videoStream);

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.chunks.push(event.data);
      }
    };
    this.mediaRecorder.start();
  }

  async stopRecording() {
    await this.mediaRecorder.stop();
  }

  saveRecording() {
    const date = new Date()
    const formattedDate = this.datePipe.transform(date, 'yy-MM-dd mm-ss'); // Adjust the format as needed
    const blob = new Blob(this.chunks, { type: 'video/mp4' });
    const fileName = 'myFile';
    const fileType = 'video/mp4'; // Adjust the file type as needed
    let _file = this.blobsToFile(this.chunks, fileName, fileType)
    this.chunks = []
    const subject = new Subject<any>();
    this.signalRConnection.send("Upload", subject,formattedDate);


    if (typeof Worker !== 'undefined') {
      // Create a new F:\repos\SWB\ENPO.SupportWorkBench.FrontEnd\src\app\components\FTP\services\Ftp.worker.ts
      const worker = new Worker(new URL('../Ftp.worker.ts', import.meta.url));
      worker.onmessage = ({ data }) => {

        if (data.result === 'complete') {
          subject.complete();
        }
        else if (data.result != undefined) {
          subject.next(data.result)
        }
      };
      worker.postMessage(_file);
    }



    // // Concatenate all the data chunks into a single Blob
    // const url = window.URL.createObjectURL(blob);
    // // Use Angular's HttpClient to save the recording to a server
    // // Example:
    // // this.httpClient.post('your-save-url', blob).subscribe(response => {
    // //   console.log('Recording saved successfully');
    // // });

    // // For demonstration, you can also create a link to download the recording locally
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'recording.mp4';
    // document.body.appendChild(a);
    // a.click();
    // window.URL.revokeObjectURL(url);
  }

  blobsToFile(blobs: Blob[], fileName: string, fileType: string): File {
    // Concatenate all blobs into one Blob
    const blob = new Blob(blobs, { type: fileType });

    // Create a File from the Blob
    const file = new File([blob], fileName, { type: fileType });

    return file;
  }

  async captureStreamBytes(stream: MediaStream): Promise<Uint8Array> {
    const bytesArrays: Uint8Array[] = [];
    const videoElement = document.createElement('video');
    videoElement.srcObject = stream;
    videoElement.play(); // Start playing the video stream

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as any;

    // Wait for the video to load metadata (required for accurate canvas dimensions)
    await new Promise(resolve => videoElement.onloadedmetadata = resolve);

    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    // Draw the current frame onto the canvas
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Get the raw pixel data from the canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Convert the pixel data to Uint8Array
    const bytes = new Uint8Array(imageData.data.buffer);
    bytesArrays.push(bytes)
    return bytes;
  }


}


