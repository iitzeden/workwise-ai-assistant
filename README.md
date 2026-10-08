# WorkWise: AI Workplace Assistant

## Project Overview

**WorkWise** is a modern web application designed to help professionals and students save time on everyday workplace tasks using AI.

The application provides AI-powered tools for generating professional emails, summarising meeting notes, and planning daily or weekly schedules. It is designed with a clean SaaS-style interface and can be accessed directly without registration or login.

## Features Implemented

### Email Generator

- Generates professional workplace emails using AI.
- Lets the user choose an audience:
  - Client
  - Manager
  - Team
- Supports multiple writing tones:
  - Formal
  - Informal
  - Persuasive
- Returns a subject line and a complete email body.

### Meeting Notes Summariser

- Converts long or messy meeting notes into a short, clear summary.
- Extracts key points, decisions, and action items with owners and deadlines.
- Shows "Not stated" when information is missing, so the AI does not guess.

### Task Planner

- Creates a prioritised daily or weekly plan from a list of tasks and deadlines.
- Takes the user's available hours into account.
- Gives a one-line reason for each priority.
- Provides two time-saving tips.

## User Interface

- Modern SaaS dashboard layout.
- Sidebar navigation on desktop and a slide-out menu on mobile.
- Responsive design for desktop and mobile devices.
- Black, white, and grey professional colour scheme.
- Clear input and output sections with a Copy button.
- Editable AI output.
- Loading and error states.
- Responsible AI disclaimer.
- No registration or sign-in required.

## Technologies and Tools Used

- **React**: Frontend application development.
- **TypeScript**: Type-safe application development.
- **Vite**: Development server and build tool.
- **Tailwind CSS**: Responsive styling and UI design.
- **AI API**: Powers AI-generated responses.
- **Lovable**: Application development and prototyping.
- **GitHub**: Source code management and version control.

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/your-repository-name.git
```

### 2. Navigate to the Project

```sh
cd your-repository-name
```

### 3. Install Dependencies

```sh
npm install
```

### 4. Configure AI API

If the project requires an AI API key, create a `.env` file in the project root and add the required API configuration.

### 5. Start the Development Server

```sh
npm run dev
```

Open the local development URL provided by Vite in your browser.

### 6. Build for Production

```sh
npm run build
```

The production-ready files will be generated in the project's build directory.

## Prompt Engineering

Each tool uses a structured prompt with a defined role, task, context, output format, and rules. For example, the AI is instructed not to invent facts, names, or dates, and to write "Not stated" when an owner or deadline is missing.

## Project Purpose

This project demonstrates how AI can be integrated into practical workplace productivity tools, helping professionals reduce repetitive tasks and improve communication, meeting follow-up, and planning.

## Responsible AI

The application includes a Responsible AI disclaimer reminding users that AI can make mistakes, and that they should review all output before use and avoid sharing sensitive personal or company data. All outputs are editable, and no personal information is collected or stored.

## Author

Eden du Preez
