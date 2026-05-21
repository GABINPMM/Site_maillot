/**
 * ═══════════════════════════════════════════════════════════════
 *  data.js — Base de données de ta collection
 * ═══════════════════════════════════════════════════════════════
 *
 *  📁 DOSSIERS D'IMAGES :
 *     • Collection  → assets/maillots/maillot1.jpg  … maillot50.jpg
 *     • Wishlist    → assets/wishlist/maillot1.jpg  … maillot50.jpg
 *     • Joueurs     → assets/joueurs/joueur1.jpg    … joueurN.jpg
 *
 *  📝 REMPLIR UN MAILLOT :
 *     id       → numéro de 1 à 50
 *     image    → nom exact du fichier (ex: "maillot3.jpg")
 *     nom      → intitulé du maillot
 *     club     → nom du club
 *     saison   → ex: "2023/2024"
 *     joueur   → prénom + nom du joueur
 *     numero   → numéro de dos (entier ou null)
 *     taille   → "S" | "M" | "L" | "XL" | "XXL"
 *     etat     → "Authentique" | "Replica" | "Training"
 *     note     → 1 à 5 étoiles
 *     ligue    → nom de la compétition (optionnel)
 *
 *  ⚠️  Si le fichier image est absent, la carte est masquée.
 * ═══════════════════════════════════════════════════════════════
 */

// ── MA COLLECTION ────────────────────────────────────────────────
// Images dans :  assets/maillots/
const COLLECTION = [
  {
    id: 1,
    image: "maillot1.jpg",
    nom: "Maillot Domicile",
    club: "Angers SCO",
    saison: "2023/2024",
    joueur: "",
    numero: null,
    taille: "M",
    etat: "Authentique",
    note: 4,
    ligue: "Ligue 1"
  },
  {
    id: 2,
    image: "maillot2.jpg",
    nom: "Maillot Third",
    club: "Arsenal",
    saison: "2022/2023",
    joueur: "",
    numero: null,
    taille: "M",
    etat: "Authentique",
    note: 4,
    ligue: "Premier League"
  },
  {
    id: 3,
    image: "maillot3.jpg",
    nom: "Maillot Domicile",
    club: "Aston Villa",
    saison: "2024/2025",
    joueur: "Digne",
    numero: 12,
    taille: "M",
    etat: "Authentique",
    note: 4,
    ligue: "Premier League"
  },
  {
    id: 4,
    image: "maillot4.jpg",
    nom: "Maillot Extérieur",
    club: "Paris Saint-Germain",
    saison: "2021/2022",
    joueur: "",
    numero: null,
    taille: "M",
    etat: "Authentique",
    note: 5,
    ligue: "Ligue 1"
  },
  {
    id: 5,
    image: "maillot5.jpg",
    nom: "Maillot Domicile",
    club: "Newcastle United",
    saison: "2024/2025",
    joueur: "",
    numero: null,
    taille: "M",
    etat: "Authentique",
    note: 4,
    ligue: "Premier League"
  },
  {
    id: 6,
    image: "maillot6.jpg",
    nom: "Maillot Domicile",
    club: "Brésil",
    saison: "2022/2023",
    joueur: "",
    numero: null,
    taille: "M",
    etat: "Authentique",
    note: 5,
    ligue: "Sélection nationale"
  },
  {
    id: 7,
    image: "maillot7.jpg",
    nom: "Maillot Extérieur",
    club: "Angers SCO",
    saison: "2022/2023",
    joueur: "",
    numero: null,
    taille: "M",
    etat: "Authentique",
    note: 4,
    ligue: "Ligue 1"
  },
  {
    id: 8,
    image: "maillot8.jpg",
    nom: "Maillot Domicile",
    club: "Atlético Madrid",
    saison: "2016/2017",
    joueur: "",
    numero: null,
    taille: "M",
    etat: "Authentique",
    note: 5,
    ligue: "Liga"
  },
  {
    id: 9,
    image: "maillot9.jpg",
    nom: "Maillot Domicile",
    club: "Paris Saint-Germain",
    saison: "2023/2024",
    joueur: "Hakimi",
    numero: 2,
    taille: "M",
    etat: "Authentique",
    note: 5,
    ligue: "Ligue 1"
  },
  {
    id: 10,
    image: "maillot10.jpg",
    nom: "Maillot Third",
    club: "AC Milan",
    saison: "2022/2023",
    joueur: "",
    numero: null,
    taille: "M",
    etat: "Authentique",
    note: 4,
    ligue: "Serie A"
  },
  {
    id: 11,
    image: "maillot11.jpg",
    nom: "Maillot Extérieur",
    club: "Ajax Amsterdam",
    saison: "2023/2024",
    joueur: "",
    numero: null,
    taille: "M",
    etat: "Authentique",
    note: 4,
    ligue: "Eredivisie"
  },
  {
    id: 12,
    image: "maillot12.jpg",
    nom: "Maillot Domicile Rétro",
    club: "Paris Saint-Germain",
    saison: "1992/1993",
    joueur: "",
    numero: null,
    taille: "M",
    etat: "Authentique",
    note: 5,
    ligue: "Ligue 1"
  },
  {
    id: 13,
    image: "maillot13.jpg",
    nom: "Maillot Extérieur",
    club: "Everton",
    saison: "2022/2023",
    joueur: "",
    numero: null,
    taille: "M",
    etat: "Authentique",
    note: 4,
    ligue: "Premier League"
  },
  {
    id: 14,
    image: "maillot14.jpg",
    nom: "Maillot Spécial Versace",
    club: "Italie",
    saison: "2023",
    joueur: "",
    numero: null,
    taille: "M",
    etat: "Authentique",
    note: 5,
    ligue: "Sélection nationale"
  },
  {
    id: 15,
    image: "maillot15.jpg",
    nom: "Maillot Third",
    club: "France",
    saison: "2022/2023",
    joueur: "",
    numero: null,
    taille: "M",
    etat: "Authentique",
    note: 5,
    ligue: "Sélection nationale"
  },
  {
    id: 16,
    image: "maillot16.jpg",
    nom: "Maillot Extérieur",
    club: "Paris Saint-Germain",
    saison: "2021/2022",
    joueur: "Messi",
    numero: 30,
    taille: "M",
    etat: "Authentique",
    note: 4,
    ligue: "Ligue 1"
  },
  {
    id: 17,
    image: "maillot17.jpg",
    nom: "Maillot Extérieur Coupe du Monde",
    club: "France",
    saison: "2018",
    joueur: "",
    numero: null,
    taille: "M",
    etat: "Authentique",
    note: 5,
    ligue: "Coupe du Monde"
  },
  {
    id: 18,
    image: "maillot18.jpg",
    nom: "Maillot Extérieur Manches Longues",
    club: "Paris Saint-Germain",
    saison: "2024/2025",
    joueur: "",
    numero: null,
    taille: "M",
    etat: "Authentique",
    note: 4,
    ligue: "Ligue 1"
  },
  {
    id: 19,
    image: "maillot19.jpg",
    nom: "Maillot Extérieur",
    club: "Manchester United",
    saison: "2022/2023",
    joueur: "Ronaldo",
    numero: 7,
    taille: "M",
    etat: "Authentique",
    note: 4,
    ligue: "Premier League"
  },
  {
    id: 20,
    image: "maillot20.jpg",
    nom: "Maillot Domicile Rétro",
    club: "France",
    saison: "1982",
    joueur: "PRP",
    numero: 10,
    taille: "M",
    etat: "Authentique",
    note: 5,
    ligue: "Sélection nationale"
  },
  {
    id: 21,
    image: "maillot21.jpg",
    nom: "Maillot Domicile",
    club: "Real Madrid",
    saison: "2023/2024",
    joueur: "",
    numero: null,
    taille: "M",
    etat: "Authentique",
    note: 5,
    ligue: "Liga"
  },
  {
    id: 22,
    image: "maillot22.jpg",
    nom: "Maillot Domicile Coupe du Monde",
    club: "France",
    saison: "2018",
    joueur: "",
    numero: null,
    taille: "M",
    etat: "Authentique",
    note: 5,
    ligue: "Coupe du Monde"
  },
  {
    id: 23,
    image: "maillot23.jpg",
    nom: "Maillot Spécial",
    club: "Brésil",
    saison: "2022",
    joueur: "",
    numero: null,
    taille: "M",
    etat: "Authentique",
    note: 5,
    ligue: "Sélection nationale"
  },
  {
    id: 24,
    image: "maillot24.jpg",
    nom: "Maillot Extérieur",
    club: "Inter Milan",
    saison: "2022/2023",
    joueur: "",
    numero: null,
    taille: "M",
    etat: "Authentique",
    note: 4,
    ligue: "Serie A"
  },
  {
    id: 25,
    image: "maillot25.jpg",
    nom: "Maillot Domicile",
    club: "Real Madrid",
    saison: "2022/2023",
    joueur: "Benzema",
    numero: 9,
    taille: "M",
    etat: "Authentique",
    note: 5,
    ligue: "Liga"
  },
  {
    id: 26,
    image: "maillot26.jpg",
    nom: "Maillot Fourth",
    club: "Paris Saint-Germain",
    saison: "2020/2021",
    joueur: "",
    numero: null,
    taille: "M",
    etat: "Authentique",
    note: 5,
    ligue: "Ligue 1"
  },
  {
    id: 27,
    image: "maillot27.jpg",
    nom: "Maillot Domicile",
    club: "Paris Saint-Germain",
    saison: "2024/2025",
    joueur: "Dembele",
    numero: 7,
    taille: "M",
    etat: "Authentique",
    note: 5,
    ligue: "Ligue 1"
  },
  {
    id: 28,
    image: "maillot28.jpg",
    nom: "Maillot Domicile",
    club: "Ins'Shatta",
    saison: "2024/2025",
    joueur: "HS",
    numero: 9,
    taille: "M",
    etat: "Authentique",
    note: 4,
    ligue: ""
  },
  {
    id: 29,
    image: "maillot29.jpg",
    nom: "Maillot Domicile",
    club: "Real Madrid",
    saison: "2023/2024",
    joueur: "Bellingham",
    numero: 5,
    taille: "M",
    etat: "Authentique",
    note: 5,
    ligue: "Liga"
  },
  {
    id: 30,
    image: "maillot30.jpg",
    nom: "Maillot Entraînement",
    club: "Angers SCO",
    saison: "2023/2024",
    joueur: "Cherif",
    numero: 11,
    taille: "M",
    etat: "Authentique",
    note: 3,
    ligue: "Ligue 1"
  },
  {
    id: 31,
    image: "maillot31.jpg",
    nom: "Maillot Third",
    club: "Real Madrid",
    saison: "2023/2024",
    joueur: "",
    numero: null,
    taille: "M",
    etat: "Authentique",
    note: 5,
    ligue: "Liga"
  },
  {
    id: 32,
    image: "maillot32.jpg",
    nom: "Maillot Third",
    club: "Paris Saint-Germain",
    saison: "2024/2025", joueur: "Kvara",
    numero: 7,
    taille: "M",
    etat: "Authentique",
    note: 5,
    ligue: "Ligue 1"
  },
  { id: 33, image: "maillot33.jpg", nom: "", club: "", saison: "", joueur: "", numero: null, taille: "", etat: "", note: 0, ligue: "" },
  { id: 34, image: "maillot34.jpg", nom: "", club: "", saison: "", joueur: "", numero: null, taille: "", etat: "", note: 0, ligue: "" },
  { id: 35, image: "maillot35.jpg", nom: "", club: "", saison: "", joueur: "", numero: null, taille: "", etat: "", note: 0, ligue: "" },
  { id: 36, image: "maillot36.jpg", nom: "", club: "", saison: "", joueur: "", numero: null, taille: "", etat: "", note: 0, ligue: "" },
  { id: 37, image: "maillot37.jpg", nom: "", club: "", saison: "", joueur: "", numero: null, taille: "", etat: "", note: 0, ligue: "" },
  { id: 38, image: "maillot38.jpg", nom: "", club: "", saison: "", joueur: "", numero: null, taille: "", etat: "", note: 0, ligue: "" },
  { id: 39, image: "maillot39.jpg", nom: "", club: "", saison: "", joueur: "", numero: null, taille: "", etat: "", note: 0, ligue: "" },
  { id: 40, image: "maillot40.jpg", nom: "", club: "", saison: "", joueur: "", numero: null, taille: "", etat: "", note: 0, ligue: "" },
  { id: 41, image: "maillot41.jpg", nom: "", club: "", saison: "", joueur: "", numero: null, taille: "", etat: "", note: 0, ligue: "" },
  { id: 42, image: "maillot42.jpg", nom: "", club: "", saison: "", joueur: "", numero: null, taille: "", etat: "", note: 0, ligue: "" },
  { id: 43, image: "maillot43.jpg", nom: "", club: "", saison: "", joueur: "", numero: null, taille: "", etat: "", note: 0, ligue: "" },
  { id: 44, image: "maillot44.jpg", nom: "", club: "", saison: "", joueur: "", numero: null, taille: "", etat: "", note: 0, ligue: "" },
  { id: 45, image: "maillot45.jpg", nom: "", club: "", saison: "", joueur: "", numero: null, taille: "", etat: "", note: 0, ligue: "" },
  { id: 46, image: "maillot46.jpg", nom: "", club: "", saison: "", joueur: "", numero: null, taille: "", etat: "", note: 0, ligue: "" },
  { id: 47, image: "maillot47.jpg", nom: "", club: "", saison: "", joueur: "", numero: null, taille: "", etat: "", note: 0, ligue: "" },
  { id: 48, image: "maillot48.jpg", nom: "", club: "", saison: "", joueur: "", numero: null, taille: "", etat: "", note: 0, ligue: "" },
  { id: 49, image: "maillot49.jpg", nom: "", club: "", saison: "", joueur: "", numero: null, taille: "", etat: "", note: 0, ligue: "" },
  { id: 50, image: "maillot50.jpg", nom: "", club: "", saison: "", joueur: "", numero: null, taille: "", etat: "", note: 0, ligue: "" },
];

// ── MA WISHLIST ──────────────────────────────────────────────────
// Images dans :  assets/wishlist/   ← dossier SÉPARÉ !
const WISHLIST = [
  {
    id: 1,
    image: "maillot1.jpg",
    nom: "Maillot Domicile",
    club: "Inter Milan",
    saison: "2023/2024",
    joueur: "Lautaro Martínez",
    numero: 10,
    taille: "L",
    etat: "Authentique",
    note: 5,
    ligue: "Serie A"
  },
  {
    id: 2,
    image: "maillot2.jpg",
    nom: "Maillot Extérieur",
    club: "Borussia Dortmund",
    saison: "2023/2024",
    joueur: "Jude Bellingham",
    numero: 22,
    taille: "M",
    etat: "Authentique",
    note: 5,
    ligue: "Bundesliga"
  },
  // Ajoute tes maillots souhaités ici…
];

// ── JOUEURS FAVORIS ──────────────────────────────────────────────
// Photos dans :  assets/joueurs/
const JOUEURS = [
  {
    id: 1,
    photo: "joueur1.jpg",
    nom: "Kylian Mbappé",
    poste: "Attaquant",
    club: "Real Madrid",
    nationalite: "France",
    drapeau: "FR",
    palmares: ["Coupe du Monde 2018", "Ligue 1 x 7", "Ligue des Champions Finaliste"],
    description: "Un des attaquants les plus rapides et décisifs de la planète football, joueur cadre du Real Madrid."
  },
  {
    id: 2,
    photo: "joueur2.jpg",
    nom: "Rayan Cherki",
    poste: "Milieu offensif",
    club: "Olympique Lyonnais",
    nationalite: "France",
    drapeau: "FR",
    palmares: ["Médaille d'Argent JO 2024", "Finaliste Coupe de France"],
    description: "Dribbleur hors-pair formé à Lyon, reconnu pour sa créativité technique exceptionnelle et sa vision du jeu."
  },
  {
    id: 3,
    photo: "joueur3.jpg",
    nom: "Michael Olise",
    poste: "Milieu offensif / Ailier",
    club: "Bayern Munich",
    nationalite: "France",
    drapeau: "FR",
    palmares: ["Médaille d'Argent JO 2024"],
    description: "Ailier percutant et précis, doté d'une superbe qualité de centre et de frappe, faisant le bonheur du club bavarois."
  },
  {
    id: 4,
    photo: "joueur4.jpg",
    nom: "Ousmane Dembélé",
    poste: "Ailier",
    club: "Paris Saint-Germain",
    nationalite: "France",
    drapeau: "FR",
    palmares: ["Coupe du Monde 2018", "La Liga x 3", "Ligue 1 2024"],
    description: "Dribbleur imprévisible et ambidextre, capable d'éliminer n'importe quel défenseur sur une accélération dévastatrice."
  },
  {
    id: 5,
    photo: "joueur5.jpg",
    nom: "Vitinha",
    poste: "Milieu de terrain",
    club: "Paris Saint-Germain",
    nationalite: "Portugal",
    drapeau: "PT",
    palmares: ["Primeira Liga x 2", "Ligue 1 x 2", "Coupe de France 2024"],
    description: "Le chef d'orchestre du milieu parisien, excellent dans la conservation du ballon sous pression et la relance propre."
  },
  {
    id: 6,
    photo: "joueur6.jpg",
    nom: "Nuno Mendes",
    poste: "Défenseur gauche",
    club: "Paris Saint-Germain",
    nationalite: "Portugal",
    drapeau: "PT",
    palmares: ["Ligue 1 x 2", "Primeira Liga", "Coupe de France 2024"],
    description: "Latéral moderne ultra-rapide et offensif, apportant continuellement le danger sur son flanc gauche."
  },
  {
    id: 7,
    photo: "joueur7.jpg",
    nom: "Désiré Doué",
    poste: "Milieu offensif",
    club: "Paris Saint-Germain",
    nationalite: "France",
    drapeau: "FR",
    palmares: ["Médaille d'Argent JO 2024"],
    description: "Jeune prodige polyvalent et technique, doté d'une grande intelligence de jeu et d'un fort potentiel de progression."
  },
  {
    id: 8,
    photo: "joueur8.jpg",
    nom: "Warren Zaïre-Emery",
    poste: "Milieu de terrain",
    club: "Paris Saint-Germain",
    nationalite: "France",
    drapeau: "FR",
    palmares: ["Ligue 1 x 2", "Coupe de France 2024", "Trophée des Champions"],
    description: "Pur produit de la formation parisienne, alliant maturité tactique exceptionnelle et impact physique à son jeune âge."
  },
  {
    id: 9,
    photo: "joueur9.jpg",
    nom: "Willian Pacho",
    poste: "Défenseur central",
    club: "Paris Saint-Germain",
    nationalite: "Équateur",
    drapeau: "EC",
    palmares: ["Jupiler Pro League", "Coupe de Belgique"],
    description: "Défenseur central solide et rigoureux, excellent dans le duel et précieux dans l'anticipation défensive."
  },
  {
    id: 10,
    photo: "joueur10.jpg",
    nom: "Kingsley Coman",
    poste: "Ailier",
    club: "Bayern Munich",
    nationalite: "France",
    drapeau: "FR",
    palmares: ["UEFA Champions League 2020", "Bundesliga x 8", "Serie A x 2", "Ligue 1 x 2"],
    description: "L'un des palmarès les plus impressionnants du football mondial. Buteur décisif en finale de la Ligue des Champions."
  }
];

