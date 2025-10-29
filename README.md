# 🚀 AI-Powered Web Performance Optimizer

A comprehensive web performance analysis tool that provides detailed insights and AI-powered recommendations to optimize your website's performance, built with Next.js 16 and powered by Google's Gemini AI.

## ✨ Features

- **🔍 Comprehensive Analysis**: Complete Lighthouse audit with Core Web Vitals
- **📊 Resource Analysis**: Detailed breakdown of file sizes and optimization opportunities
- **🤖 AI Recommendations**: Human-friendly suggestions powered by Google's Gemini AI
- **📱 Responsive Design**: Beautiful, mobile-friendly interface
- **⚡ Real-time Analysis**: Fast performance testing with live results
- **🎯 Actionable Insights**: Prioritized recommendations with expected improvement percentages

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Performance Testing**: Lighthouse, Puppeteer
- **AI Integration**: Google Generative AI (Gemini)
- **Package Manager**: Bun
- **UI Components**: Custom components with Tailwind

## 🏁 Quick Start

### Prerequisites

- Node.js 18+ or Bun
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wep-performance-optimizer
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Get your Gemini API key**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy and paste it into your `.env.local` file

5. **Run the development server**
   ```bash
   bun dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How to Use

1. **Enter a URL**: Input any website URL you want to analyze
2. **Start Analysis**: Click "Analyze" to begin the comprehensive performance test
3. **View Results**: Get detailed insights including:
   - Core Web Vitals scores
   - Performance, Accessibility, Best Practices, and SEO scores
   - Resource breakdown and optimization opportunities
   - AI-powered recommendations with expected improvements
4. **Implement Suggestions**: Follow the prioritized recommendations to optimize your website

## 📊 What Gets Analyzed

### Core Web Vitals
- **FCP (First Contentful Paint)**: Time until first content appears
- **LCP (Largest Contentful Paint)**: Time until main content loads
- **FID (First Input Delay)**: Time until page becomes interactive
- **CLS (Cumulative Layout Shift)**: Visual stability score
- **TTFB (Time to First Byte)**: Server response time

### Performance Metrics
- Overall performance score (0-100)
- Accessibility compliance
- Best practices adherence
- SEO optimization level

### Resource Analysis
- Total page size and HTTP requests
- JavaScript, CSS, HTML, and image sizes
- Compression ratios
- Unused code detection

### AI Recommendations
- Critical issues identification
- Optimization opportunities with difficulty levels
- Expected performance improvements
- Priority action items

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini AI API key | Yes |
| `NEXT_PUBLIC_APP_URL` | Application URL for development | No |

### Customization

The application can be customized by modifying:
- **Thresholds**: Update performance thresholds in `src/components/WebVitalsCard.tsx`
- **AI Prompts**: Modify AI prompts in `src/lib/ai-service.ts`
- **Styling**: Customize the UI in component files and `src/app/globals.css`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
1. Build the application: `bun run build`
2. Start the production server: `bun start`
3. Ensure environment variables are set

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Lighthouse](https://developers.google.com/web/tools/lighthouse) for performance auditing
- [Google Gemini AI](https://ai.google.dev/) for intelligent recommendations
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

---

Made with ❤️ for better web performance
