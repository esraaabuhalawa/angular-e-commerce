import { Component } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
@Component({
  selector: 'app-product-skelton',
  imports: [],
  templateUrl: './product-skelton.component.html',
  styleUrl: './product-skelton.component.scss'
})
export class ProductSkeltonComponent {
  constructor(private flowbiteService: FlowbiteService) {}
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
}
