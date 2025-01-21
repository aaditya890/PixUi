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

  constructor(private webService: WebService, private authService: AuthService) { }

  async ngOnInit(): Promise<void> {
    try {
      // Fetch customer data from the WebService
      const data = await this.webService.getCustomers();
      if (data) {
        // Format the `date_time` field for each customer
        this.customers = data.map((customer) => ({
          ...customer,
          formattedDate: this.formatDate(customer.date_time), // Format the date

        }));
      } else {
        console.error('Failed to fetch customers');
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  }

  // Format date to DD/MM/YYYY
  private formatDate(dateTime: string): string {
    const date = new Date(dateTime);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  logout(): void {
    this.authService.logout();
    this.authService.clearAdminLoginState();
    window.location.reload()
  }

}

