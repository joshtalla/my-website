# Josh Talla - Portfolio Website

A modern, interactive portfolio website built with React, TypeScript, and Vite. Features a sleek dark theme, interactive components, and showcases my projects and skills as a Full-Stack Developer and AI Enthusiast.

## 🚀 Features

### Interactive Components
- **Dynamic Hero Section** with typing animation and parallax background effects
- **Project Cards** with expandable popouts showing detailed information
- **Clickable Achievement Badges** that open corresponding project details
- **Interactive Contact Form** with math captcha and cooldown protection
- **Mini Click Game** - A fun TypeScript-based target clicking challenge

### Responsive Design
- Mobile-first approach with fluid layouts
- Optimized for all screen sizes and devices
- Accessibility features including reduced motion support
- Clean, modern dark theme with subtle animations

### Project Showcase
- **UCI Search Engine** - High-performance search with custom web crawler
- **Alli** - AI-driven social media platform promoting inclusivity
- **ZotLabs** - Award-winning research opportunity platform
- **Emotion Prediction Research** - CNN-RNN approaches for facial emotion recognition

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: CSS3 with CSS Variables, Flexbox, Grid
- **Icons**: Custom SVG implementations
- **Deployment**: Vercel-ready
- **Features**: Context API, Custom Hooks, Local Storage

## 📁 Project Structure

```
my-portfolio/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Footer.tsx       # Social links footer
│   │   ├── Navbar.tsx       # Navigation component
│   │   ├── ProjectCard.tsx  # Project display cards
│   │   ├── StatCard.tsx     # Achievement statistics
│   │   ├── MathCaptcha.tsx  # Contact form captcha
│   │   ├── HeroBg.tsx       # Hero background component
│   │   ├── TypingSubtitle.tsx # Typing animation
│   │   └── ClickGame.tsx    # Interactive mini-game
│   ├── sections/            # Page sections
│   │   ├── Hero.tsx         # Landing section
│   │   ├── About.tsx        # About me section
│   │   ├── Projects.tsx     # Projects showcase
│   │   └── Contact.tsx      # Contact form
│   ├── contexts/            # React contexts
│   │   └── ProjectsContext.tsx # Project popout management
│   ├── pages/               # Main pages
│   │   └── Home.tsx         # Home page layout
│   └── assets/              # Images, documents
│       ├── profile-pic.jpg
│       ├── Alli/
│       ├── UCI Search Engine/
│       ├── ZotLabs/
│       └── Paper/
```

## 🎮 Interactive Features

### Project Popouts
Click any project card to view detailed information in a centered modal with:
- Full project description with bullet points
- Project thumbnails and media
- Direct links to GitHub repositories or live demos
- Keyboard navigation support (ESC to close)

### Achievement Integration
Click achievement badges in the About section to instantly open related projects:
- 🏆 "Best UX" → Opens ZotLabs project
- 🧠 "96.72%" → Opens Emotion Prediction research
- 🤖 "Alli" → Opens Alli platform project

### Click Game Challenge
A TypeScript-based mini-game featuring:
- Moving target mechanics
- 10-second time limit
- Score tracking with persistent high scores
- Responsive touch/click controls
- Reduced motion accessibility support

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/your-repo-name.git
cd my-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Deploy automatically on every push

### Manual Deployment
```bash
# Build the project
npm run build

# The dist/ folder contains the production build
# Upload the contents to your hosting provider
```

## 🎨 Customization

### Updating Projects
Edit `src/sections/Projects.tsx` to add or modify projects:
```typescript
const projects = [
  {
    title: "Your Project",
    role: "Your Role",
    dateRange: "Date Range",
    summary: "Brief description",
    bullets: ["Feature 1", "Feature 2"],
    imageUrl: yourImage,
    link: "https://github.com/..."
  }
];
```

### Styling
- Global styles: Modify CSS variables in component stylesheets
- Dark theme: Update color variables in individual CSS files
- Responsive breakpoints: Currently optimized for 720px mobile breakpoint

### Contact Form
Update the Formspree endpoint in `src/sections/Contact.tsx`:
```typescript
const form = e.target as HTMLFormElement;
form.action = 'https://formspree.io/f/YOUR_FORM_ID';
```

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: your.email@example.com
- **LinkedIn**: [Your LinkedIn](https://linkedin.com/in/your-profile)
- **GitHub**: [Your GitHub](https://github.com/your-username)

---

Built with ❤️ by Josh Talla
