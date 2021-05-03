import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface CarouselSlide {
  url: string,
  title?: string,
  description?: string,
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  public slides: Array<CarouselSlide> = [];

  @Input()
  public showControls: boolean = true;

  @Input()
  public showNavigation: boolean = true;

  @ViewChild('slidesRef') slidesRef!: ElementRef;

  public currentIndex: number = 1;

  private unsuscribe$: Subject<void> = new Subject();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsuscribe$.next();
  }

  ngAfterViewInit(): void {
    window.addEventListener('resize', this.handleWindowResize);
    this.slidesRef.nativeElement.addEventListener('transitionend', this.handleTransitionEnd);
    this.setCurrentSlidePosition();
    this.autoPlay();
  }

  public setSlideAtIndex(slideIndex: number): void {
    this.setCurrentIndex(slideIndex);
    this.setCurrentSlidePosition();
  }

  public setNextSlide(): void {
    this.setNextIndex();
    this.setSliderTransition();
    this.setCurrentSlidePosition();
  }

  public setPreviousSlide(): void {
    this.setPreviousIndex();
    this.setSliderTransition();
    this.setCurrentSlidePosition();
  }

  private setCurrentIndex(slideIndex: number): void {
    this.currentIndex = slideIndex;
  }

  private setSliderTransition(): void {
    this.slidesRef.nativeElement.style.transition = 'transform 0.5s ease-in-out';
  }

  private removeSliderTransition(): void {
    this.slidesRef.nativeElement.style.transition = 'none';
  }

  private setCurrentSlidePosition(): void {
    const slideWidth = this.slidesRef.nativeElement.clientWidth;
    this.slidesRef.nativeElement.style.transform = `translateX(${-slideWidth * this.currentIndex}px)`;
  }

  private setNextIndex(): void {
    if (this.currentIndex >= this.slides.length + 1) return;
    this.currentIndex++;
  }

  private setPreviousIndex(): void {
    if (this.currentIndex <= 0) return;
    this.currentIndex--;
  }

  private handleTransitionEnd = () => {
    if (this.currentIndex === this.slides.length + 1) {
      this.removeSliderTransition();
      this.currentIndex = 1;
      this.setCurrentSlidePosition();
      return;
    }

    if (this.currentIndex === 0) {
      this.removeSliderTransition();
      this.currentIndex = this.slides.length;
      this.setCurrentSlidePosition();
      return;
    }
  }

  private handleWindowResize = () => {
    this.removeSliderTransition();
    this.setCurrentSlidePosition();
  }

  private autoPlay(): void {
    interval(4000).pipe(
      takeUntil(this.unsuscribe$),
    ).subscribe(() => {
      this.setNextSlide();
    });
  }
}
