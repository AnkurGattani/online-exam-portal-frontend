# Online Exam Portal

An online examination portal built with Angular, designed to manage exams, questions, and user reports for administrators and students. This project provides a modern, responsive interface and supports role-based access control.

**Backend Repository:** [Online Exam Portal Backend](https://github.com/AnkurGattani/online-exam-portal)

## Features
- User authentication (login/signup)
- Role-based dashboards (Admin, Student)
- Exam creation, assignment, and management
- Question bank and assignment to exams
- Real-time reporting and analytics
- Responsive design

## Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [Angular CLI](https://angular.io/cli) (v20.3.7 or later)

## Setup & Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/AnkurGattani/online-exam-portal-frontend.git
   cd online-exam-portal-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Development server
To start a local development server, run:

```bash
npm start
```

Or, using Angular CLI directly:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Environment Configuration
- You can configure API endpoints and environment variables in the `src/environments/` directory or via `proxy.config.json` as needed for backend integration.

## Code scaffolding
Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building
To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests
To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests
For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for review.

## License
This project is licensed under the MIT License. Refer to the detailed LICENSE in the [backend repo](https://github.com/AnkurGattani/online-exam-portal)

## Additional Resources
For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
