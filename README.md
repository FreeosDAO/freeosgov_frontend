# Freeos Governance App (freeos)

Application to claim your Freeos tokens

# Clone the repository

```bash
git clone https://github.com/FreeosDAO/freeosgov_frontend.git
```

## Install the dependencies

```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

# Browser will be triggered with Local URL and Port

```bash
http://localhost:8080/
```

### Customize the configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

### Folder structure

```bash

    freeosgov_frontend/
    ├── .quasar/               # Quasar framework-specific files
    ├── .vscode/               # VS Code editor settings
    ├── node_modules/          # Dependencies installed via npm/yarn
    ├── public/                # Static files like index.html
    ├── src/                   # Source code directory
    │   ├── assets/            # Static assets (images, fonts, etc.)
    │   ├── boot/              # Initialization scripts for plugins or services
    │   ├── components/        # Vue.js reusable components
    │   ├── css/               # Global stylesheets
    │   ├── layouts/           # Layout templates for different views
    │   ├── pages/             # Main application pages (views)
    │   ├── router/            # Vue Router configuration for navigation
    │   ├── services/          # API service files for backend communication
    │   ├── store/             # Vuex store for state management
    │   │   ├── account/       # Store module for user account management
    │   │   ├── freeos/        # Store module related to 'freeos' functionality
    │   │   ├── index.js       # Vuex store entry point
    │   ├── utils/             # Utility/helper functions
    │   ├── App.vue            # Root Vue component
    │   ├── index.template.html# Template for index.html
    ├── tools/                 # Project tools and utility scripts
    │   ├── generate-code.js   # Script for generating code
    ├── .editorconfig          # Code formatting rules
    ├── .env                   # Environment variables
    ├── .eslintrc.js           # ESLint configuration (code linting)
    ├── .eslintignore          # Files/directories to ignore for ESLint
    ├── .gitignore             # Files/directories to ignore in Git

```

### Use the OpenSSL Legacy Provider (Node.js 17+)

```bash
    NODE_OPTIONS=--openssl-legacy-provider npm run serve
```
