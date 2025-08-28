# MR Naim Educational App

Une application mobile éducative construite avec React Native et Expo, permettant aux enseignants de partager des activités pédagogiques avec leurs étudiants.

## 🎯 Fonctionnalités

### Pour les Étudiants

- **Connexion sécurisée** avec email et mot de passe
- **Sélection de classe** (1ère année, 2ème année, 3ème année, Bac)
- **Consultation d'activités** adaptées à leur niveau
- **Affichage HTML** des exercices et séries
- **Visualisation des corrections** avec bouton toggle
- **Interface intuitive** avec navigation par onglets

### Pour les Professeurs (Admin)

- **Gestion complète** des activités
- **Création d'activités** avec contenu HTML
- **Support multi-niveaux** (toutes les classes)
- **Corrections intégrées** pour chaque activité
- **Vue d'ensemble** de toutes les activités créées

## 🚀 Technologies utilisées

- **React Native** avec Expo
- **React Navigation 6** pour la navigation
- **Expo SecureStore** pour l'authentification
- **react-native-render-html** pour l'affichage HTML
- **Expo Linear Gradient** pour les dégradés
- **React Context** pour la gestion d'état

## 📱 Installation et lancement

### Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn
- Expo CLI (`npm install -g @expo/cli`)
- Application Expo Go sur votre téléphone

### Installation

1. Clonez le projet :

```bash
git clone <repository-url>
cd "MR Naim app"
```

2. Installez les dépendances :

```bash
npm install
```

3. Lancez le projet :

```bash
npm start
```

4. Scannez le QR code avec l'app Expo Go ou utilisez un émulateur

## 🔑 Comptes de démonstration

### Professeur (Admin)

- **Email :** admin@school.com
- **Mot de passe :** admin123

### Étudiant

- **Email :** student1@school.com
- **Mot de passe :** student123
- **Classe :** 1ère année

### Étudiant 2

- **Email :** student2@school.com
- **Mot de passe :** student123
- **Classe :** 2ème année

## 📁 Structure du projet

```
src/
├── components/          # Composants réutilisables
├── context/            # Contextes React (Auth)
├── data/               # Données de démonstration
├── navigation/         # Configuration de navigation
├── screens/            # Écrans de l'application
├── services/           # Services API (futurs)
└── utils/              # Utilitaires
```

## 🎨 Écrans principaux

1. **Écran de connexion** - Authentification utilisateur
2. **Sélection de classe** - Choix du niveau (étudiants uniquement)
3. **Accueil** - Liste des activités disponibles
4. **Détail d'activité** - Contenu HTML avec toggle correction
5. **Création d'activité** - Interface admin pour ajouter du contenu
6. **Profil** - Informations utilisateur et déconnexion

## 🔄 Flux d'utilisation

### Étudiant

1. Connexion avec identifiants
2. Sélection de la classe/niveau
3. Navigation dans les activités de sa classe
4. Consultation des exercices et corrections

### Professeur

1. Connexion avec identifiants admin
2. Accès direct à toutes les activités
3. Création de nouvelles activités
4. Gestion du contenu HTML et corrections

## 🛠 Scripts disponibles

- `npm start` - Lance le serveur de développement Expo
- `npm run android` - Lance sur émulateur Android
- `npm run ios` - Lance sur simulateur iOS (macOS uniquement)
- `npm run web` - Lance la version web

## 📝 Prochaines fonctionnalités

- 🔄 Intégration avec API backend
- 📊 Dashboard web pour les professeurs
- 📱 Notifications push
- 📁 Upload de fichiers multimédias
- 👥 Gestion avancée des utilisateurs
- 📈 Statistiques de progression
- 🔍 Recherche dans les activités

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 👨‍💻 Développeur

Développé pour **MR Naim** - Plateforme éducative moderne

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
