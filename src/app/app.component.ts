import { Component } from '@angular/core';
import { CarouselSlide } from './shared/components/carousel/carousel.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public slides: Array<CarouselSlide> = [
    { url: 'https://i.imgur.com/HbfI69P.jpg' },
    { url: 'https://i.imgur.com/RNymQ9E.jpg' },
    { url: 'https://i.imgur.com/kYh9dMf.jpg' }
  ];

}
