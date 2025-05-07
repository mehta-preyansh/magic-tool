# NoCodefy

[![Project License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js Version](https://img.shields.io/badge/next.js-15.0.0-blue.svg)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-v3-purple.svg)](https://supabase.com/)

A modern web application built with NEXT.js 15 and Supabase, featuring quick generation of helper tools.

![image](https://github.com/user-attachments/assets/617494b9-6856-4a67-8664-54a31534c0b3)
![image](https://github.com/user-attachments/assets/a8bb0160-085c-457f-a6cb-98def4343d83)

<!-- Replace with your actual screenshot path -->

## Features

- Authentication by Supabase
- Light and Dark theme
- Protected routes
- Integrated Gemini
- Responsive design

## Tech Stack

- **Framework**: NEXT.js 15
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **UI Components**: ShadCN, Tailwind CSS, Framer motion, Lucide react 

## Project Roadmap
- More features will add on to this roadmap
- ![image](https://github.com/user-attachments/assets/5413ba02-b1bd-438d-9a7f-23191e063f98)
 <!-- Replace with your roadmap image -->

## AI Tools Used

- *Github Copilot* : Code completion and generation
- *Cursor AI* : Debugging and R&D
- *ChatGPT, Deepseek* : AI assissted coding <!-- Replace with your AI tools image -->

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js v18 or later
- npm v9 or later
- Supabase account
- Google cloud AI account

## Installation

To install and run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/mehta-preyansh/magic-tool.git
   cd magic-tool
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
  NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
  NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
  ```
4. Run the development server:
  ```bash
   npm run dev
   ```
5. Open http://localhost:3000 in your browser.

## Supabase Setup
  - Create a new project in Supabase
  - Set up your database tables according to your project requirements
  - Enable any authentication providers you need
  - Configure Row Level Security (RLS) policies if applicable

## Contributing
  Contributions are welcome! Please follow these steps:
  - Fork the project
  - Create your feature branch (git checkout -b feature/AmazingFeature)
  - Commit your changes (git commit -m 'Add some AmazingFeature')
  - Push to the branch (git push origin feature/AmazingFeature)
  - Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
For questions or feedback, please contact:
  - Preyansh Mehta - preyansh.dev@gmail.com
