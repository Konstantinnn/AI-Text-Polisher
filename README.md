# AI Text Polisher ✨

A beautiful React application that transforms your text with AI-powered suggestions. Features a modern Bootstrap UI with glassmorphism effects and side-by-side layout.

## 🚀 Features

- **AI-Powered Text Enhancement** - Transform any text with multiple suggestion styles
- **Beautiful Modern UI** - Bootstrap components with glassmorphism effects
- **Side-by-Side Layout** - Input on the left, suggestions on the right
- **Copy Functionality** - One-click copy for any suggestion
- **Responsive Design** - Works perfectly on all devices
- **Real-time Processing** - Instant AI suggestions with loading animations

## 🛠️ Tech Stack

- **Frontend:** React 19, Bootstrap 5, Tailwind CSS
- **Styling:** Custom CSS with animations and glassmorphism
- **Build Tool:** Create React App
- **Deployment:** Render (Frontend) + .NET API (Backend)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Konstantinnn/AI-Text-Polisher.git
   cd AI-Text-Polisher/ai-text-polisher
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.development
   # Update REACT_APP_API_URL with your backend API URL
   ```

## 🔧 Development

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
Proxy is configured to forward API requests to `http://localhost:5241`.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run serve`

Serves the production build locally for testing.\
Useful for testing the production build before deployment.

## 🚀 Production Deployment

### Render Deployment

1. **Build Settings:**
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run serve`
   - **Root Directory:** `ai-text-polisher` (if deploying from subfolder)

2. **Environment Variables in Render:**
   ```
   REACT_APP_API_URL=https://your-backend-api.onrender.com
   REACT_APP_ENVIRONMENT=production
   ```

3. **Auto-Deploy:** Enable for automatic deployments on push to main branch

### Other Platforms

For deployment to Netlify, Vercel, or other platforms:

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Set environment variables:**
   ```
   REACT_APP_API_URL=https://your-backend-api-url.com
   ```

3. **Deploy the `build` folder**

## 🌐 API Integration

This frontend connects to a .NET Web API backend. Make sure to:

1. **Deploy your backend API** to Render or another platform
2. **Update environment variables** with the correct API URL
3. **Enable CORS** in your backend for your frontend domain

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)  
- ✅ Safari (latest)
- ✅ Edge (latest)

## 🎨 Features Showcase

- **Glassmorphism UI** with backdrop blur effects
- **Gradient animations** and smooth transitions
- **Bootstrap components** with custom styling
- **Responsive grid layout** that adapts to all screen sizes
- **Copy-to-clipboard** functionality with visual feedback

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
