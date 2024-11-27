# **Frontend - Application React Native avec Redux et Expo**  

Ce projet frontend est une application mobile développée avec React Native, utilisant Redux pour la gestion de l'état et Expo pour faciliter le développement et les tests.  

## **Table des matières**

- Fonctionnalités principales  
- Prérequis  
- Installation et lancement  
- Contributions  

## **Fonctionnalités principales**

- Gestion des utilisateurs : Connexion, inscription, mise à jour du profil.  
- Gestion des réservations : Consultation, ajout et suppression de réservations.  
- Gestion des emplacements : Liste des emplacements disponibles avec détails, ajout et recheche sur une map.  
- Messagerie : Échanges entre utilisateurs via une interface intuitive.  
- Notifications : Notifications en temps réel pour les événements importants.  
- Gestion des images : Upload et affichage des images pour les emplacements.  
  
## **Prérequis**

Avant de commencer, assurez-vous d'avoir les outils suivants installés :  

npm ou yarn  
Expo CLI  
npm install -g expo-cli  
Un émulateur ou un appareil physique configuré :  
iOS : Xcode et simulateur iOS.  
Android : Android Studio et un appareil virtuel.  

## **Installation et lancement**     

**Étape 1 : Cloner le projet**  
Clonez le dépôt Git en exécutant :  

git clone https://github.com/Lilianmnreau/iwa-project  

**Étape 2 : Installation des dépendances**  
Accédez au répertoire du projet et installez les dépendances nécessaires :  

cd app  
npm install  

**Étape 3 : Lancer l'application**  
Utilisez Expo pour démarrer le projet :  

npx expo start  

**Étape 4 : Tester l'application**    
Sur un appareil physique : Scannez le QR code affiché dans le terminal avec l'application Expo Go.  
Sur un émulateur : Appuyez sur a pour Android ou i pour iOS après avoir démarré le serveur Expo.  


Le projet est structuré en MVVM pour assurer une séparation claire des responsabilités et une extensibilité facile.  

**Gestion de l'état avec Redux**    

Redux Toolkit est utilisé pour simplifier la configuration du store et des slices.  
Les slices permettent de gérer des états tels que user, reservations, ou emplacements.  

**Navigation**  

La navigation est gérée avec React Navigation :  

Stack Navigator : Pour les vues de connexion, inscription, etc.  
Tab Navigator : Pour les onglets principaux comme réservations, emplacements, et messagerie.  

## **Contributions**

Les contributions sont les bienvenues ! Voici comment participer :  

Forkez le dépôt.  
Créez une branche pour vos modifications (feature/nouvelle-fonctionnalite).  
Soumettez une pull request.  

**Auteurs**

Romain Mezghenna : romain24.mezghenna01@gmail.com
Robin Vincent : robin.vin100@gmail.com
Lilian Monnereau : lilian.monnereau@gmail.com
