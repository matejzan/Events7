import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-fullscreen-loader',
  templateUrl: './fullscreen-loader.component.html',
  styleUrls: ['./fullscreen-loader.component.scss']
})
export class FullscreenLoaderComponent implements OnChanges {

  setOpacityToZero = false;
  setZIndexToZero = false;

  @Input() loaderShown = true;
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes.loaderShown.currentValue === false) {
      this.setOpacityToZero = true;
      setTimeout(() => {
        this.setZIndexToZero = true;
        document.getElementById("events7")?.classList.remove('overflowY-hidden')
      }, 300)
    }
  }
}
