import { Injectable, NgZone } from '@angular/core';
import { createClient, SupabaseClient} from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  private supabase!: SupabaseClient;

  constructor(private ngZone: NgZone) {
    // Initialize the Supabase client
    this.initialize();
  }

  private async initialize() {
    this.supabase = this.ngZone.runOutsideAngular(() =>
      createClient(environment.supabaseUrl, environment.supabaseKey)
    );
    console.log('Supabase client initialized');
  }

  private async ensureInitialized() {
    if (!this.supabase) {
      await this.initialize();
    }
  }

  async sendEnquiryDataToAdmin(enquiryData: Object) {
    try {
      // Ensure the Supabase client is initialized
      await this.ensureInitialized();

      const { data, error } = await this.supabase.from('customers').insert([enquiryData]);
      if (error) {
        console.error('Error sending enquiry:', error.message);
        return false;
      }
      console.log('Enquiry sent successfully:', data);
      return true;
    } catch (err) {
      console.error('Unexpected error:', err);
      return false;
    }
  }
  
  // Fetch customers from the database
  async getCustomers(): Promise<any[]> {
    await this.ensureInitialized();

    try {
      const { data, error } = await this.supabase.from('customers').select('*');
      if (error) {
        console.error('Error fetching customers:', error.message);
        return [];
      }
      return data || [];
    } catch (err) {
      console.error('Unexpected error:', err);
      return [];
    }
  }
}
