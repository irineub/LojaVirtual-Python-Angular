import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {phosphorWhatsappLogoDuotone, phosphorLinkedinLogoDuotone} from '@ng-icons/phosphor-icons/duotone';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIconComponent],
  providers: [provideIcons({ phosphorWhatsappLogoDuotone, phosphorLinkedinLogoDuotone})],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
