# WorkWise AI Assistant

Build a modern, responsive web app called "WorkWise" (subtitle: "AI Workplace Assistant"). Features (all in one app): - Email Generator: a text box for the email details, an Audience choice (Client, Manager, Team) and Tone buttons (Formal, Informal, Persuasive). The AI returns a subject line and an email body. - Meeting Notes Summariser: a text box for pasted notes. The AI returns a short summary, key points, decisions, and action items with owner and deadline. Write "Not stated" for anything missing. - Task Planner: a text box for tasks and deadlines, hours available, and a Daily/Weekly choice. The AI returns a prioritised plan with a one-line reason for each task and 2 time-saving tips. Layout: - Desktop: a dark sidebar on the left with the logo and name, the three menu items (active item highlighted), and a small Responsible AI note at the bottom. Each page has a title and subtitle at the top, then two cards side by side: input on the left (Generate button), output on the right with a Copy button and the message "Your AI-generated result will appear here." - Mobile: hide the sidebar behind a menu button that opens a slide-out drawer with a close (X) button. Stack the input and output cards vertically. Style: clean, professional SaaS look using only black, white and light/dark greys. No other colours. Rounded cards, soft shadows, Inter font. Show loading and error states, and make the outputs editable. Requirements: - All responses must be genuinely AI-generated, not hardcoded. - Include a Responsible AI disclaimer: "AI can make mistakes. Review all output before use and do not share sensitive personal or company data." - No backend, database, login or registration. Users open the app directly and give no personal information.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2490c355-a150-413a-bd06-cca3372a2c17).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
