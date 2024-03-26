import React from 'react';

const FourOFour = () => {
    return (
      <div>
        <br />
        <div style={styles.container}>
            <h1 style={styles.heading}>Oops! Page Not Found</h1>
            <p style={styles.text}>We couldn't find the page you're looking for. It might have been moved or doesn't exist.</p>
            <p style={styles.text}>Email IT@hometeamcreativity.com to report this error.</p>
            <p style={styles.text}>Why not check out our <a href="/products" style={styles.link}>products</a>?</p>
            <p style={styles.text}>Or go back to <a href="/" style={styles.link}>homepage</a>.</p>
        </div>
      </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f7f7f7',
        color: '#333',
        textAlign: 'center',
        padding: '50px',
        margin: '0',
        maxWidth: '800px',
        margin: '0 auto',
    },
    logo: {
        maxWidth: '100%',
        height: 'auto',
    },
    heading: {
        fontSize: '60px',
        color: '#e74c3c',
    },
    text: {
        fontSize: '18px',
        color: '#555',
        marginBottom: '30px',
    },
    image: {
        maxWidth: '100%',
        height: 'auto',
    },
    link: {
        color: '#3498db',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
};

export default FourOFour;
