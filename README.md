![Group 7 (2)](https://github.com/user-attachments/assets/846beedf-5e1d-48cd-9d12-ad7486152c03)


<!--
Hi! This is an easter egg.
Congratulations youre one!
-->

<!-- # 👀 Hi stranger! 👋🏻 -->

# CONVRT

Convrt is a full-stack web application built with the Wasp framework, designed for agency owners focused on serving local businesses. It streamlines the process of lead generation and email marketing campaigns, providing robust tools for scraping, lead management, and campaign orchestration.

- 🌍 **Geolocation & Business type based lead scraping**
- 📝 **lead management system**
- 📂 **CSV file upload for bulk leads**
- 💻 **Email template editor**
- 📅 **Campaign creation & scheduling**
- 📈 **Detailed analytics**
- 📱 **Responsive design**
- 👥 **Admin Dashboard with payment intergration & Site analytics**


# Table of Contents

- 🚀 [Tech Stack](#-tech-stack)
- 📁 [Project Structure](#-general-project-structure)
- 📦 [Module Explanations](#module-explanations)
- 🔍 [Db Schema & Feature Overview](#database-schema-and-functionality-overview)
- 🛠️ [Key Fixes & Improvements](#key-fixes-and-improvements)
- ⚙️ [Installation](#installation)



# 🚀 Tech Stack

 Convrt follows a monolithic architecture where both the frontend and backend are integrated into a single codebase. It adopts a declarative, convention-over-configuration approach, allowing developers to focus on high-level application logic by reducing the need for manual setup and configuration.

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


## 📁 General Project Structure

```

Convrt/src/
├── blog/                         # Blog feature folder for content and documentation
├── app/                          # Main application folder
│   ├── src/                      # Contains source code for both frontend and backend
│   │   ├── client/               # Frontend components and pages (React)
│   │   ├── server/               # Backend logic (queries, actions, workers)
│   │   ├── shared/               # Shared utilities and types
├── Dockerfile                       # Docker configuration for deployment
├── .vscode/                      # VSCode configuration


```

---


## 📁  Detailed Project Structure

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
│   │   │   │   ├── useSessionStorageMap.tsx       
│   │   │   │   ├── useColorMode.tsx 
|   |   |   |   ├── useLocationSearch.ts
|   |   |   |   |
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

#### `app/src/client/app`
- **AccountPage.tsx**: Displays account information and settings for the user.
- **CampaignPage.tsx**: Page for creating & managing campaigns with an overview of all campaigns.
- **CheckoutPage.tsx**: Handles checkout and payment forms.
- **ContactsPage.tsx**: Manages and displays contact lists, including scraping and CSV uploading options.
- **Mailboard.tsx**: Displays email campaigns statistics and analytics.
- **PricingPage.tsx**: Shows pricing tiers and subscription options.

#### `app/src/client/auth`
- **authWrapper.tsx**: Wraps authentication logic.
- **EmailVerification.tsx**: Manages the email verification process post-signup.
- **LoginPage.tsx**: User login page.
- **PasswordReset.tsx**: Parent component for password reset.
- **RequestPasswordReset.tsx**: Main page that contains the password reset component.
- **SignupPage.tsx**: New user signup page.

#### `app/src/client/components`
- Reusable React components for the app.

##### `app/src/client/components/CampaignPage`
- **Campaigncard.tsx**: Displays campaign details.
- **CreateCampaign.tsx**: Contains a Modal for creating and lists all campaigns.
- **Write.tsx**: Email editor component for campaigns.

##### `app/src/client/components/ContactPage`
- **Banner.tsx**: Reusable banner on the Contact page.
- **ContactButton.tsx**: Reusable button component.
- **NewTaskForm.tsx**: Main component of the Contact page.
- **Table.tsx**: Displays contact list in a table format.

###### `app/src/client/components/ContactPage/Modals`
- **AddModal.tsx**: Modal for adding contacts manually.
- **FileUpload.tsx**: Uploads contacts via CSV.
- **ScrapeModal.tsx**: Modal for scraping contact data from Google Maps & other external sources.

##### `app/src/client/components/MailboardPage`
- **Emailcharts.tsx**: A component that displays email campaign statistics and a pie chart visualization.
- **Statcard.tsx**: A child component of EmailStatusChart that contains statistics card.

#### `app/src/client/hooks`
- **useColorMode.tsx**: Manages light/dark mode.
- **useSessionStorageMap.tsx**:  Custom hook used for Caching with session storage.
- **useModal.tsx**: Manages modal state and functionality.
- **useLocationSearch.ts**: Handles location autocomplete and business data search.

#### `app/src/client/landing-page`
- Contains the main landing page component and its children.

#### `app/src/client/mails`
- Email templates for the application.

#### `app/src/client/utils`
- **Api.ts**: Utility function for making API calls from the client.

#### `app/src/client`
- **App.tsx**: Root component for the frontend.
- **Main.css**: Global styles for the app.



### 📂 `Dashboard client`

#### `app/src/client/admin/layout`
- **DefaultLayout.tsx**: Layout wrapper with a sidebar.

#### `app/src/client/admin/pages`
- **DashboardPage.tsx**: Default dashboard page that displays Stripe and Google Analytics stats for the application.
- **Users.tsx**: Dashboard page to display the list of current application users.

#### `app/src/client/admin/components`
- Contains React child components used in dashboard pages.


### 📂 `Backend server`

#### `app/src/server`
- **serverSetup.ts**: Configures CORS and middleware for the server.

#### `app/src/server/queries.ts`
- **queries.ts**: Contains database query functions for retrieving data from db.

#### `app/src/server/actions.ts**
- **actions.ts**: Handles various server-side operations for payments, contact management, campaigns, and user updates.

#### `app/src/server/workers`
- Background workers for asynchronous tasks.

#### `app/src/server/webhooks`
- **stripe.ts**: Handles Stripe webhook events.
- **emailsns.ts**: Processes sendgrid webhook email events like opens, deliveries, and bounces.

#### `app/src/server/sendmail`
- **sesUtils.ts**: Utility for sending emails via Sendgrid

#### `app/src/server/scripts`
- **usersSeed.ts**: Seeds database with initial users for development/testing.

#### `app/src/server/payments`
- **stripeUtils.ts**: Handles Stripe API interactions (payments, refunds, subscriptions).

#### `app/src/server/auth`
- **setUsername.ts**: Updates user’s username.
- **sendGridEmailSender.js**:  Function for sending verification emails when a user signs up.
- **email.ts**: Handles content for email operations like sending verification emails & password reset links.
- **users/verification.ts**: Verifies sender identity for users.
- **users/users.ts**: Creates sender identity for new users.


# Database Schema and Functionality Overview

![Database Schema](https://github.com/user-attachments/assets/f023a563-1d7c-4548-b0f4-62bf1c62d94f)



## Functionality Breakdown

### Gmaps Business Data Feature

#### 1. **Page Setup (`ContactsPage.tsx`)**

**File:** `app/src/client/app/ContactsPage.tsx`

The `ContactsPage` acts as a container for contact page-related components and UI. If the user is verified, it displays the `NewTaskForm` component; otherwise, it displays an edge case handling message.

```tsx
<div className='w-11/12'>
    {verified ? (
      <NewTaskForm />
    ) : (
      <h1>Verify your email first, then reload the page</h1>
    )}
</div>
```


#### 2. **Modal Management (`NewTaskForm.tsx`)**

**File:** `app/src/client/components/ContactPage/NewTaskForm.tsx`

The `NewTaskForm` component displays buttons for adding, uploading, and scraping data. Each button opens a corresponding modal.

**Key Features:**
- **Reusable Buttons**: Opens modals for different tasks (e.g., adding data, uploading files, or scraping data).
- **Modal Hooks**: Custom modal hooks (`useModal`) manage modal visibility.
- **Three Modals**: Handles input for:
  - Adding data (`AddTaskModal`)
  - Uploading files (`FileUploadModal`)
  - Scraping data from an external API (`ScrapeModal`)

```tsx
<ReusableButton onClick={handleOpen3} icon={<AddLocationAltIcon />} label='Scrape Data' />
<ScrapeModal isOpen={isOpen3} handleClose={handleClose3} isLoading={isLoading} style={style} setIsLoading={setIsLoading} />
```


#### 3. **Scraping Data Modal (`ScrapeModal.tsx`)**

**File:** `app/src/client/components/ContactPage/Modals/ScrapeModal.tsx`

The `ScrapeModal` allows users to search for a location and scrape business data from an external API. The fetched data is then validated and inserted into the database.

**Key Steps:**
1. **Location Autocomplete**: Uses the `useLocationSearch` hook to provide location suggestions based on user input.
   ```tsx
   <Autocomplete inputValue={autocompleteInput} options={locationOptions} onInputChange={handleAutocompleteInputChange} />
   ```

2. **Fetch Business Data**: Fetches business information from an external API (RapidAPI) based on the selected location.
   ```tsx
   const data = await fetchBusiness(inputValue, selectedLocation.lat, selectedLocation.lon);
   ```

3. **Insert Data into Database**: Iterates over the fetched data and inserts valid records into the database using the `createTask` function.
   ```tsx
   const taskData = { name, email: emailValue, Tag: inputValue, Location: address, Number: phone_number };
   await createTask(taskData);
   ```

4. **Error Handling**: Ensures that missing or invalid data is skipped and logs any errors during the scraping or insertion process.
   ```tsx
   const handleGetPlaces = async () => {
       if (!selectedLocation) return;
       setIsLoading(true);
       const data = await fetchBusiness(inputValue, selectedLocation.lat, selectedLocation.lon);
       for (const business of data) {
           if (name && phone_number && website && address) {
               await createTask({ name, email: emailValue, Tag: inputValue, Location: address, Number: phone_number });
           }
       }
       setIsLoading(false);
   };
   ```


#### 4. **Location Search Hook (`useLocationSearch.ts`)**

**File:** `app/src/client/hooks/useLocationSearch.ts`

The `useLocationSearch` custom hook manages location autocomplete suggestions and caches results for efficiency.

**Key Features:**
- **Debounced Fetch**: Limits API requests by debouncing the input.
- **Caching**: Stores previous location queries in session storage to reduce repeated API calls using a custom hook.

```ts
const [cachedLocations, setCachedLocations] = useSessionStorageMap<{ [key: string]: any[] }>(
    'locationSuggestions',
    {}
);
```

```ts
const debouncedFetch = useMemo(() => debounce(fetchLocations, debounceDelay), [fetchLocations]);
```


#### 5. **In-Memory Caching (`useSessionStorageMap.tsx`)**

**File:** `app/src/client/hooks/useSessionStorageMap.tsx`

The `useSessionStorageMap` hook manages cached values in memory for session-based operations. This enhances performance by reducing the need to re-fetch data during a single session.

**Key Features:**
1. **In-Memory Cache**: Stores frequently requested data in memory, preventing unnecessary API calls.
   ```ts
   const inMemoryCache = new Map<string, any>();
   ```

2. **Session Storage Hook**: Manages retrieval and storage of cached data within the session.
   ```ts
   const setValue = useCallback(
       (value: SetValue<T>) => {
           const valueToStore = value instanceof Function ? value(storedValue) : value;
           setStoredValue(valueToStore);
           inMemoryCache.set(key, valueToStore); // Update the in-memory cache
       },
       [key, storedValue]
   );
   ```

3. **Usage in Location Search**: The `useLocationSearch` hook utilizes `useSessionStorageMap` to cache location suggestions.
   ```ts
   const [cachedLocations, setCachedLocations] = useSessionStorageMap<{ [key: string]: any[] }>('locationSuggestions', {});
   ```


#### 6. **API Integration (`Api.ts`)**

**File:** `app/src/client/utils/Api.ts`

This file handles API calls to external services such as LocationIQ (for location suggestions) and RapidAPI (for business data).

**Key Functions:**
1. **Fetch Location Suggestions**: Retrieves location data from LocationIQ based on user input.
   ```ts
   export const fetchLocationSuggestions = async (query: string) => {
       const response = await axios.get(`https://us1.locationiq.com/v1/search?...`);
       return response.data.map(item => ({ label: item.display_name, lat: item.lat, lon: item.lon }));
   };
   ```

2. **Fetch Business Data**: Fetches business data from RapidAPI using latitude and longitude values.
   ```ts
   export const fetchBusinessData = async (inputValue: string, lat: string, lon: string) => {
       const response = await axios.get('https://local-business-data.p.rapidapi.com/search-in-area', {...});
       return response.data.data;
   };
   ```


## Key Fixes and Improvements

### ⭐ CORS Error Fix for Fullstack Application
I encountered a **CORS policy error** while connecting the frontend and backend in production. The issue was due to missing `Access-Control-Allow-Origin` headers.

To resolve this, I installed the **CORS package with its types** and configured the backend to accept requests from the client URL:

```ts
middlewareConfig.set(
  'cors',
  cors({
    origin: ['your client url'],
    credentials: true,
  })
);
```

This setup allowed proper communication between the client and server, solving the CORS issue.

---

### ⭐ Bulk Email Sending Rate Limit Fix for SendGrid
When sending large batches of emails, I ran into a `HTTP/1.1 429 TOO MANY REQUESTS` error due to SendGrid’s rate limits. To fix this, I used **PQueue** for concurrency control and split recipients into manageable **batches**:

```ts
const queue = new PQueue({ concurrency: 5 });
const batches = chunkArray(to, 1000); // Split recipients

const batchPromises = batches.map(batch => 
  queue.add(async () => {
    await sgMail.sendMultiple({ personalizations: batch, ... });
  })
);
```

This solution ensured smooth processing of bulk emails without exceeding API limits.


## Installation

1. Clone the repository or download the code and open the **Convrt** folder with any code editor:
   ```sh
   git clone https://github.com/Faizshariff/Convrt.git
   ```
   Or fork the repo and open GitHub Codespaces.

2. Ensure you have Node.js (and NPM) installed on your machine and available in your PATH to use Wasp. Your version of Node.js must be >= 18. Then, install curl on your system using the following command:
   ```sh
   curl -sSL https://get.wasp-lang.dev/installer.sh | sh -s -- -v 0.13.2
   ```

3. Set up environment variables. Add the following variables in your `.env.local` file (if it doesn't exist) in the root directory:
   ```plaintext
   REACT_APP_API_URL=waspserverurl
   REACT_APP_LOCATIONIQ_API_KEY=locationiq_api_key
   REACT_APP_MAPSDATA_API_KEY=localbusinessData_rapid_api_key
   SENDGRID_ACCESS_KEY=apikey
   SENDGRID_API_KEY=apikey
   SENDGRID_WEBHOOK_PK=webhook_signature
   SKIP_EMAIL_VERIFICATION_IN_DEV=true
   WASP_SERVER_URL=waspserver_url
   ```

4. Open a new terminal, navigate into the app directory, and run:
   ```sh
   npm install
   ```

5. Start the database with the following command:
   ```sh
   wasp start db
   ```
   Be patient until it starts the database, which will be forwarded into a new port.

6. Now, open a new terminal, navigate to the app directory, and run:
   ```sh
   wasp start
   ```
   Your Wasp application should now be running correctly.


<p align="center">Made with ❤️ and ☕</p>
