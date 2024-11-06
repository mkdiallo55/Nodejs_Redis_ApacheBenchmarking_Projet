const express = require('express');
const redis = require('redis');

const app = express();

// Connexion au client Redis avec le bon hôte et port
const client = redis.createClient({
    host: 'redis-server',
    port: 6379
});

// Initialiser le nombre de visites à 0
client.set('visits', 0);

// Définition du point de terminaison racine
app.get('/', (req, res) => {
    client.get('visits', (err, visits) => {
        if (err) return res.status(500).send('Erreur serveur');
        
        // Envoyer le nombre de visites actuel et incrémenter après
        res.send('Nombre de visites est : ' + (parseInt(visits) + 1));
        client.set('visits', parseInt(visits) + 1);
    });
});

// Spécification du port d'écoute
app.listen(8081, () => {
    console.log('En écoute sur le port 8081');
});
