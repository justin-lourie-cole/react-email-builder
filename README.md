# React Email Builder

React Email Builder is a powerful and flexible tool for creating email templates using React components. It provides a drag-and-drop interface for assembling email layouts, a live preview, and the ability to export email-client friendly HTML.

## Features

- Drag-and-drop interface for easy email template creation
- Live preview of email templates
- Property editor for customizing component styles
- Undo/Redo functionality
- Export to email-client friendly HTML
- Built with React and TypeScript for type safety
- Utilizes React Email components for better email client compatibility

## Installation

To get started with React Email Builder, follow these steps:

1. Clone the repository:

  ```bash
  git clone [https://github.com/yourusername/react-email-builder.git](https://github.com/yourusername/react-email-builder.git)
  ```

2. Navigate to the project directory:

```bash
cd react-email-builder
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

## Usage

1. Open the application in your web browser (usually at `http://localhost:3000`).
2. Use the component sidebar to drag and drop elements onto the canvas.
3. Click on components in the canvas to edit their properties in the property editor.
4. Use the preview tab to see how your email will look.
5. When you're satisfied with your design, click the "Export Code" button to generate email-client friendly HTML.

## Project Structure

- `src/components/email-builder.tsx`: Main component for the email builder interface
- `src/components/component-sidebar.tsx`: Sidebar with draggable components
- `src/components/email-canvas.tsx`: Canvas where components are arranged
- `src/components/property-editor.tsx`: Editor for component properties
- `src/components/email-preview.tsx`: Preview of the email template
- `src/utils/code-generator.ts`: Generates email-client friendly HTML
- `src/utils/use-undo.ts`: Custom hook for undo/redo functionality
- `src/types.ts`: TypeScript type definitions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- [React Email](https://react.email/) for providing email-friendly React components
- [React DnD](https://react-dnd.github.io/react-dnd/) for drag and drop functionality

## Support

If you encounter any problems or have any questions, please open an issue in the GitHub repository.
