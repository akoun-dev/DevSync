# 🚀 DevSync — Application de gestion de projet pour développeurs & managers

**DevSync** est une application web moderne conçue pour aider les développeurs et leurs managers à organiser, suivre et piloter leurs projets techniques efficacement. Elle offre un système de gestion de tâches, d’équipes, de projets et de visualisation graphique de la performance.

---

## 🧰 Stack technique

- **Frontend** : React + Vite
- **Style** : Tailwind CSS + Shadcn UI
- **Backend-as-a-Service** : Supabase (auth, base de données, RLS, stockage)
- **Graphiques** : Recharts ou Chart.js
- **Déploiement** : Vercel ou Netlify

---

## 🧩 Fonctionnalités principales

### 👥 Gestion des rôles
- Authentification via email/password (Supabase Auth)
- Rôles : `Développeur` et `Manager` avec redirection adaptée

### 📁 Projets
- Création, modification et suppression de projets
- Affectation d'équipes
- Vue Kanban ou tableau

### ✅ Tâches
- Création de tâches, sous-tâches, étiquettes, priorités
- Attribution à des développeurs
- Suivi de l’état : À faire → En cours → Terminé

### 🧑‍🤝‍🧑 Équipes
- Création d'équipes (manager uniquement)
- Affectation et retrait de développeurs
- Vue des membres avec leurs tâches

### 💬 Collaboration
- Commentaires sur les tâches
- Notifications internes

### 📊 Tableau de bord Manager
- Graphiques : avancement, répartition des tâches, retards
- Statistiques globales par projet
- Vue calendrier

---

## 🔧 Installation locale

### 1. Cloner le repo

```bash
git clone https://github.com/votre-utilisateur/devsync.git
cd devsync
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Créez un fichier `.env` à la racine du projet avec au minimum :

```bash
VITE_SUPABASE_URL=<votre-url-supabase>
VITE_SUPABASE_ANON_KEY=<votre-anon-key>
```

### 4. Lancer le serveur de développement

```bash
npm run dev
```

### 5. Construire la version de production

```bash
npm run build
```
