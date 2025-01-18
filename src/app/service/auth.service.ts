import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthChangeEvent, AuthSession, createClient, Session, SupabaseClient, User, } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private adminLoggedIn: boolean = false;
  constructor(private router:Router,private ngZone: NgZone) { }
  private supabase!: SupabaseClient;
  _session: AuthSession | null = null;


  // Initialize the Supabase client
  async initialize() {
    this.supabase = this.ngZone.runOutsideAngular(() =>
      createClient(environment.supabaseUrl, environment.supabaseKey)
    );
    return this.supabase;
  }

  async testConnection() {
    try {
      const { data, error } = await this.supabase.from('customers').select('*');
      if (error) {
        console.error('Error fetching data:', error.message);
        return null;
      }
      console.log('Data fetched successfully:', data);
      return data;
    } catch (err) {
      console.error('Unexpected error:', err);
      return null;
    }
  }
  

  // Log in as admin
  loginAsAdmin(): void {
    this.adminLoggedIn = true;
    this.router.navigate(['/admin']);
  }

  // Log out admin
  logout(): void {
    this.adminLoggedIn = false;
  }

  // Check if admin is logged in
  isAdmin(): boolean {
    return this.adminLoggedIn;
  }
}
