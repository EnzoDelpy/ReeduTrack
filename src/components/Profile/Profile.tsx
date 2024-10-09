export default function Profile() {
  const profileData = {
    prenom: 'Sergio',
    nom: 'Compote',
    description: 'Entorse de la cheville droite',
    debut: '17/09/2024',
    fin: '19/10/2024',
  };

  return (
      <div style={styles.container}>
        <div style={styles.field}>
          <p style={styles.value}>{profileData.prenom}</p>
        </div>
        <div style={styles.field}>
          <p style={styles.value}>{profileData.nom}</p>
        </div>
        <div style={styles.field}>
          <p style={styles.value}>{profileData.description}</p>
        </div>
        <div style={styles.field}>
          <p style={styles.value}>{profileData.debut}</p>
        </div>
        <div style={styles.field}>
          <p style={styles.value}>{profileData.fin}</p>
        </div>
        <button style={styles.button}>MODIFIER</button>
      </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
  },
  field: {
    marginBottom: '30px',
  },
  value: {
    padding: '10px',
    borderRadius: '4px',
    backgroundColor: '#F5F5F5',
    fontSize: '24px',
  },
  button: {
    backgroundColor: '#b4b087',
    color: '#58A980',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '70px',

    fontSize: '24px',
    fontWeight: 'bald',
    width: 'fit-content',
  },
};
