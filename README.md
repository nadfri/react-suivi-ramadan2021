# 📱 Suivi Ramadan - Application Web

**Application PWA de suivi personnel pendant le Ramadan** - Suivez votre jeûne, votre poids et visualisez vos progrès en temps réel.

![Version](https://img.shields.io/badge/version-2.1-blue)
![React](https://img.shields.io/badge/React-17.0.2-61dafb?logo=react)
![Firebase](https://img.shields.io/badge/Firebase-8.3.3-ffca28?logo=firebase)
![License](https://img.shields.io/badge/license-MIT-green)

**🔗 [Lien de l'application](https://suivi-ramadan.netlify.app/)**

---

## 📖 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Stack technique](#%EF%B8%8F-stack-technique)
- [Authentification](#-authentification)
- [Roadmap de refonte](#-roadmap-de-refonte)
- [Contribution](#-contribution)

---

## ✨ Fonctionnalités

### ✅ Actuellement implémentées

- 🔐 **Authentification**: Inscription/Connexion/Mot de passe oublié (Firebase Auth)
- 📅 **Suivi Ramadan**: Suivi des 30 jours avec jeûne/non-jeûne
- ⚖️ **Gestion du poids**: Enregistrement quotidien + calcul de variation
- 📊 **Statistiques**: Jours jeûnés, manqués, perte/gain de poids
- 🎨 **Thèmes**: 3 thèmes (thème clair/sombre/personnalisé) + persistance locale
- ⚙️ **Paramètres**: Modification date de début, poids initial
- 📴 **PWA**: Fonctionnement hors ligne via Workbox
- 📧 **Scripts**: Export CSV des emails utilisateurs

### 🚀 À venir (Refonte)

- TypeScript
- Composants optimisés
- Tests automatisés
- Meilleure gestion d'erreurs
- Documentation Storybook

---

## 🏗️ Architecture

### Structure des fichiers

```
src/
├── Components/
│   ├── Calendar/           # Dashboard principal
│   │   ├── Calendar.jsx    # Logique de gestion (253 lignes 🚨)
│   │   ├── Day/            # Composant jour
│   │   ├── Settings/       # Paramètres utilisateur
│   │   ├── Total/          # Statistiques
│   │   └── InfoBar/        # Barre info
│   ├── Login/              # Authentification
│   │   ├── Connexion/
│   │   ├── Inscription/
│   │   ├── Forget/
│   │   └── ToggleBtn/
│   ├── Home/               # Landing page
│   ├── ErrorModal/         # Gestion d'erreurs
│   ├── Loader/             # Skeleton loading
│   └── PwaButton/          # Installation PWA
├── Container/
│   └── App.js              # Router principal
├── Context/
│   └── Context.jsx         # Provider thème (Context API)
├── themes/
│   └── themes.js           # Définition thèmes
├── firebase.js             # Config Firebase
└── utils.js                # Constantes
```

### Flux de données

```
App (Router)
  ├─> Layout: ToggleBtn + PwaButton + Modales
  ├─> Si non authentifié: Home → Login
  └─> Si authentifié: Calendar
      ├─> Charge données Firestore
      ├─> Component Day × 30 (récursif)
      ├─> Calcule statistiques
      └─> Permet Settings
```

### Collection Firestore

```javascript
users/{uid}/
  ├── firstDay: string          // Date début Ramadan (YYYY-MM-DD)
  ├── firstPoids: number        // Poids initial
  ├── firstConnect: boolean     // 1ère connexion (settings obligatoires)
  └── jours: array[
      {
        jour: number            // Numéro jour (1-30)
        date: string            // Date formatée
        checked: boolean        // Utilisateur a coché
        valid: boolean          // A jeûné ✔
        poids: number           // Poids enregistré
      }
    ]
```

---

## 🛠️ Installation

### Prérequis

- **Node.js** 16+ (actuellement. Objectif: 18+)
- Compte **Firebase** avec Firestore
- **npm** ou **yarn**

### Étapes

1. **Cloner le projet**

   ```bash
   git clone <repo-url>
   cd react-suivi-ramadan
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Configurer Firebase** (.env)

   ```bash
   cp .env.example .env.local
   ```

   Complétez `.env.local` avec vos credentials Firebase:

   ```env
   REACT_APP_FIREBASE_API_KEY=xxx
   REACT_APP_FIREBASE_AUTH_DOMAIN=xxx
   REACT_APP_FIREBASE_PROJECT_ID=xxx
   REACT_APP_FIREBASE_STORAGE_BUCKET=xxx
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=xxx
   REACT_APP_FIREBASE_APP_ID=xxx
   REACT_APP_FIREBASE_MEASUREMENT_ID=xxx
   ```

4. **Lancer le développement**

   ```bash
   npm start
   ```

   Accès: http://localhost:3000

5. **Build production**
   ```bash
   npm run build
   ```

### Scripts disponibles

```bash
npm start          # Dev server (port 3000)
npm run build      # Build production
npm test           # Tests (Jest)
npm run eject      # ⚠️ Éject CRA (irréversible)
npm run export-emails   # Export CSV utilisateurs
```

---

## 🛠️ Stack Technique

### Frontend

| Tech             | Version | Rôle                  |
| ---------------- | ------- | --------------------- |
| **React**        | 17.0.2  | Framework UI          |
| **React Router** | 5.2.0   | Routage 🚨 Deprecated |
| **SASS**         | 1.49.10 | Styling               |
| **React Icons**  | 5.0.1   | Icônes SVG            |
| **React Switch** | 6.0.0   | Toggle switch         |

### Backend & Auth

| Tech               | Version | Rôle                              |
| ------------------ | ------- | --------------------------------- |
| **Firebase**       | 8.3.3   | Auth + Firestore 🚨 Ancien modèle |
| **firebase-admin** | 11.11.1 | Admin SDK                         |

### Outils

| Tech              | Version | Rôle                 |
| ----------------- | ------- | -------------------- |
| **react-scripts** | 4.0.3   | Build tool (CRA)     |
| **Workbox**       | 5.x     | PWA/Service Workers  |
| **moment-hijri**  | 2.1.2   | Calendrier islamique |

### À ajouter (Refonte)

- **TypeScript** - Typage statique
- **Vitest/Jest** - Tests unitaires
- **React Testing Library** - Tests composants
- **Storybook** - Documentation UI
- **ESLint/Prettier** - Code quality
- **Zustand** ou **Jotai** - State management (si besoin)

---

## 🔐 Authentification

### Flux authentification

1. Utilisateur → **Inscription** (email + password)
2. Firebase Auth génère `uid`
3. Nouveau doc Firestore créé dans collection `users`
4. **First Connect Dialog** oblige à configurer:
   - Date début Ramadan
   - Poids initial
   - Thème
5. Calendar chargé et prêt

### Points de sécurité

- ✅ Firebase Security Rules (à configurer côté Firebase)
- ✅ Variables d'env pour credentials
- ⚠️ À améliorer: Validation côté client minimaliste

---

## 📋 Roadmap de Refonte

### Phase 1: Modernisation socle

- [ ] React 17 → **React 18+**
- [ ] Firebase 8 → **Firebase Modular (compat v9+)**
- [ ] React Router 5 → **React Router 6+**
- [ ] Ajouter **TypeScript** (graduel)

### Phase 2: Architecture & Performance

- [ ] Remplacer Context API par **Zustand** (thème + auth)
- [ ] **Lazy Load** composants Login
- [ ] **Code Splitting** par route
- [ ] **React.memo** et **useCallback** optimisations
- [ ] **Error Boundaries** globales et locales

### Phase 3: Qualité code

- [ ] **ESLint** + **Prettier**
- [ ] Tests: **Vitest** + **React Testing Library**
- [ ] Coverage **80%+**
- [ ] **Storybook** pour UI components
- [ ] **Components decomposition** (Calendar → 5 composants)

### Phase 4: Features

- [ ] Notifications push (PWA)
- [ ] Statistiques avancées (graphiques)
- [ ] Export PDF/CSV
- [ ] Multi-langue (i18n)
- [ ] Dark mode amélioré

---

## 🚨 Problèmes Critiques Détectés

| Problème                      | Severité    | Solution                         |
| ----------------------------- | ----------- | -------------------------------- |
| Composant Calendar 253 lignes | 🔴 Critique | Découper en sous-composants      |
| Pas de tests                  | 🔴 Critique | Ajouter test suite (Vitest)      |
| Firebase import v8 incomplet  | 🟠 Élevé    | Migrer vers Firebase v9+ modular |
| React Router v5 deprecated    | 🟠 Élevé    | Upgrader v6+                     |
| Gestion erreurs minimaliste   | 🟠 Élevé    | Error Boundaries + toasts        |
| Context API pour 1 état       | 🟡 Moyen    | Remplacer par Zustand            |
| Pas de TypeScript             | 🟡 Moyen    | Ajouter graduel .ts/.tsx         |
| Pas de linting                | 🟡 Moyen    | ESLint + Prettier                |

---

## 📝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

---

## 📄 License

Ce projet est sous license **MIT**. Voir [LICENSE](LICENSE) pour plus de détails.

---

## 📧 Contact & Support

- 📧 Email: [contact info]
- 🐛 Issues: Ouvrir une [issue GitHub](../../issues)
- 🔗 Lien live: [https://suivi-ramadan.netlify.app/](https://suivi-ramadan.netlify.app/)

---

## 🙏 Remerciements

- Firebase pour l'infrastructure
- React community
- Tous les contributeurs

---

**Dernière mise à jour**: Février 2026 | **Statut**: En refonte
