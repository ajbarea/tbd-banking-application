import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Output() btnClick = new EventEmitter();

  @Input() disabled = false;
 
  onClick(){
    this.btnClick.emit();
  }
}
