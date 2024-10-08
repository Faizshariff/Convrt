import cors from 'cors';
import { config } from 'wasp/server';

// Function to configure global middleware
export const serverMiddlewareFn = (middlewareConfig: any) => {
  // Modify CORS settings or other middleware here
  middlewareConfig.set(
    'cors', 
    cors({
      origin: [
        config.frontendUrl, 
        'https://vigilant-broccoli-jwgwwg94vp6h554-3000.app.github.dev/'
      ],
      credentials: true  // Allow credentials (cookies, auth tokens)
    })
  );
  
  return middlewareConfig;
};

// Any other setup logic
export default function setup(context: any) {
  // Your setup code here
  console.log('Server setup complete');
}
