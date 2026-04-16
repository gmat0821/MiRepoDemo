import React, { useState, useEffect } from 'react';

export default function PokemonCard() {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const typeColors = {
        fire: '#FF421C', water: '#2980ef', grass: '#62ca57', electric: '#fac000',
        psychic: '#ef4179', ice: '#74cfaf', dragon: '#5060e1', dark: '#4f4747',
        fairy: '#f971ec', normal: '#9fa19f', fighting: '#FF8000', flying: '#81b9ef',
        poison: '#9141cb', ground: '#915121', rock: '#afa981', bug: '#91a119',
        ghost: '#704170', steel: '#60a1b8'
    };

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
            .then(response => response.json())
            .then(data => {
                const promises = data.results.map(poke =>
                    fetch(poke.url).then(res => res.json())
                );
                return Promise.all(promises);
            })
            .then(pokemonData => {
                setPokemons(pokemonData);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div style={loaderStyle}>Cargando datos maestros...</div>;
    if (error) return <div style={loaderStyle}>Error: {error}</div>;

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>POKEMON</h1>
            
            <div style={gridStyle}>
                {pokemons.map(pokemon => {
                    const primaryType = pokemon.types[0]?.type.name || 'normal';
                    const color = typeColors[primaryType] || '#A8A878';

                    return (
                        <div 
                            key={pokemon.id} 
                            style={cardStyle}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-15px) scale(1.03)';
                                e.currentTarget.style.boxShadow = `0 25px 50px ${color}66`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
                            }}
                        >
                            {/* Header: ID y Tipo */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={idBadge}>#{pokemon.id.toString().padStart(3, '0')}</span>
                                <div style={{ ...typeBadge, backgroundColor: color }}>{primaryType}</div>
                            </div>

                            {/* Imagen con círculo de luz */}
                            <div style={{ ...imgContainer, border: `2px solid ${color}33` }}>
                                <div style={{ ...glowCircle, background: `radial-gradient(circle, ${color}44 0%, transparent 70%)` }}></div>
                                <img 
                                    src={pokemon.sprites.other['official-artwork'].front_default} 
                                    alt={pokemon.name} 
                                    style={imgStyle} 
                                />
                            </div>

                            <h2 style={nameStyle}>{pokemon.name.toUpperCase()}</h2>

                            {/* Info Física */}
                            <div style={physicalStats}>
                                <span>📏 {pokemon.height / 10} m</span>
                                <span>⚖️ {pokemon.weight / 10} kg</span>
                            </div>

                            {/* Estadísticas de Combate */}
                            <div style={statsContainer}>
                                {pokemon.stats.slice(0, 3).map(stat => (
                                    <div key={stat.stat.name} style={statRow}>
                                        <span style={statLabelText}>{stat.stat.name.replace('special-', 'S.')}</span>
                                        <div style={barBackground}>
                                            <div style={{ 
                                                ...barFill, 
                                                width: `${(stat.base_stat / 150) * 100}%`,
                                                backgroundColor: color 
                                            }}></div>
                                        </div>
                                        <span style={statValueText}>{stat.base_stat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// --- ESTILOS MEJORADOS ---

const containerStyle = {
    padding: '60px 20px',
    background: '#000', 
    minHeight: '100vh',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
};

const titleStyle = {
    textAlign: 'center',
    color: '#fff',
    fontSize: '3.5rem',
    fontWeight: '900',
    marginBottom: '50px',
    letterSpacing: '8px',
    textShadow: '0 0 20px rgba(255,255,255,0.3)'
};

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '40px',
    maxWidth: '1300px',
    margin: '0 auto'
};

const cardStyle = {
    background: '#1a1a1a', // Fondo gris muy oscuro para la carta
    borderRadius: '24px',
    padding: '24px',
    border: '1px solid #333',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden'
};

const idBadge = {
    color: '#666',
    fontWeight: 'bold',
    fontSize: '14px'
};

const typeBadge = {
    padding: '5px 14px',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '10px',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '1px'
};

const imgContainer = {
    position: 'relative',
    borderRadius: '20px',
    width: '100%',
    height: '180px',
    margin: '15px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#111'
};

const glowCircle = {
    position: 'absolute',
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    zIndex: 0
};

const imgStyle = {
    width: '150px',
    height: '150px',
    objectFit: 'contain',
    zIndex: 1,
    filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.5))'
};

const nameStyle = {
    textAlign: 'center',
    color: '#fff',
    fontSize: '1.6rem',
    margin: '10px 0',
    fontWeight: '800'
};

const physicalStats = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    color: '#aaa',
    fontSize: '13px',
    marginBottom: '20px'
};

const statsContainer = {
    background: '#222',
    borderRadius: '15px',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
};

const statRow = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
};

const statLabelText = {
    color: '#888',
    fontSize: '10px',
    width: '45px',
    textTransform: 'uppercase'
};

const barBackground = {
    flex: 1,
    height: '6px',
    background: '#333',
    borderRadius: '3px',
    overflow: 'hidden'
};

const barFill = {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 1s ease-in-out'
};

const statValueText = {
    color: '#fff',
    fontSize: '11px',
    fontWeight: 'bold',
    width: '25px',
    textAlign: 'right'
};

const loaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '24px',
    color: '#fff',
    background: '#000'
};