![Group 7 (2)](https://github.com/user-attachments/assets/846beedf-5e1d-48cd-9d12-ad7486152c03)

<!--
Hi! This is an easter egg.
Congratulations youre one!
-->

<!-- # 👀 Hi stranger! 👋🏻 -->

# CONVRT

Convrt is a full-stack web application built with Wasp, designed and aimed towards agency owners who target local business owners , its built to streamline lead generation and email marketing campaigns. With a robust scraping feature, users can target specific locations and business types to collect leads efficiently. and manage them with ease

- 🌍 **Geolocation & Business type based lead scraping**
- 📝 **lead management system**
- 📂 **CSV file upload for bulk leads**
- 💻 **Email template editor**
- 📅 **Campaign creation & scheduling**
- 📈 **Detailed analytics**
- 📱 **Responsive design**
- 👥 **Admin Dashboard with payment intergration & Site analytics**



# Tech Stack:

- **Frontend & Backend**: Wasp full-stack framework with React (Frontend), Node.js (Backend) 
- **Database**: Prisma ORM with PostgreSQL (Wasp)
- **Meta Framework**: Astro for Blogs

- **APIs**:
  - **SendGrid API**: Handles email sending & event webhooks.
  - **Location IQ**: Handles autocomplete suggestions.
  - **Local Business Data (RapidAPI)**: Used to fetch local business data based on query & location.
  - **Google Analytics API**: Integrated for tracking user activity and page views in the admin dashboard.
  - **Stripe API**: Handles subscription management, payment processing, and viewing revenue data.

- **Styling**: 
  - **Tailwind CSS**: Utility-first CSS framework for styling.
  - **Material-UI (MUI)**: React components for faster and easier web development.
  - **Mantine UI**: Prebuilt UI React components.
  - **TailAdmin**: Admin dashboard & components for TailwindCSS.

- **Data Visualization**: 
  - **Mantine Charts**: Interactive charts to display email campaign statistics such as open, bounce, and delivery rates.
  - **ApexCharts**: Additional charting library used for the admin dashboard.

- **Libraries and Packages**:
  - **React Email Editor (Unlayer)**: For creating and managing email templates.
  - **p-queue**: Split the recipients into batches & process each batch with concurrency control.
  - **Lodash**: Rate limiting.
  - **Axios**: Used for making API requests.
  - **Framer Motion**: Animations and transitions for user interfaces.
  - **PapaParse**: CSV parsing and processing.

- **Deployment & Infrastructure**:
  - **Docker**: Containerization for consistent application deployment across different environments.



## 📁 Project Structure

```

├── README.md
├── package.json
├── package-lock.json
├── LICENSE
├── CONTRIBUTING.md
├── .gitignore
├── .gitattributes
├── blog/                                        #**Main blogs feature Folder**
│   ├── tsconfig.json
│   ├── tailwind.config.mjs
│   ├── README.md
│   ├── postcss.config.cjs
│   ├── package.json
│   ├── package-lock.json
│   ├── astro.config.mjs
│   ├── .gitignore
│   ├── src/
│   │   ├── virtual.d.ts
│   │   ├── env.d.ts
│   │   ├── styles/
│   │   │   └── tailwind.css                   # Blog-specific styling
│   │   ├── content/                           # Blog content files
│   │   │   ├── config.ts                      
│   │   │   ├── docs/
│   │   │   │   ├── index.md                   # Main documentation page
│   │   │   │   └── guides/
│   │   │   │       └── example.md             # Example guide
│   │   │   ├── blog/                          # Blog posts folder
│   │   │       
│   │   └── components/                        # Reusable blog components
│   │       └── MyHeader.astro                 # Header component for the blog
│   ├── assets/                                # Blog-specific assets (images, logos, etc.)
│   ├── public/                                # Public assets for the blog (favicon, images, etc.)
│   └── .vscode/
│       ├── launch.json
│       └── extensions.json
├── app/                                       # **Main application Folder** 
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tsconfig.build.json
│   ├── tailwind.config.js
│   ├── tailwind.config.cjs
│   ├── postcss.config.cjs
│   ├── package.json
│   ├── package-lock.json
│   ├── main.wasp                              # Main Wasp configuration file
│   ├── fly.toml                               # Fly.io deployment configuration
│   ├── fly-server.toml
│   ├── fly-client.toml
│   ├── Dockerfile                             # Dockerfile for containerizing the app
│   ├── docker-compose.yml                     # Docker Compose configuration
│   ├── docker-compose.debug.yml
│   ├── src/                                   #**Entry Folder for the application**
│   │   ├── vite-env.d.ts
│   │   ├── shared/                            # Shared utilities, types and constants
│   │   │   ├── utils.ts                       
│   │   │   ├── types.ts                       
│   │   │   └── constants.ts                   
│   │   ├── server/                            # **Backend server Folder**
│   │   │   ├── serverSetup.ts                 # Server setup and configuration
│   │   │   ├── queries.ts                     # wasp Database queries
│   │   │   ├── actions.ts                     # wasp Server actions
│   │   │   ├── workers/                       # Background worker scripts
│   │   │   │   ├── plausibleAnalyticsUtils.ts 
│   │   │   │   ├── googleAnalyticsUtils.ts    
│   │   │   │   ├── checkAndQueueEmails.ts     
│   │   │   │   └── calculateDailyStats.ts     
│   │   │   ├── webhooks/                      # Webhook handlers
│   │   │   │   ├── stripe.ts                  
│   │   │   │   └── emailsns.ts                
│   │   │   ├── sendmail/                      # Main Email sending Utility
│   │   │   │   └── sesUtils.ts                
│   │   │   ├── scripts/                       # Helper scripts
│   │   │   │   └── usersSeed.ts               
│   │   │   ├── payments/                      # Payment-related logic
│   │   │   │   └── stripeUtils.ts             
│   │   │   ├── auth/                          # Authentication-related logic
│   │   │   │   ├── setUsername.ts             
│   │   │   │   ├── sendGridEmailSender.js     
│   │   │   │   ├── email.ts                   
│   │   │   │   └── users/                     # User verification & management logic
│   │   │   │       ├── verification.ts        
│   │   │   │       └── users.ts               
│   │   ├── client/                            # **Frontend Client Folder**
│   │   │   ├── Main.css                       # Main CSS for the frontend
│   │   │   ├── App.tsx                        # Main app component
│   │   │   ├── utils/                         # utilitlies for the frontend
│   │   │   │   └── Api.ts                     # API utility for client-side requests
│   │   │   ├── static/                        # Static assets (images, icons, etc.)
│   │   │   ├── mails/                         # Email template components
│   │   │   │   ├── template.tsx               
│   │   │   │   └── default.tsx                
│   │   │   ├── landing-page/                  # Landing page components
│   │   │   │   ├── Testimonials.tsx          
│   │   │   │   ├── LandingPage.tsx            
│   │   │   │   ├── Footer.tsx                 
│   │   │   │   ├── Features.tsx               
│   │   │   │   └── Customerlogo.tsx           
│   │   │   ├── hooks/                         # Custom React hooks
│   │   │   │   ├── useModal.tsx               
│   │   │   │   ├── useLocalStorage.tsx       
│   │   │   │   └── useColorMode.tsx           
│   │   │   ├── components/                    # Reusable components
│   │   │   │   ├── DropdownUser.tsx           
│   │   │   │   ├── AppNavBar.tsx              
│   │   │   │   ├── MailboardPage/             # Mailboard page components
│   │   │   │   ├── ContactPage/               # Contact page components
│   │   │   │   ├── CampaignPage/              # Campaign page components
│   │   │   ├── auth/                          # Authentication components
│   │   │   ├── app/                           # Main app pages
│   │   │   │   ├── PricingPage.tsx
│   │   │   │   ├── Mailboard.tsx
│   │   │   │   ├── ContactsPage.tsx
│   │   │   │   ├── CheckoutPage.tsx
│   │   │   │   ├── CampaignPage.tsx
│   │   │   │   └── AccountPage.tsx
│   │   ├── admin/                             # **Main Admin dashboard Folder**
│   │   │   ├── pages/                         # Admin dahsboard pages
│   │   │   │   ├── Users.tsx                  
│   │   │   │   ├── Settings.tsx               
│   │   │   │   ├── Messages.tsx               
│   │   │   │   ├── DashboardPage.tsx          
│   │   │   │   |__Chart.tsx                  
│   │   │   │  
│   │   │   ├── layout/                        # Admin layout components
│   │   │   ├── images/                        
│   │   │   ├── fonts/
│   │   │   ├── components/                    # Admin reusable components
│   │   ├── public/                            # Public assets (banners, icons, etc.)
│   ├── node_modules/
│   ├── migrations/
│   ├── components/
│   ├── .wasp/
│   └── .vscode/
│       ├── launch.json
│       └── tasks.json
└── .vscode/
    └── settings.json



```

# Module Explanations

### 📂 `MainApp client`

##  `app/src/client/app`
- **AccountPage.tsx**:  Page to Display account-related information and settings for the logged-in user.
- **CampaignPage.tsx**: Page for creating & managing campaigns, providing an overview of all campaigns.
- **CheckoutPage.tsx**: Handles the checkout process and payment forms.
- **ContactsPage.tsx**: Manages and displays contact lists, including scraping and csv uploading options.
- **Mailboard.tsx**: Main Page that Displays email campaigns and provides analytics & insights into email performance.
- **PricingPage.tsx**: Displays different pricing tiers and subscription options available for the users.

##  `app/src/client/auth`
- **authWrapper.tsx**: Higher-order component that wraps authentication logic.
- **EmailVerification.tsx**: Handles email verification process for new users, typically after signup.
- **LoginPage.tsx**: Login page for users to authenticate into the application.
- **PasswordReset.tsx**: Parent component for password reset 
- **RequestPasswordReset.tsx**: Main Page that Contains Password Reset Component .
- **SignupPage.tsx**: Signup page where new users can create an account.

## `app/src/client/components`
This folder contains all reusable React components used throughout the application.

###  `app/src/client/components/CampaignPage`
- **Campaigncard.tsx**: Displays a card view of individual campaigns with basic details.
- **CreateCampaign.tsx**: Provides Modal for creating new campaigns & displays all campaigns.
- **Write.tsx**: Email Editor Page to create & edit content for campaigns.

###  `app/src/client/components/ContactPage`
- **Banner.tsx**: Reusable banner component displayed at the top of the Contact page.
- **ContactButton.tsx**: Reusable Button Component
- **NewTaskForm.tsx**: Main Component of the Contact page
- **Table.tsx**: Table component to display the list of all contacts

#### `app/src/client/components/ContactPage/Modals`
- **AddModal.tsx**: Modal window for adding new contacts Manually.
- **FileUpload.tsx**: Modal Component for uploading contact files through csv file.
- **ScrapeModal.tsx**: Modal for scraping contact data from gmaps & other external sources.

### `app/src/client/components/MailboardPage`
- **Emailcharts.tsx**: A component that displays email campaign statistics and a pie chart visualization.
- **Statcard.tsx**: A child component of EmailStatusChart that displays statistics

##  `app/src/client/hooks`
- **useColorMode.tsx**: Custom hook for managing light and dark modes.
- **useLocalStorage.tsx**: Custom hook used for caching.
- **useModal.tsx**: Custom hook for managing modal functionality , visibility and state.
- **useLocationSearch.ts**: Hook for handling location-autocomplete and gmaps business data searches.

##  `app/src/client/landing-page`
- Contains Main landing page component and its child components

##  `app/src/client/mails`
- Contains email templates used in the application


## `app/src/client/utils`
- **Api.ts**: Utility function for making API calls from the client.

##  `app/src/client`
- **App.tsx**: Root component of the frontend application, responsible for rendering the main layout.
- **Main.css**: Main CSS file containing global styles for the application.



### 📂 `Dashboard client`

### `app/src/client/admin/layout`
- **DefaultLayout.tsx**: Reusable layout wrapper with sidebar.

### `app/src/client/admin/pages`
- **DashboardPage.tsx**: Default dahsboard page that dispays stripe and google analytic stats for the application.
- **Users.tsx**: dashboard page to display the list of current application user.

### `app/src/client/admin/components`
This folder contains all the react child components used in the dashboard pages. 



### 📂 `Server-side Backend`

### `app/src/server`
- **serverSetup.ts**: Initializes and configures the server, setting up middleware, routes, and any other server-level dependencies.

### `app/src/server/queries.ts`
- **queries.ts**: Contains database query functions for retrieving data from the backend, such as fetching user or application data.

### `app/src/server/actions.ts`
- **actions.ts**: Defines server-side actions that modify or interact with the database, such as creating, updating, or deleting records.

### `app/src/server/workers`
This folder contains background worker scripts that perform asynchronous tasks.

- **plausibleAnalyticsUtils.ts**: Worker script that handles interactions with Plausible Analytics for gathering and processing analytics data.
- **googleAnalyticsUtils.ts**: Worker script that integrates with Google Analytics to fetch and manage analytics data.
- **checkAndQueueEmails.ts**: Worker that checks and queues emails for sending based on the application’s business logic.
- **calculateDailyStats.ts**: Worker script that calculates daily statistics (such as user activity, email status) and updates relevant records.

### `app/src/server/webhooks`
This folder contains webhook handlers for processing incoming events from external services.

- **stripe.ts**: Handles Stripe webhook events (e.g., payments, subscriptions) to keep the application in sync with Stripe.
- **emailsns.ts**: Processes email-related events from AWS SNS (Simple Notification Service), such as delivery or bounce notifications.

### `app/src/server/sendmail`
This folder contains utilities for sending emails via different services.

- **sesUtils.ts**: Utility for sending emails via AWS SES (Simple Email Service), handling the setup and execution of email delivery.

### `app/src/server/scripts`
This folder contains various utility scripts for running tasks on the server.

- **usersSeed.ts**: Script for seeding the database with initial user data for development or testing purposes.

### `app/src/server/payments`
This folder handles payment-related functionalities.

- **stripeUtils.ts**: Contains utility functions for interacting with Stripe’s API, such as processing payments, refunds, and managing subscriptions.

### `app/src/server/auth`
This folder manages user authentication and related functionalities.

- **setUsername.ts**: Handles the logic for setting or updating a user’s username.
- **sendGridEmailSender.js**: Utility for sending emails via SendGrid, including setup and email-sending logic.
- **email.ts**: Handles email-related operations like sending verification emails or password reset links.
- **users/verification.ts**: Manages user verification processes, such as verifying email addresses.
- **users/users.ts**: Handles user-related actions, such as retrieving, updating, or deleting user data.

---



### 📂 `Backend server`


## Key Fixes & Improvements

### ⭐ Debouncing API Calls in Search
To optimize the search functionality and prevent exceeding the API request limits, I implemented **debouncing** in the `Search.tsx` component. Previously, continuous API calls were made as the user typed in the search bar, resulting in 429 errors (api call rate limit exceeded). With debouncing, the API call is now delayed by 500ms, ensuring more efficient handling of user input and reducing excessive API requests.

### ⭐ Custom Directions Rendering in Mapbox
During the time of developement of this project Mapbox didnt come with native directions feature. To resolve this, I utilized the **Location IQ API** to fetch route data and then manually map the directions on the map using Mapbox's **Layer** functionality. The start and end locations are passed to the API, and the response is used to draw the route on the map, providing a seamless directions experience.



### <h1>Installation</h1>

1. Clone the repository or Download the code and open Travelhub Folder with any code editor
   ```sh
   git clone https://github.com/Faizshariff/Travel-hub.git
   ```

2. Install dependencies
   ```sh
   npm install
   ```

3. Set up environment variables
   Create a `.env.local` file if it doesnt exist in the root directory and add:
   ```
   NEXT_PUBLIC_REACT_APP_MAPBOX_API_KEY_SECURE=your_mapbox_token
   NEXT_PUBLIC_REACT_APP_RAPIDAPI_API_KEY_SECURE=your_traveladvisor_rapidapi_key
   NEXT_PUBLIC_REACT_APP_LOCATIONIQ_API_KEY_SECURE=your_locationiq_token
   NEXT_PUBLIC_REACT_APP_WEATHER_API_KEY=your_weather-api.com_key
   ```

4. Start the development server
   ```sh
   npm run dev
   ```
