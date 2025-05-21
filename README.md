# React TODO List with Drag-and-Drop

This project is a simple TODO list application built with React and TypeScript. It includes features like adding, deleting, sorting, and reordering tasks using drag-and-drop functionality.

## Features

- Add new tasks with a title and optional due date.
- Mark tasks as completed or incomplete.
- Clear all completed tasks.
- Sort tasks to display completed tasks first or last.
- Drag and drop tasks to reorder them.

## Libraries Used

This project uses the following libraries:

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Vite**: A fast build tool for modern web applications.
- **React Icons**: Provides a collection of popular icons for React applications.
- **@hello-pangea/dnd**: A drag-and-drop library for React, used to implement task reordering.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the application in your browser at `http://localhost:5173`.

## Folder Structure

- `src/App.tsx`: Main application logic and components.
- `src/styles/reset.scss`: Global styles and resets.
- `src/app.scss`: Application-specific styles.

## Drag-and-Drop Functionality

The drag-and-drop functionality is powered by the `@hello-pangea/dnd` library. Tasks can be reordered by dragging and dropping them within the list.

## License

This project is licensed under the MIT License.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
