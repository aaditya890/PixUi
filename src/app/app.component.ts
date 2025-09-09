import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"

interface Service {
  id: number
  title: string
  description: string
  features: string[]
  icon: string
  category: "framework" | "normal" | "ecommerce"
}

interface Technology {
  name: string
  icon: string
  category: string
}

interface Testimonial {
  id: number
  name: string
  company: string
  location: string
  rating: number
  review: string
  service: string
  avatar: string
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  title = "PixUi"
  emailText = "pixui.service@gmail.com"
  // Form handling
  contactForm!: FormGroup
  formSubmitted = false
  isMenuOpen = false

  // Typing animation
  typedText = ""
  currentIndex = 0
  fullText = "Your Vision, Our Code"

  // Services data
  services: Service[] = [
    {
      id: 1,
      title: "Framework Development",
      description: "Modern web applications built with cutting-edge frameworks for scalability and performance.",
      features: [
        "React.js & Next.js Applications",
        "Angular Enterprise Solutions",
        "Vue.js Interactive Interfaces",
        "Node.js Backend Development",
        "Progressive Web Apps (PWA)",
        "Single Page Applications (SPA)",
      ],
      icon: "⚛️",
      category: "framework",
    },
    {
      id: 2,
      title: "Custom Web Development",
      description: "Tailored websites designed to meet your specific business requirements and goals.",
      features: [
        "Custom HTML/CSS/JavaScript",
        "Responsive Design",
        "Cross-browser Compatibility",
        "SEO Optimization",
        "Performance Optimization",
        "Content Management Systems",
      ],
      icon: "🎨",
      category: "normal",
    },
    {
      id: 3,
      title: "E-Commerce Solutions",
      description: "Complete online store development with secure payment integration and inventory management.",
      features: [
        "Shopify & WooCommerce",
        "Custom E-commerce Platforms",
        "Payment Gateway Integration",
        "Inventory Management",
        "Order Tracking Systems",
        "Multi-vendor Marketplaces",
      ],
      icon: "🛒",
      category: "ecommerce",
    },
  ]

  // Technologies we work with
  technologies: Technology[] = [
    { name: "React", icon: "⚛️", category: "Frontend" },
    { name: "Angular", icon: "🅰️", category: "Frontend" },
    { name: "Vue.js", icon: "💚", category: "Frontend" },
    { name: "Node.js", icon: "🟢", category: "Backend" },
    { name: "Python", icon: "🐍", category: "Backend" },
    { name: "MongoDB", icon: "🍃", category: "Database" },
    { name: "PostgreSQL", icon: "🐘", category: "Database" },
    { name: "AWS", icon: "☁️", category: "Cloud" },
  ]

  // Customer testimonials
  testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Rajesh Kumar",
      company: "TechStart Solutions",
      location: "Mumbai, Maharashtra",
      rating: 5,
      review:
        "PixUi delivered an exceptional e-commerce platform for our business. Their attention to detail and technical expertise is outstanding. The website loads fast and looks amazing on all devices.",
      service: "E-Commerce Development",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Priya Sharma",
      company: "Digital Marketing Pro",
      location: "Delhi, NCR",
      rating: 5,
      review:
        "Working with PixUi was a game-changer for our agency. They created a modern, responsive website that perfectly represents our brand. The UI/UX design is top-notch and our clients love it!",
      service: "Custom Web Development",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6ypr9SCH6Cw7eg8k6P2oYDyiftVQ2rl820A&s",
    },
    {
      id: 3,
      name: "Amit Patel",
      company: "InnovateIndia",
      location: "Bangalore, Karnataka",
      rating: 5,
      review:
        "PixUi's React development skills are incredible. They built our SaaS platform with complex features and made it look simple and elegant. Highly recommend for any modern web development needs.",
      service: "Framework Development",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 4,
      name: "Sneha Reddy",
      company: "Fashion Forward",
      location: "Hyderabad, Telangana",
      rating: 5,
      review:
        "The team at PixUi transformed our fashion brand's online presence completely. The website is beautiful, fast, and converts visitors into customers. Their support throughout the project was excellent.",
      service: "E-Commerce Solutions",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 5,
      name: "Vikram Singh",
      company: "HealthCare Plus",
      location: "Pune, Maharashtra",
      rating: 5,
      review:
        "PixUi created a comprehensive healthcare management system for us. The UI is intuitive, the backend is robust, and the overall experience exceeded our expectations. True professionals!",
      service: "Custom Development",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 6,
      name: "Kavya Nair",
      company: "EduTech Solutions",
      location: "Chennai, Tamil Nadu",
      rating: 5,
      review:
        "Outstanding work by PixUi! They developed our online learning platform with advanced features. The user experience is seamless and the design is modern. Definitely the best web development team in India.",
      service: "Framework Development",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
    },
  ]

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initContactForm()
    this.startTypingAnimation()
  }

  ngAfterViewInit(): void {
    // Initialize any scroll animations or observers here
  }

  ngOnDestroy(): void {
    // Cleanup any intervals or subscriptions
  }

  initContactForm(): void {
    this.contactForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      service: ["", Validators.required],
      projectType: ["", Validators.required],
      budget: ["", Validators.required],
      timeline: ["", Validators.required],
      message: ["", [Validators.required, Validators.minLength(10)]],
    })
  }

  startTypingAnimation(): void {
    const typingSpeed = 100
    const interval = setInterval(() => {
      if (this.currentIndex < this.fullText.length) {
        this.typedText += this.fullText.charAt(this.currentIndex)
        this.currentIndex++
      } else {
        clearInterval(interval)
      }
    }, typingSpeed)
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    this.isMenuOpen = false
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value
      this.sendWhatsAppMessage(formData)
      this.formSubmitted = true
      this.contactForm.reset()

      // Reset form submitted status after 5 seconds
      setTimeout(() => {
        this.formSubmitted = false
      }, 5000)
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach((key) => {
        this.contactForm.get(key)?.markAsTouched()
      })
    }
  }

  sendWhatsAppMessage(formData: any): void {
    const phoneNumber = "+916261991735"
    const message = `
Hii PixUi !

👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
📱 *Phone:* ${formData.phone}

🔧 *Service:* ${formData.service}
📋 *Project Type:* ${formData.projectType}
💰 *Budget:* ${formData.budget}
⏰ *Timeline:* ${formData.timeline}

💬 *Message:*
${formData.message}
    `.trim()

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  quickWhatsAppContact(): void {
    const phoneNumber = "+916267363477"
    const message = "Hi PixUi! I'm interested in your web development services. Can we discuss my project?"
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName)
    if (field?.errors && field.touched) {
      if (field.errors["required"]) return `${fieldName} is required`
      if (field.errors["email"]) return "Please enter a valid email"
      if (field.errors["minlength"]) return `${fieldName} is too short`
      if (field.errors["pattern"]) return "Please enter a valid phone number"
    }
    return ""
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName)
    return !!(field?.invalid && field.touched)
  }

  // Generate star rating array
  getStarArray(rating: number): boolean[] {
    return Array(5)
      .fill(false)
      .map((_, i) => i < rating)
  }
}
