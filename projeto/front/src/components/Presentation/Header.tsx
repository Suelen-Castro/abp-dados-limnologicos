import React from 'react';

const Header: React.FC = () => {
  return (
    <header
      style={{
        width: '100%', // Cabeçalho ocupa toda a largura
        backgroundColor: '#ffffff', // Fundo branco
        padding: '20px 40px', // Espaçamento interno (vertical 45px, horizontal 60px)
        boxShadow: '0 6px 12px rgba(0,0,0,0.15)', // Relevo / sombra
        position: 'relative', // Para controle de z-index
        zIndex: 2, // Cabeçalho acima de outros elementos
      }}
    >
      <div
        style={{
          maxWidth: '1200px', // Largura máxima do conteúdo
          margin: '0 auto', // Centraliza horizontalmente
          display: 'flex', // Flexbox para alinhar título e menu
          justifyContent: 'space-between', // Distribui espaço entre elementos
          alignItems: 'center', // Alinha verticalmente
        }}
      >
        <h1
          style={{
            fontSize: '30px',
            fontWeight: 600,
            color: '#1a1a1a',
          }}
        >
          Labisa - INPE
        </h1>
        <div
          style={{
            backgroundColor: '#e0e0e0',
            padding: '14px',
            borderRadius: '8px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          }}
        >
          <button
            style={{
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              padding: '12px 18px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'background-color 0.2s ease',
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#0056b3')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#007BFF')}
          >
            Menu
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
