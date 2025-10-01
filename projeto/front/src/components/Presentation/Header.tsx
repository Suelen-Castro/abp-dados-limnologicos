import React from 'react';

const Header: React.FC = () => {
  return (
    <header
      style={{
        width: '100%',
        backgroundColor: '#ffffff',
        padding: '1rem 2rem', // usa rem em vez de px
        boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap', // permite quebrar em telas pequenas
          gap: '1rem',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(1.2rem, 4vw, 1.8rem)', // responsivo
            fontWeight: 600,
            color: '#1a1a1a',
            margin: 0,
          }}
        >
          Labisa - INPE
        </h1>

        <div
          style={{
            backgroundColor: '#e0e0e0',
            padding: '0.5rem',
            borderRadius: '8px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          }}
        >
          <button
            style={{
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              padding: '0.7rem 1.2rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: 'clamp(0.8rem, 2vw, 1rem)', // botão adapta
              transition: 'background-color 0.2s ease',
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = '#0056b3')
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = '#007BFF')
            }
          >
            Menu
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
