# Personal Calendar
My own calendar built to include the features that I want and use. </br>
A large focus was placed on design and interactive components.

## Setup
Prerequisites: 
- Supabase account and database setup (more details below)
- npm already installed
- Git already installed
  
Follow these setup steps to run this project on your machine. 

``` console
// Clone repository from GitHub
$ git clone https://github.com/HarrisonBaghurst/personal-calendar

// Navigate to created directory
$ cd personal-calendar

// Install packages
$ npm install

// Create local variables file (more information below)

// Run development server
$ npm run dev

// Navigate to "localhost:3000"
```

### Supabase setup 

This project requires a Supabase account with a specific table name, fields and RLS policies to work out of the box.</br>
``` 
// Table name
full-schedule

// Table fields
id: int 8
created_at: timestamptz
title: text
date: date
location: text
start_time: time
end_time: time
extra_info: text
type: text
user_id: uuid

// RLS policies
DELETE: enable delete for users based on user_id
INSERT: enable insert for users based on user_id
SELECT: enable users to view their own data only
```
You will also need to create a user as for security I didn't build a sign up page, only a sign in page. </br>
Make sure to store your Supabase url and api keys for later.

### Local variables
You will need to create a local variables file at the root of your project directory. 
```
.env.local

NEXT_PUBLIC_SUPABASE_URL=*****
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=*****
SUPABASE_SERVICE_ROLE_KEY=*****
```

## Technologies
[![My Skills](https://skillicons.dev/icons?i=typescript,react,nextjs,tailwind,supabase,vercel)](https://skillicons.dev)
