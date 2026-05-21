# KitVault — Galerie Privée de Collection & Liste de Souhaits

Vitrine web ultra-moderne, hautement stylisée et entièrement personnalisable pour votre collection de maillots de football professionnels et vos joueurs favoris.

---

## 📁 Structure du projet

```
Site_maillot/
├── index.html              ← Fichier HTML principal (SVGs épurés, sans émojis)
├── style.css               ← Style Premium, Thèmes & Animations
├── app.js                  ← Logique des Onglets, Personnalisateur & Easter Eggs
├── data.js                 ← Base de données (Maillots, Wishlist & Effectif)
└── assets/
    ├── maillots/           ← 📸 Photos de votre collection (ex: maillot1.jpg ... maillot50.jpg)
    ├── wishlist/           ← 📸 Photos de vos souhaits (ex: maillot1.jpg ... maillot50.jpg)
    └── joueurs/            ← 📸 Photos de vos joueurs favoris (ex: joueur1.jpg ... joueur10.jpg)
```

---

## 🎨 Personnalisation Interactive (Floating Panel)

Cliquez sur l'icône d'engrenage flottante en bas à droite de votre écran pour ouvrir le panneau de personnalisation. Vous pouvez y paramétrer en temps réel :
1. **La Teinte d'Accentuation** : Or Impérial, Bleu Cyber, Vert Jade, Rose Néon, Améthyste, ou n'importe quelle couleur libre via le sélecteur HTML5 intégré.
2. **L'Ambiance de Fond** : Thèmes prédéfinis *Asphalte*, *Abysse*, *Nébuleuse* ou *Forêt*.
3. **Les Effets Visuels** : Activer ou désactiver les transitions fluides et le flou d'arrière-plan (Glassmorphism).

> **Note :** Vos préférences esthétiques sont automatiquement sauvegardées localement dans votre navigateur (`localStorage`) et appliquées à chaque chargement de page.

---

## 🚀 Comment ajouter un maillot

### Étape 1 — Ajouter l'image dans le bon dossier
Déposez l'image de votre maillot dans le dossier correspondant à son statut :
* **Détenu** : Dossier `assets/maillots/`
* **Recherché** : Dossier `assets/wishlist/`

Nommez l'image exactement selon la clé définie dans `data.js` (par exemple : `maillot1.jpg`).
> **Important :** Si le fichier image est absent physiquement du dossier, la case du maillot reste invisible automatiquement pour préserver l'élégance de la grille.

### Étape 2 — Remplir les informations dans `data.js`
Ouvrez `data.js` et configurez les détails :
```javascript
{
  id: 1,                          // Numéro d'index unique (1 à 50)
  image: "maillot1.jpg",          // Nom exact du fichier
  nom: "Maillot Domicile",        // Intitulé
  club: "Paris Saint-Germain",    // Club
  saison: "2023/2024",            // Année
  joueur: "Kylian Mbappé",        // Flocage joueur
  numero: 7,                      // Numéro (ou null)
  taille: "L",                    // Taille (S/M/L/XL...)
  etat: "Authentique",            // "Authentique" | "Replica" | "Training"
  note: 5,                        // Étoiles de 1 à 5
  ligue: "Ligue 1"                // Compétition (optionnel)
}
```

---

## 👥 Effectif des Joueurs Favoris
Le fichier de données comporte la liste complète mise à jour de vos 10 joueurs préférés avec leurs véritables clubs de rattachement professionnels (Kylian Mbappé au Real Madrid, Ousmane Dembélé, Vitinha, Nuno Mendes, Désiré Doué, Warren Zaïre-Emery et Willian Pacho au Paris Saint-Germain, Rayan Cherki à l'Olympique Lyonnais, Michael Olise et Kingsley Coman au Bayern Munich).

---

## 🥚 Easter Eggs & Micro-animations Secrètes

Pour ajouter une touche de dynamisme interactif, des animations exclusives ont été implémentées :
* **Jet de Confettis de Match** : Double-cliquez sur le logo **KitVault** (ou sur le drapeau tricolore) en haut à gauche pour lancer une pluie de confettis festifs générée sur mesure via Canvas.
* **Mode Overdrive Néon** : Cliquez **5 fois d'affilée rapidement** sur le logo **KitVault** pour surcharger le site de pulsations lumineuses néon pendant 6 secondes.
* **Hologramme Numérique** : Cliquez sur le badge d'indexation d'un maillot (ex: `#1`) pour projeter un filtre holographique animé sur l'image du maillot pendant 3 secondes.
* **Spin Card 3D** : Double-cliquez sur la carte d'un joueur, ou cliquez simplement sur sa photo, pour déclencher une rotation complète en 3D de son portrait.

---

## 🌐 Mode d'Exécution Conseillé

Afin de permettre au script JavaScript de vérifier l'existence des images dans vos répertoires locaux en raison des politiques de sécurité des navigateurs (CORS / protocoles `file://`), il est vivement conseillé de lancer le site via un serveur local :
* **VS Code** : Installez l'extension **Live Server**, puis cliquez sur **Go Live** au bas de la fenêtre.
* **Node.js** / **Python** : Utilisez un serveur léger de type `http-server` ou `python -m http.server`.
