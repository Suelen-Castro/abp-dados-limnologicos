import React from 'react';

const ActionButtons: React.FC = () => {
  const buttonStyle: React.CSSProperties = {
    padding: '45px 28px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    backgroundColor: '#28a745',
    color: 'white',
    boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
    transition: 'all 0.2s ease',
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = '#218838';
    e.currentTarget.style.transform = 'translateY(-2px)';
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = '#28a745';
    e.currentTarget.style.transform = 'translateY(0)';
  };

  return (
    <section
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '40px', // Espaçamento uniforme
      }}
    >
      <button style={buttonStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        Funcionalidade 1
      </button>
      <button style={buttonStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        Funcionalidade 2
      </button>
      <button style={buttonStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        Funcionalidade 3
      </button>
    </section>
  );
};

export default ActionButtons;
