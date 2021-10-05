import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit, OnChanges {

  @Input() dialogOpen = false;
  @Input() closeDialogFromParentComponent = false;
  @Output() dialogClose = new EventEmitter<string>();

  zIndexDialogOpen = false;
  opacityDialogOpen = false;

  closeDialog() {
    document.getElementById('events7')?.classList.remove("overflowY-hidden");
    this.opacityDialogOpen = false;
    setTimeout(() => {
      this.dialogClose.emit();
      this.zIndexDialogOpen = false;
    }, 300)
  }

  closeOutsideClick(e: MouseEvent) {
    if (e.target === document.getElementById('dialog')) {
      this.closeDialog();
    }
  }

  ngOnInit(): void {
    document.addEventListener('keyup', (event) => {
      if (event.keyCode === 27) {
        this.closeDialog();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dialogOpen && changes.dialogOpen.currentValue === true) {
      this.zIndexDialogOpen = true;
      this.opacityDialogOpen = true;
      document.getElementById('events7')?.classList.add("overflowY-hidden");
    } else if (changes.closeDialogFromParentComponent && changes.closeDialogFromParentComponent.currentValue === true) {
      this.closeDialog();
    }
  }
}
