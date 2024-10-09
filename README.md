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
├── pages/
│   ├── api/
│   │   └── indexapi.js                        # API route for server-side data fetching
│   ├── Components/                            # Reusable components for the app
│   │   ├── Autocomplete.tsx
│   │   ├── Details.tsx
│   │   ├── Gmap.tsx
│   │   ├── List.tsx
│   │   └── Search.tsx
│   ├── _app.tsx                                # Home page (root)
│   └── index.tsx                               # Main app entry
├── public/Components                           # Public assets (images, icons, etc.)
├── styles/
├── .env.local                                  # Environment variables
├── next.config.js
├── package.json
└── tsconfig.json
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
