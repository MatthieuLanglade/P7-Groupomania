# P7 - Groupomania - Réseau Social d'entreprise.

## Infos
Projet réalisé dans le cadre de la formation développeur Web Openclassroom, dernier projet visant à créer un réseau social en entreprise. 
Développement full stack Node.js React.

## Installation 

### Back-end 

1. Installer le projet, dossier /backend : 
`npm install`
2. Rajouter un fichier environnement: 
    - [HOST]
    - [SQLPORT]
    - [USER]
    - [PASSWORD]
    - [DATABASE]
    - [PORT]
    - [TOKEN]
HASHNUMBER=8
3. Lancer le projet (sur localhost:4000) : 
`npm run start` 
ou 
`npm run start:dev` 
pour nodemon.

## Base SQL 

1. Installer une base SQL, ici utilisation de MySQL. 
2. Créer une instance avec 
    - [HOST]
    - [SQLPORT]
    - [USER]
    - [PASSWORD]
    - [DATABASE]
en faisant correspondre aux valeurs du fichier d'environnement.
3. Les tables sont initialisé dans /backend/middleware/db.js
_Attention_: Dans la base de test fournie, le paramétrage est fait sur http://localhost:4000
Si une autre configuration est entrée, les adresses des images seront incorrectes et ne pourrornt être affichées. 

### Front-end 

1. Installer le projet, dossier / : 
`npm install`
2. Lancer le projet (sur localhost:3000) : 
`npm start`

## Tester l'application 

### DB existante
Une base de donnée existante a été envoyée, différents posts sont disponible avec des interactions entre utilisateurs afin de voir le comportement des différentes fonctionnalités.

## Utilisateurs 
afin de réaliser des tests, vous pouvez utliser un des utilisateurs suivants :
(les regex sur les mots de passe ont été rajoutés après la création de ces comptes)
* admin: 
    - _mail_: admin@groupomania.fr
    - _mdp_: 123456
* utilisateur: 
    - _mail_: margot@groupomania.fr
    - _mdp_: 123456
_/!\ Le token d'identification est réglé pour durer 24h, votre session sera active tant que vous ne cliquez pas sur "se déconnecter"_

## Versions 

### v1.0.0 - Corrections et déploiement sécurité 
* Contrôle des données utilisateurs (front & back)
* Mise en place environnement 
* Protection des en-têtes
* Mise en place d'un rate limit. 
* Diverses corrections et réécriture de fonctions.
* Maintient de la connexion par renouvellement du token. 

### v0.1.0 - réponse au cahier des charges
Déploiement des fonctionnalités du cahier des charges: 
* Création de compte, 
* Connection de compte, 
* Profil utilisateur, 
* Création, modification et suppression de publications avec :
    - identification, 
    - 1 image, 
    - du texte, 
* Fonctionnalité like 
* version mobile/tablette/desktop
* Compte Admin autorisé à modificaiton/suppression sur comptes et publications.
* Fonction déconnection, 
* Affichage des posts de façon antéchronologique
* Respect de la charte graphique avec utilisation principale de #FD2D01 

Hors prérequis : 
* Ajout Trombinoscope, liste des utilisateurs,
* Catégorisation & affichage par service, 
