# Extension Edge Functions

Supabase edge functions and database configuration for handling analytics data from the *Less* browser extension.

## Description

This folder contains the backend infrastructure for collecting and processing analytics data from the browser extension. It uses Supabase edge functions to provide a secure and scalable endpoint for data collection.

## Technologies

- **Supabase**: Backend-as-a-Service platform
- **Deno**: Runtime for edge functions
- **TypeScript**: Type-safe server-side development

## Contents

- **`supabase/functions/analytics/`**: Edge function for receiving and processing analytics data
- **`supabase/config.toml`**: Supabase project configuration
- **`supabase/seed.sql`**: Database initialization (analytics table is set up in browser)

## Setup

1. Install Supabase CLI
2. Configure your Supabase project credentials
3. Deploy edge functions:
```bash
supabase functions deploy analytics
```

## Analytics Collection

The analytics endpoint collects anonymized data including:
- Page visits and session duration
- Add-to-cart interactions
- Checkout and payment actions
- Cart contents (price and quantity only, no product details)

All data collection is opt-in and follows strict privacy guidelines with no personally identifiable information stored.

**Note**: AI assistance was used to help develop the analytics processing logic in this project.