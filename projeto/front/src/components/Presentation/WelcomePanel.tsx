import React from 'react';

const WelcomePanel: React.FC = () => {
  return (
    <section
      style={{
        backgroundColor: '#f7f9fc', // Fundo azul claro
        padding: '130px 50px', // Maior painel
        borderRadius: '16px', // Cantos arredondados
        boxShadow: '0 12px 24px rgba(0,0,0,0.15)', // Relevo
        marginBottom: '50px',
        transition: 'transform 0.3s ease',
      }}
      onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-5px)')}
      onMouseOut={e => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <h2
        style={{
          fontSize: '36px',
          marginBottom: '20px',
          color: '#333',
        }}
      >
        Seja Bem-vindo!
      </h2>
      <p
        style={{
          fontSize: '18px',
          color: '#555',
          lineHeight: 1.6,
        }}
      >
        Explore o sistema de monitoramento de áreas suscetíveis a enchentes e inundações.
      </p>
    </section>
  );
};

export default WelcomePanel;
