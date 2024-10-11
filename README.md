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



# Tech Stack:

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

Convrt/
├── blog/                         # Blog feature folder for content and documentation
├── app/                          # Main application folder
│   ├── src/                      # Contains source code for both frontend and backend
│   │   ├── client/               # Frontend components and pages (React)
│   │   ├── server/               # Backend logic (queries, actions, workers)
│   │   ├── shared/               # Shared utilities and types
├── docker                       # Docker configuration for deployment
├── .vscode/                      # VSCode configuration


```




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

## `app/src/client/app`
- **AccountPage.tsx**: Page to display account-related information and settings for the logged-in user.
- **CampaignPage.tsx**: Page for creating & managing campaigns, providing an overview of all campaigns.
- **CheckoutPage.tsx**: Handles the checkout process and payment forms.
- **ContactsPage.tsx**: Manages and displays contact lists, including scraping and CSV uploading options.
- **Mailboard.tsx**: Main page that displays email campaigns and provides analytics & insights into email performance.
- **PricingPage.tsx**: Displays different pricing tiers and subscription options available for the users.

## `app/src/client/auth`
- **authWrapper.tsx**: Higher-order component that wraps authentication logic.
- **EmailVerification.tsx**: Handles the email verification process for new users, typically after signup.
- **LoginPage.tsx**: Login page for users to authenticate into the application.
- **PasswordReset.tsx**: Parent component for password reset.
- **RequestPasswordReset.tsx**: Main page that contains the password reset component.
- **SignupPage.tsx**: Signup page where new users can create an account.

## `app/src/client/components`
- This folder contains all reusable React components used throughout the application.

### `app/src/client/components/CampaignPage`
- **Campaigncard.tsx**: Displays a card view of individual campaigns with basic details.
- **CreateCampaign.tsx**: Provides a modal for creating new campaigns & displays all campaigns.
- **Write.tsx**: Email editor page to create & edit content for campaigns.

### `app/src/client/components/ContactPage`
- **Banner.tsx**: Reusable banner component displayed at the top of the Contact page.
- **ContactButton.tsx**: Reusable button component.
- **NewTaskForm.tsx**: Main component of the Contact page.
- **Table.tsx**: Table component to display the list of all contacts.

#### `app/src/client/components/ContactPage/Modals`
- **AddModal.tsx**: Modal window for adding new contacts manually.
- **FileUpload.tsx**: Modal component for uploading contact files through CSV file.
- **ScrapeModal.tsx**: Modal for scraping contact data from Google Maps & other external sources.

### `app/src/client/components/MailboardPage`
- **Emailcharts.tsx**: A component that displays email campaign statistics and a pie chart visualization.
- **Statcard.tsx**: A child component of `EmailStatusChart` that displays statistics.

## `app/src/client/hooks`
- **useColorMode.tsx**: Custom hook for managing light and dark modes.
- **useLocalStorage.tsx**: Custom hook used for caching.
- **useModal.tsx**: Custom hook for managing modal functionality, visibility, and state.
- **useLocationSearch.ts**: Hook for handling location autocomplete and Google Maps business data searches.

## `app/src/client/landing-page`
- Contains main landing page component and its child components.

## `app/src/client/mails`
- Contains email templates used in the application.

## `app/src/client/utils`
- **Api.ts**: Utility function for making API calls from the client.

## `app/src/client`
- **App.tsx**: Root component of the frontend application, responsible for rendering the main layout.
- **Main.css**: Main CSS file containing global styles for the application.

---

### 📂 `Dashboard client`

### `app/src/client/admin/layout`
- **DefaultLayout.tsx**: Reusable layout wrapper with a sidebar.

### `app/src/client/admin/pages`
- **DashboardPage.tsx**: Default dashboard page that displays Stripe and Google Analytics stats for the application.
- **Users.tsx**: Dashboard page to display the list of current application users.

### `app/src/client/admin/components`
This folder contains all the React child components used in the dashboard pages.

---

### 📂 `Backend server`

### `app/src/server`
- **serverSetup.ts**: Configures CORS settings and handles global server middleware setup.

### `app/src/server/queries.ts`
- **queries.ts**: Contains database query functions for retrieving data from the backend.

### `app/src/server/actions.ts`
- **actions.ts**: Handles various server-side operations for payments, task management, campaigns, and user updates.

### `app/src/server/workers`
This folder contains background worker scripts that perform asynchronous tasks.

### `app/src/server/webhooks`
- **stripe.ts**: Handles Stripe webhook events to keep the application in sync with Stripe.
- **emailsns.ts**: Processes and updates email-related events from campaigns such as opens, deliveries, or bounces.

### `app/src/server/sendmail`
- **sesUtils.ts**: Main utility function for sending emails via AWS SES.

### `app/src/server/scripts`
- **usersSeed.ts**: Script for seeding the database with initial user data for development or testing purposes.

### `app/src/server/payments`
- **stripeUtils.ts**: Contains utility functions for interacting with Stripe’s API, such as processing payments, refunds, and managing subscriptions.

### `app/src/server/auth`
- **setUsername.ts**: Handles the logic for setting or updating a user’s username.
- **sendGridEmailSender.js**: Function for sending verification emails when a user signs up.
- **email.ts**: Handles content for email operations like sending verification emails & password reset links.
- **users/verification.ts**: Verifies and updates the sender identity status of a user.
- **users/users.ts**: Creates sender identity for users when they sign up.



## Database Schema and Functionality Overview






### Documentation: Campaign Creation and Email Sending WebApp
---

### 1. **Campaign Creation (`CreateCampaignPage.tsx`)**

## `app/src/client/components/CampaignPage/CreateCampaign.tsx`

This component provides a UI for users to create email campaigns by specifying details like the campaign name, subject, recipient list, and template. It also supports scheduling emails.

#### Key Functionalities:
- **User Verification**: Checks if the user's email is verified before allowing campaign creation.
  ```tsx
  useEffect(() => {
      if (user.sendEmail) setVerified(true);
      handleMailExtractClick();
  }, [user]);
  ```
  
- **Form Inputs**: Users input the campaign name, subject, contact list, and choose a template.
  ```tsx
  <FormControl>
     <Select value={contact} onChange={(e) => setContact(e.target.value as string)}>
  {sortedUniqueTags.map((tag: any) => ( <MenuItem key={tag} value={tag}>  {tag} </MenuItem> ))}
   </Select>
  </FormControl>
  ```

- **Campaign Submission**: Passes the input data as query parameters to the email composition page (`Write.tsx`).
  ```tsx
  const handleCampaign = () => {
      if (!nameData || !subjectData || !contact) {
          alert("Please fill in all required fields.");
          return;
      }
      const dataToPass = { name: nameData, subject: subjectData, list: contact, template, schedule: schedule ? time.toISOString() : '' };
      const queryParams = new URLSearchParams(dataToPass).toString();
      history.push(`/write?${queryParams}`);
  };
  ```

---

### 2. **Email Composition (`Write.tsx`)**

## `app/src/client/components/CampaignPage/Write.tsx`

This component manages the email composition, allowing users to edit the content using predefined templates or create a new email. Merge tags are dynamically generated based on the selected task list for personalizing emails.

#### Key Functionalities:
- **Email Editor**: Uses `react-email-editor` to provide a rich text editor for composing emails.
  ```tsx
  <EmailEditor ref={emailEditorRef} minHeight={"90vh"} onLoad={onLoad} onReady={onReady} />
  ```

- **Dynamic Merge Tags**: Merge tags (e.g., name, email) are generated from task data to personalize the email content.
  ```tsx
  const dynamicMergeTags = tasks && key1 ? Object.keys(tasks[0]).reduce((acc, key) => {
      acc[key] = { name: key.charAt(0).toUpperCase() + key.slice(1), value: `{{${key}}}` };
      return acc;
  }, {}) : {};
  ```

- **Campaign Submission**: Finalizes the email content and submits it to the backend for processing.
  ```tsx
  const handleCampaign = async () => {
      const html = await exportHtml();
      const filteredTasks = tasks.filter(task => task.Tag === key1);
      const to = filteredTasks.map(task => task.email);
      await createCampaign({ name: key4, to, from: user.username, subject: key5, body: html, tag: 'mail-tool', schedule });
      history.push('/campaign');
  };
  ```

---

### 3. **Backend Logic (`Main.wasp` and `Action.tsx`)**

## `app/src/server/actions.ts`

The backend logic for creating a campaign and sending emails is handled via Wasp actions. The `createCampaign` action stores the campaign details and triggers the email-sending function.

#### Key Functionalities:
- **Campaign Storage**: The campaign data is stored in the database, linking it to the user and saving email metadata.
  ```tsx
  const campaign = await context.entities.Campaign.create({
      data: {
          name,
          Totalmail: to.length,
          emails: { create: emailData },
          user: { connect: { id: context.user.id } }
      },
  });
  ```

- **Email Sending**: Emails are sent using the `sendEmail` function, which interacts with the SendGrid API. It supports scheduling and dynamic content with merge tags.
  ```tsx
  sendEmail({ to, from, subject, body, tag, schedule, emailIDs, mergeTags, context });
  ```

---

### 4. **Email Sending Utility (`sesUtils.tsx`)**

## `app/src/server/sendmail/sesUtils.ts`

The `sendEmail` function uses SendGrid to send emails in batches to ensure efficient processing. The function handles personalizing each email and managing batch sending.

#### Key Features:
- **Batch Processing**: Recipients are divided into batches of 1000 for sending emails.
  ```tsx
  const batches = chunkArray(to, 1000);
  const idBatches = chunkArray(emailIDs, 1000);
  const batchPromises = batches.map((batch, batchIndex) => queue.add(async () => {
      const personalizations = batch.map((email, index) => {
          return { to: email, custom_args: { unique_arg: idBatches[batchIndex][index] }, substitutions: { email: task.email, name: task.name } };
      });
      await sgMail.sendMultiple(msg);
  }));
  ```

- **Merge Tags**: Personalizes each email using merge tags based on user task data.
  ```tsx
  const personalizations = batch.map((email, index) => {
      const task = tasks.find(task => task.email === email);
      return {
          to: email,
          substitutions: { email: task.email, name: task.name, description: task.description }
      };
  });
  ```

---





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
