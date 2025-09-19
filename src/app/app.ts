import { UserService } from './core/auth/services/user.service';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('E-commerce-project');
  private readonly UserService = inject(UserService);
  ngOnInit() {
    this.UserService.loadUserFromToken();
  }
}
