# Yellow-Gold - Product Requirements Document

## Overview
Yellow-Gold is an intuitive web application designed for color mixing and manipulation. The application allows users to select colors from a pre-defined palette or manually input RGB values, mix them together, and track mixing history for future reference.

## Target Audience
- Graphic designers
- Web developers
- Artists
- Color enthusiasts
- UI/UX designers

## User Stories
1. As a user, I want to select colors from a predefined palette to save time.
2. As a user, I want to input specific RGB values for precise color selection.
3. As a user, I want to mix two colors together to see the result.
4. As a user, I want to track my color mixing history for future reference.
5. As a user, I want to reuse previous color combinations from my history.
6. As a user, I want to reset my color selections and start over.
7. As a user, I want to switch between English and Chinese languages for better accessibility.
8. As a user, I want to toggle between light and dark modes for comfortable viewing in different environments.
9. As a user, I want the application to respect my system theme preferences.

## Features

### 1. Color Selection
- **Predefined Color Palette**
  - 48 colors organized by color families (reds, oranges, yellows, greens, blues, purples, etc.)
  - Each color displays both English and Chinese names on hover
  - Visual grid layout with color preview
  - RGB value display on hover

- **Manual RGB Input**
  - Input fields for R, G, B values (0-255)
  - Real-time color preview based on input values
  - Input validation to ensure values stay within the valid range

### 2. Color Mixing
- Selection of two colors (Color A and Color B)
- Clear visual indication of currently selected color slot
- Mix button to combine colors
- Simple averaging algorithm for RGB values
- Visual display of the resulting mixed color
- Reset button to clear all selections

### 3. Mix History
- Automatic recording of all color mixes
- Chronological display of mixing history
- Visual representation of input colors and result
- Ability to select previous combinations for reuse
- Timestamp for each mix record

## User Interface

### Main Layout
- Clean, modern interface with color-based gradient background
- Header with application title and subtitle
- Three main sections:
  1. Color Mixer (top)
  2. Color Palette (bottom left)
  3. Mix History (bottom right)
- Navigation bar with language selector and theme toggle

### Color Mixer Section
- Two color blocks for input colors (A and B)
- Mix button with visual feedback
- Result color block
- Reset button
- Visual indicators showing the mixing equation (A + B = Result)

### Color Palette Section
- Grid layout of color swatches, 48 predefined colors
- Hover effects showing color information
- Organized arrangement of colors by family

### Mix History Section
- Scrollable list of previous mixes
- Visual representation of each mix (A + B = Result)
- Timestamp for each mix
- Empty state message when no history exists

### Language Switching
- Toggle between English and Chinese languages
- Accessible from the navigation bar
- All UI elements, labels, and color names translated
- User language preference saved in local storage
- Default language based on browser settings

### Theme Options
- Light mode (default) and dark mode options
- Theme toggle accessible in the navigation bar
- System theme detection and automatic application
- User theme preference saved in local storage
- Color-sensitive UI elements optimized for both themes
- Appropriate contrast ratios maintained in both themes

## Technical Requirements

### Frontend Technology
- React 18+
- Vite for build and development
- Tailwind CSS for styling
- Material-UI components
- Emotion for additional styling needs
- i18next for internationalization
- react-toggle-dark-mode for theme switching

### State Management
- React useState for component and application state
- Prop passing for component communication

### Performance Requirements
- Immediate visual feedback on color selection
- Smooth transitions and hover effects
- Responsive design for various screen sizes

### Browser Support
- All modern browsers (Chrome, Safari)
- Mobile-responsive design

## Future Enhancements (Potential)
- Color export in various formats (HEX, HSL, CMYK)
- Custom color palette saving
- Different mixing algorithms
- Color scheme suggestions
- Accessibility features for colorblind users
- Cloud sync for color history

## Implementation Notes
- Simple and intuitive UI is a priority
- Performance optimization for color rendering
- Clean component structure and separation of concerns