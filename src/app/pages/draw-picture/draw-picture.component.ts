import { PictureUpload } from './../../core/picture-it/picture-it.model';
import { Pictures } from './../../core/picture-it/picture-it.actions';
import {
    Component, Input, ElementRef, AfterViewInit, ViewChild, ChangeDetectionStrategy, NgZone
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators'
import { AppHeaderTitleService } from 'src/app/app-header-title.service';
import {  Router } from '@angular/router';

@Component({
    selector: 'draw-picture',
    styleUrls: ['./draw-picture.component.scss'],
    templateUrl: './draw-picture.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawPictureComponent {

    @ViewChild('canvas') public canvas: ElementRef | undefined;

    @ViewChild('title') public title: ElementRef | undefined;

    @Input() public width = 400;
    @Input() public height = 400;

    form = new FormGroup({
        title: new FormControl(''),
        tip: new FormControl(''),
    });

    private cx!: CanvasRenderingContext2D;

    constructor(
        headerTitleService: AppHeaderTitleService,
        private store: Store,
        private readonly ngZone: NgZone,
        private readonly router: Router
    ) {
        headerTitleService.set('Zeichne ein Bild');

    }



    public ngAfterViewInit() {
        const canvasEl: HTMLCanvasElement = this.canvas?.nativeElement;
        this.cx = canvasEl.getContext('2d')!;

        canvasEl.width = this.width;
        canvasEl.height = this.height;

        this.cx.lineWidth = 3;
        this.cx.lineCap = 'round';
        this.cx.strokeStyle = '#000';

        this.captureEvents(canvasEl);
    }

    private captureEvents(canvasEl: HTMLCanvasElement) {
        // this will capture all mousedown events from the canvas element
        fromEvent(canvasEl, 'mousedown')
            .pipe(
                switchMap((e) => {
                    // after a mouse down, we'll record all mouse moves
                    return fromEvent<MouseEvent>(canvasEl, 'mousemove')
                        .pipe(
                            // we'll stop (and unsubscribe) once the user releases the mouse
                            // this will trigger a 'mouseup' event
                            takeUntil(fromEvent<MouseEvent>(canvasEl, 'mouseup')),
                            // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
                            takeUntil(fromEvent<MouseEvent>(canvasEl, 'mouseleave')),
                            // pairwise lets us get the previous value to draw a line from
                            // the previous point to the current point
                            pairwise<MouseEvent>()
                        )
                })
            )
            .subscribe((res: [MouseEvent, MouseEvent]) => {
                const rect = canvasEl.getBoundingClientRect();

                // previous and current position with the offset
                const prevPos = {
                    x: res[0].clientX - rect.left,
                    y: res[0].clientY - rect.top
                };

                const currentPos = {
                    x: res[1].clientX - rect.left,
                    y: res[1].clientY - rect.top
                };

                // this method we'll implement soon to do the actual drawing
                this.drawOnCanvas(prevPos, currentPos);
            });
    }

    private drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
        if (!this.cx) { return; }

        this.cx.beginPath();

        if (prevPos) {
            this.cx.moveTo(prevPos.x, prevPos.y); // from
            this.cx.lineTo(currentPos.x, currentPos.y);
            this.cx.stroke();
        }
    }

    submitForm() {
        const canvasEl: HTMLCanvasElement = this.canvas?.nativeElement;

        const file:FormData = new FormData();
        file.append('title', 'demoimg');
        file.append('file', this.dataURItoBlob(canvasEl.toDataURL('image/png')));
        const pictureUpload:PictureUpload = {
            file: file,
            title: this.form.value.title || '',
            tip: this.form.value.tip || '',
        };
        this.store.dispatch(
            new Pictures.UploadFile(pictureUpload)).subscribe( () => this.ngZone.run( () => this.router.navigateByUrl('/member/picture-it')));
    }

    private dataURItoBlob(dataURI:string):Blob {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ab], {type: mimeString});
    }


}
