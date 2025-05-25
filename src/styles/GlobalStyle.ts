import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #4CAF50; /* Green */
    --secondary-color: #2196F3; /* Blue */
    --success-color: #8BC34A; /* Light Green */
    --warning-color: #FFC107; /* Amber */
    --danger-color: #F44336; /* Red */
    --dark-color: #333333;
    --light-color: #F5F5F5;
    --gray-color: #9E9E9E;
    
    --bg-color: #FFFFFF;
    --text-color: #333333;
    
    --font-primary: 'Roboto', sans-serif;
    --font-secondary: 'Poppins', sans-serif;
    
    --border-radius: 8px;
    --transition-speed: 0.3s;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-primary);
    background-color: var(--bg-color);
    color: var(--text-color);
    line-height: 1.6;
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-secondary);
    font-weight: 600;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color var(--transition-speed);
    
    &:hover {
      color: darken(var(--primary-color), 10%);
    }
  }

  button {
    cursor: pointer;
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius);
    font-family: var(--font-primary);
    font-size: 1rem;
    transition: background-color var(--transition-speed);
    
    &:hover {
      background-color: darken(var(--primary-color), 10%);
    }
    
    &:disabled {
      background-color: var(--gray-color);
      cursor: not-allowed;
    }
  }

  input, select, textarea {
    font-family: var(--font-primary);
    font-size: 1rem;
    padding: 0.5rem;
    border: 1px solid var(--gray-color);
    border-radius: var(--border-radius);
    width: 100%;
    margin-bottom: 1rem;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
    }
  }

  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    padding: 2rem;
    max-width: 1920px;
    margin: 0 auto;
    width: 100%;
  }

  .container {
    max-width: 1920px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .card {
    background-color: white;
    border-radius: var(--border-radius);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .btn {
    display: inline-block;
    background-color: var(--primary-color);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius);
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    transition: background-color var(--transition-speed);
    border: none;
    
    &:hover {
      background-color: darken(var(--primary-color), 10%);
    }
    
    &.btn-secondary {
      background-color: var(--secondary-color);
      
      &:hover {
        background-color: darken(var(--secondary-color), 10%);
      }
    }
    
    &.btn-success {
      background-color: var(--success-color);
      
      &:hover {
        background-color: darken(var(--success-color), 10%);
      }
    }
    
    &.btn-warning {
      background-color: var(--warning-color);
      
      &:hover {
        background-color: darken(var(--warning-color), 10%);
      }
    }
    
    &.btn-danger {
      background-color: var(--danger-color);
      
      &:hover {
        background-color: darken(var(--danger-color), 10%);
      }
    }
  }

  /* Flexbox utilities */
  .flex {
    display: flex;
  }

  .flex-column {
    flex-direction: column;
  }

  .justify-center {
    justify-content: center;
  }

  .justify-between {
    justify-content: space-between;
  }

  .align-center {
    align-items: center;
  }

  .text-center {
    text-align: center;
  }

  /* Responsive utilities */
  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
    
    .container {
      padding: 0 0.5rem;
    }
    
    main {
      padding: 1rem;
    }
  }
`;

export default GlobalStyle;
