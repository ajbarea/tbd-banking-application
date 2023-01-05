import { Component, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  constructor(private router: Router, private route: ActivatedRoute){}

  @Input() title: string = '';
  
  return() {
    this.router.navigate(['./'], {relativeTo: this.route.parent});
  }

}
