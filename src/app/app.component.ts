import { animate, state, style, transition, trigger, ɵBrowserAnimationBuilder } from '@angular/animations';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import Aos from 'aos';
import { DialogEnquiryComponent } from './dialog-enquiry/dialog-enquiry.component';
import { WebService } from './service/web.service';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './service/auth.service';
import { AdminPannelComponent } from './admin-pannel/admin-pannel.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatIconModule,AdminPannelComponent, MatDialogModule, MatExpansionModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, CommonModule, MatButtonModule, MatToolbarModule, MatMenuModule, MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      state('out', style({ opacity: 0 })),
      transition('in => out', [animate('0.5s ease-out')]),
      transition('out => in', [animate('0.5s ease-in')]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  formBuilder = inject(FormBuilder)
  getInTouchForm!: FormGroup;
  @ViewChild('bottomSection') bottomSection!: ElementRef;
  formSubmittedSuccessfully: boolean = false;
  adminAccess:boolean = false;
  suggestions: string[] = [
    "E-Commerce Website",
    "Portfolio Website",
    "Landing Page",
    "Business Website",
    "Educational Website",
    "Real Estate Website",
    "Booking Platform",
    "Non-Profit Website",
    "Healthcare Website"
  ];
  images = [
    'https://stp-v4-cdn.lottiefiles.com/Spotify_Astrology_Club_47b371f434.webp',
    'https://stp-v4-cdn.lottiefiles.com/Gumroad_Gumroad_b5f0f90781.webp',
    'https://stp-v4-cdn.lottiefiles.com/Cycle_Cycle_bd04fd3da2.webp',
    'https://stp-v4-cdn.lottiefiles.com/Replit_Inc_Replit_38d1b3d413.webp',
    'https://stp-v4-cdn.lottiefiles.com/Webflow_Inc_Webflow_5e389e4aed.webp',
    'https://stp-v4-cdn.lottiefiles.com/Awwwards_Awwwards_Conference_2023_a41bc70c10.webp',
    'https://stp-v4-cdn.lottiefiles.com/Gestion_Mi_Ro_Inc_Gestion_Mi_Ro_c9835ee00a.webp',
    'https://stp-v4-cdn.lottiefiles.com/Loopin_HQ_Loopin_1c3cbb0d4f.webp',

  ];
  expanded: boolean = false;
  adminId: string = '';
  text = 'We Craft Your Vision'; // The full text to type
  typedText = ''; // This will hold the progressively typed text
  currentIndex = 0; // Track the position in the text
  isPaused = false;

  constructor(private dialog: MatDialog, private webService: WebService,private authService:AuthService) { }

  ngOnInit(): void {
    this.getInTouchForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      category: ['', Validators.required]
    });
    this.startTyping();
    
  }

  OnGetInTouchFormSubmit(clintData: any) {
    if (this.getInTouchForm.valid) {
      this.formSubmittedSuccessfully = true;
      const editClintData = {
        title:"ENQUIRY-WEB",
        name: clintData.name,
        phone: clintData.phone,
        category: clintData.category
      }
      this.webService.sendEnquiryDataToAdmin(editClintData);
      this.getInTouchForm.reset();
    }
  }

  enquireNow(): void {
    const dialogRef = this.dialog.open(DialogEnquiryComponent, {
      width: '500px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => { });
  }

  scrollToBottom(): void {
    const startPosition = window.scrollY;
    const targetPosition = document.body.scrollHeight;
    const distance = targetPosition - startPosition;
    const duration = 20000; // Scroll duration in milliseconds (10 seconds)
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      window.scrollTo(0, startPosition + (distance * progress));

      if (progress < 1) {
        requestAnimationFrame(animation); // Continue scrolling
      }
    };

    requestAnimationFrame(animation); // Start scrolling animation


  }

  ngAfterViewInit(): void {
    Aos.init({
      offset: 100, // Offset from the viewport
      duration: 800, // Animation duration
      easing: 'ease-in-out', // Animation easing
      delay: 100, // Delay between animations
      once: false, // Whether animation should happen only once
    });
    // Refresh to ensure all animations are applied
    setTimeout(() => Aos.refresh(), 500);
  }

  pauseScroll() {
    const track = document.querySelector('.carousel-track') as HTMLElement;
    if (track) {
      track.style.animationPlayState = 'paused';
      console.log('Scrolling paused'); // Debug log
    } else {
      console.error('Carousel track not found');
    }
  }

  resumeScroll() {
    const track = document.querySelector('.carousel-track') as HTMLElement;
    if (track) {
      track.style.animationPlayState = 'running';
      console.log('Scrolling resumed'); // Debug log
    } else {
      console.error('Carousel track not found');
    }
  }

  startTyping(): void {
    const typingSpeed = 100; // Typing speed in milliseconds per character
    const delay = 500; // Initial delay before typing starts

    setTimeout(() => {
      const interval = setInterval(() => {
        if (this.currentIndex < this.text.length) {
          this.typedText += this.text.charAt(this.currentIndex); // Append the next character
          this.currentIndex++;
        } else {
          clearInterval(interval); // Stop the typing animation when complete
        }
      }, typingSpeed);
    }, delay);
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'  // Smooth scrolling effect
    });
  }

  showAdminAccessForm(){
    this.adminAccess = true;
  }

  onAdminLogin(formValue: any): void {
    if (formValue.adminId === 'aaditya#90') { // Replace 'admin123' with your actual admin ID logic
      this.authService.loginAsAdmin();
      // this.router.navigate(['/admin']); // Navigate to the admin panel
    } else {
      alert('Invalid Admin ID');
    }
  }
  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  login(): void {
    this.authService.loginAsAdmin();
  }

  logout(): void {
    this.authService.logout();
  }
}
