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



# Tech stack:

- **Frontend & Backend**: Wasp full-stack framework with React (Frontned), Node.js (Backend), 
- **Database**: Prisma ORM with PostgreSQL (wasp)
- **meta framework**: Astro for Blogs
- **APIs**:
  - **SendGrid API**: Handles email sending & event webhooks.
  - **Location IQ**: Handles autocomplete suggestions
  - **Local Business Data (Rapid api)** : Used to fetch local business data based on query & location
  - **Google Analytics API**: Integrated for tracking user activity and page views in the admin dashboard.
  - **Stripe API**: Handles subscription management, payment processing, and viewing revenue data.
- **Styling**: 
  - **Tailwind CSS**: Utility-first CSS framework for styling.
  - **Material-UI (MUI)**: React components for faster and easier web development.
  - **Mantine ui**: prebuilt ui React components
  - **TailAdmin**: admin dashboard & components for TailwindCSS
- **Data Visualization**: 
  - **Mantine Charts**: Interactive charts to display email campaign statistics such as open, bounce, and delivery rates.
  - **ApexCharts**: Additional charting library used for the admin dashboard.
- **Libraries and packages**:
  - **React Email Editor (Unlayer)**: For creating and managing email templates.
  - **p-queue** : Split the recipients into batches & Process each batch with concurrency control
  - **Lodash** : Rate limiting
  - **Axios**: Used for making API requests.
  - **Framer Motion**: Animations and transitions for user interfaces.
  - **PapaParse**: CSV parsing and processing.





## 📁 Project Structure

```
├── README.md                                   # Project README file
├── package.json                                # Root package dependencies and scripts
├── package-lock.json                           # Locked versions of installed packages
├── LICENSE                                     # License of the project
├── CONTRIBUTING.md                             # Guidelines for contributing to the project
├── .gitignore                                  # Files and directories ignored by Git
├── .gitattributes                              # Git attribute configurations
├── blog/                                       # Blog-related files and configuration
│   ├── tsconfig.json                           # TypeScript configuration for the blog
│   ├── tailwind.config.mjs                     # Tailwind CSS configuration
│   ├── README.md                               # Blog-specific README
│   ├── postcss.config.cjs                      # PostCSS configuration for blog
│   ├── package.json                            # Blog-specific package dependencies
│   ├── package-lock.json                       # Blog lockfile
│   ├── astro.config.mjs                        # Astro configuration for the blog
│   ├── .gitignore                              # Git ignore for the blog
│   ├── src/                                    # Blog source files
│   │   ├── virtual.d.ts                        # TypeScript declarations for virtual files
│   │   ├── env.d.ts                            # Environment variable type declarations
│   │   ├── styles/                             # Styles directory
│   │   │   └── tailwind.css                    # Tailwind CSS for blog styling
│   │   ├── content/                            # Blog content
│   │   │   ├── config.ts                       # Configuration for content modules
│   │   │   ├── docs/                           # Documentation content
│   │   │   │   ├── index.md                    # Main documentation index
│   │   │   │   └── guides/                     # Guides under documentation
│   │   │   │       ├── example.md              # Example guide file
│   │   │   ├── blog/                           # Blog articles
│   │   │   │   ├── 2023-11-23-post.md          # Blog post example
│   │   └── components/                         # Reusable components for the blog
│   │       └── MyHeader.astro                  # Example Astro component
│   ├── assets/                                 # Static assets for the blog
│   │   └── logo.png                            # Logo asset
│   ├── public/                                 # Public assets
│   │   ├── favicon.svg                         # Favicon for the blog
│   │   └── CRAIG_ROCK.png                      # Public image asset
│   └── .vscode/                                # VSCode workspace settings for blog
│       ├── launch.json                         # VSCode launch configuration
│       └── extensions.json                     # Extensions recommended for this workspace
├── app/                                        # Main application directory
│   ├── vite.config.ts                          # Vite configuration file
│   ├── tsconfig.json                           # TypeScript configuration for app
│   ├── tsconfig.build.json                     # Build-specific TypeScript configuration
│   ├── tailwind.config.js                      # Tailwind CSS configuration for app
│   ├── tailwind.config.cjs                     # Tailwind CSS config (CommonJS format)
│   ├── postcss.config.cjs                      # PostCSS configuration
│   ├── package.json                            # App-specific package dependencies
│   ├── package-lock.json                       # Lockfile for app dependencies
│   ├── main.wasp                               # Wasp framework configuration
│   ├── fly.toml                                # Fly.io configuration
│   ├── fly-server.toml                         # Fly.io server configuration
│   ├── fly-client.toml                         # Fly.io client configuration
│   ├── docs.txt                                # Documentation notes for app
│   ├── Dockerfile                              # Dockerfile for building the app
│   ├── docker-entrypoint                       # Entry point script for Docker
│   ├── docker-compose.yml                      # Docker Compose configuration
│   ├── docker-compose.debug.yml                # Docker Compose configuration for debugging
│   ├── components.json                         # Component metadata
│   ├── .wasproot                               # Wasp root file
│   ├── .waspignore                             # Files ignored by the Wasp framework
│   ├── .prettierrc                             # Prettier configuration
│   ├── .env.server.example                     # Example server environment variables
│   ├── .env.client.example                     # Example client environment variables
│   ├── .dockerignore                           # Files ignored by Docker
│   ├── src/                                    # App source code
│   │   ├── vite-env.d.ts                       # Vite environment variable types
│   │   ├── shared/                             # Shared utilities and constants
│   │   │   ├── utils.ts                        # Utility functions
│   │   │   ├── types.ts                        # TypeScript types
│   │   │   └── constants.ts                    # Constants used across the app
│   │   ├── server/                             # Backend server code
│   │   │   ├── serverSetup.ts                  # Server setup and configuration
│   │   │   ├── queries.ts                      # Backend queries
│   │   │   ├── actions.ts                      # Backend actions
│   │   │   ├── workers/                        # Background workers
│   │   │   │   ├── plausibleAnalyticsUtils.ts  # Plausible analytics worker
│   │   │   │   ├── googleAnalyticsUtils.ts     # Google Analytics worker
│   │   │   │   ├── checkAndQueueEmails.ts      # Email queue worker
│   │   │   │   └── calculateDailyStats.ts      # Daily stats worker
│   │   │   ├── webhooks/                       # Webhook integrations
│   │   │   │   ├── stripe.ts                   # Stripe webhook
│   │   │   │   └── emailsns.ts                 # SNS email webhook
│   │   │   ├── sendmail/                       # Email sending utilities
│   │   │   │   └── sesUtils.ts                 # AWS SES utility
│   │   │   ├── scripts/                        # Helper scripts
│   │   │   │   └── usersSeed.ts                # Database seeding script
│   │   │   ├── payments/                       # Payment-related code
│   │   │   │   └── stripeUtils.ts              # Stripe utilities
│   │   │   ├── auth/                           # Authentication logic
│   │   │   │   ├── setUsername.ts              # Username management
│   │   │   │   ├── sendGridEmailSender.js      # SendGrid email utility
│   │   │   │   ├── email.ts                    # Email utility functions
│   │   │   │   └── users/                      # User management
│   │   │   │       ├── verification.ts         # User verification logic
│   │   │   │       └── users.ts                # User-related functionality
│   │   ├── client/                             # Frontend client code
│   │   │   ├── Main.css                        # Main CSS for the client
│   │   │   ├── App.tsx                         # Main app component
│   │   │   ├── utils/                          # Client utilities
│   │   │   │   └── Api.ts                      # API utility functions
│   │   │   ├── static/                         # Static assets for the client
│   │   │   │   ├── open-saas-banner.jpeg       # Example static image
│   │   │   │   ├── da-boi.png                  # Another example static image
│   │   │   │   └── avatar-placeholder.png      # Placeholder avatar image
│   │   │   ├── mails/                          # Email templates
│   │   │   │   ├── template.tsx                # Email template
│   │   │   │   └── default.tsx                 # Default email template
│   │   │   ├── landing-page/                   # Landing page components
│   │   │   │   ├── Testimonials.tsx            # Testimonials component
│   │   │   │   ├── LandingPage.tsx             # Landing page component
│   │   │   │   ├── Footer.tsx                  # Footer component
│   │   │   │   ├── Features.tsx                # Features section
│   │   │   │   └── Customerlogo.tsx            # Customer logos section
│   │   │   ├── hooks/                          # Custom React hooks
│   │   │   │   ├── useModal.tsx                # Hook for modals
│   │   │   │   ├── useLocalStorage.tsx         # Hook for local storage
│   │   │   │   └── useColorMode.tsx            # Hook for dark/light mode
│   │   │   ├── components/                     # Reusable components
│   │   │   │   ├── UserMenuItems.tsx           # User menu items
│   │   │   │   ├── select.tsx                  # Custom select component
│   │   │   │   ├── DropdownUser.tsx            # User dropdown menu
│   │   │   │   ├── Button.tsx                  # Button component
│   │   │   │   ├── AppNavBar.tsx               # App navigation bar
│   │   │   │   ├── MailboardPage/              # Components for the mailboard page
│   │   │   │   │   ├── Statcard.tsx            # Stat card component
│   │   │   │   │   └── Emailcharts.tsx         # Email charts component
│   │   │   │   ├── ContactPage/                # Components for the contact page
│   │   │   │   │   ├── Table.tsx               # Contact table component
│   │   │   │   │   ├── NewTaskForm.tsx         # New task form
│   │   │   │   │   ├── ContactButton.tsx       # Contact button component
│   │   │   │   │   ├── Banner.tsx              # Banner for the contact page
│   │   │   │   │   ├── Modals/                 # Modals for contact page
│   │   │   │   │   │   ├── useLocationSearch.ts# Location search modal
│   │   │   │   │   │   ├── ScrapeModal.tsx     # Scrape modal component
│   │   │   │   │   │   ├── FileUpload.tsx      # File upload modal
│   │   │   │   │   │   └── AddModal.tsx        # Add modal component
│   │   │   │   ├── CampaignPage/               # Components for the campaign page
│   │   │   │   │   ├── Write.tsx               # Write campaign component
│   │   │   │   │   ├── CreateCampaign.tsx      # Create campaign form
│   │   │   │   │   └── Campaigncard.tsx        # Campaign card component
│   │   │   ├── auth/                           # Authentication-related components
│   │   │   │   ├── SignupPage.tsx              # Signup page
│   │   │   │   ├── RequestPasswordReset.tsx    # Password reset request page
│   │   │   │   ├── PasswordReset.tsx           # Password reset page
│   │   │   │   ├── LoginPage.tsx               # Login page
│   │   │   │   └── EmailVerification.tsx       # Email verification component
│   │   │   ├── app/                            # Main app pages
│   │   │   │   ├── PricingPage.tsx             # Pricing page
│   │   │   │   ├── Mailboard.tsx               # Mailboard page
│   │   │   │   ├── ContactsPage.tsx            # Contacts page
│   │   │   │   ├── CheckoutPage.tsx            # Checkout page
│   │   │   │   ├── CampaignPage.tsx            # Campaign page
│   │   │   │   └── AccountPage.tsx             # Account management page
│   │   ├── admin/                              # Admin panel
│   │   │   ├── pages/                          # Admin-specific pages
│   │   │   │   ├── Users.tsx                   # Users management page
│   │   │   │   ├── Settings.tsx                # Settings page
│   │   │   │   ├── Messages.tsx                # Messages page
│   │   │   │   ├── DashboardPage.tsx           # Admin dashboard
│   │   │   │   ├── Chart.tsx                   # Chart page
│   │   │   │   └── UiElements/                 # Admin UI elements
│   │   │   │       ├── Buttons.tsx             # Button components
│   │   │   │       └── Alerts.tsx              # Alert components
│   │   │   ├── layout/                         # Admin layouts
│   │   │   │   └── DefaultLayout.tsx           # Default layout for admin pages
│   │   │   ├── images/                         # Admin images
│   │   │   │   └── icon/                       # Admin icons
│   │   │   ├── fonts/                          # Custom fonts used in the admin UI
│   │   │   ├── components/                     # Admin reusable components
│   │   │   │   ├── UsersTable.tsx              # Users table component
│   │   │   │   ├── TotalSignupsCard.tsx        # Total signups card
│   │   │   │   ├── TotalRevenueCard.tsx        # Total revenue card
│   │   │   │   ├── TotalPayingUsersCard.tsx    # Total paying users card
│   │   │   │   ├── Sidebar.tsx                 # Sidebar component
│   │   │   │   └── BarChart.tsx                # Bar chart component
│   │   ├── public/                             # Public assets for the app
│   │   │   ├── public-banner.png               # Public banner image
│   │   │   ├── logo.ico                        # Application icon
│   │   │   └── .gitkeep                        # Placeholder to maintain directory
│   ├── node_modules/                           # Node.js dependencies
│   ├── migrations/                             # Database migration files
│   ├── components/                             # Components used across the app
│   ├── .wasp/                                  # Wasp framework generated files
│   └── .vscode/                                # VSCode settings specific to app
│       ├── launch.json                         # Debugger configuration
│       └── tasks.json                          # Task runner settings for VSCode
└── .vscode/                                    # VSCode workspace settings
    └── settings.json                           # VSCode specific settings

```
---

# HLD of application

![design2](https://github.com/user-attachments/assets/fb3263b3-4161-4eb5-a04d-0e763394a63c)


---

# Module Explanations

### `pages/api`
- **indexapi.js**: Handles server-side data fetching. All API calls made from the application are defined here, ensuring centralized management of data interactions.

### `pages/Components`
- **Autocomplete.tsx**: Autocomplete component that manages the autocomplete functionality for the search bar.
- **Details.tsx**: Subpage for each individual restaurent or attraction card
- **Gmap.tsx**: Main component for integrating and displaying the MapBox map.
- **List.tsx**: Manages the rendering of lists of places such as restaurants or attractions & weather based on user's location or search results.
- **Search.tsx**: Search bar component that Implements the search functionality, handling user input

### `pages/_index.tsx`
This is the main entry point of application or parent component 


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
