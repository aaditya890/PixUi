import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { WebService } from '../service/web.service';
@Component({
  selector: 'app-admin-pannel',
  standalone: true,
  imports: [],
  templateUrl: './admin-pannel.component.html',
  styleUrl: './admin-pannel.component.scss'
})
export class AdminPannelComponent {
  customers: any[] = [];

  constructor(private webService: WebService) {}

  async ngOnInit(): Promise<void> {
    try {
      // Fetch customer data from the WebService
      const data = await this.webService.getCustomers();
      if (data) {
        this.customers = data;
      } else {
        console.error('Failed to fetch customers');
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  }
}

