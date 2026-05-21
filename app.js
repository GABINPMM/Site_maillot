/* ═══════════════════════════════════════════════════════════════
   app.js — Logique complète interactive et professionnelle
   • Gestion des onglets de navigation
   • Chargement intelligent des grilles (Collection, Wishlist, Joueurs)
   • Personnalisateur de couleurs, thèmes et effets visuels (sauvegarde locale)
   • Intégration d'easter eggs animés et interactifs
═══════════════════════════════════════════════════════════════ */

'use strict';

/* ── État de l'application ──────────────────────────────────── */
const état = {
  onglet:          'collection',
  nbCollection:    0,
  nbWishlist:      0,
  renduWishlist:   false,
  renduJoueurs:    false,
  clicsLogo:       0,
  tempsDernierClic: 0,
  modeAffichage:   'normal', // 'normal' | 'fullscreen'
  indexFullscreen: 0,        // index du maillot affiché en plein écran
};

/* ══════════════════════════════════════════════════════════════
   VÉRIFICATION DES IMAGES (Maintien des cases vides invisibles)
══════════════════════════════════════════════════════════════ */

/**
 * Tente de charger l'image pour vérifier son existence réelle.
 * @param {string} src Chemin de l'image
 * @returns {Promise<boolean>} true si l'image existe
 */
function imageDisponible(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload  = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

/* ══════════════════════════════════════════════════════════════
   GÉNÉRATEURS HTML (Aucun émoji, icônes pures et épurées)
══════════════════════════════════════════════════════════════ */

/** Génère les étoiles de notation */
function étoiles(note) {
  return Array.from({ length: 5 }, (_, i) =>
    `<span class="star${i < note ? ' on' : ''}">★</span>`
  ).join('');
}

/** Convertit l'état du maillot en classe CSS */
function classeEtat(etat) {
  const map = { 'Authentique': 'auth', 'Replica': 'rep', 'Training': 'train' };
  return map[etat] || 'rep';
}

/** Formate le numéro de dos */
function numDos(n) { return n != null ? `N°${n}` : '—'; }

/**
 * HTML d'une carte de maillot.
 * @param {Object} item Données du maillot
 * @param {string} mode 'collection' | 'wishlist'
 */
function htmlCarte(item, mode) {
  const nom    = item.nom    || `Maillot ${item.id}`;
  const club   = item.club   || 'Club inconnu';
  const saison = item.saison || '—';
  const joueur = item.joueur || '—';
  const taille = item.taille || '—';
  const ligue  = item.ligue  || '';

  // SVG de coeur épuré pour la wishlist
  const badgeWish = mode === 'wishlist'
    ? `<div class="card-wish" aria-label="Maillot souhaité">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/>
        </svg>
       </div>`
    : '';

  const badgeEtat = item.etat
    ? `<div class="card-etat ${classeEtat(item.etat)}">${item.etat}</div>`
    : '';

  const libelleBadge = mode === 'collection' ? `#${item.id}` : `ID ${item.id}`;

  return `
<article class="jersey-card" id="${mode}-${item.id}" role="listitem" aria-label="${nom} — ${club}">
  ${badgeWish}
  <div class="card-badge" data-egg="badge" title="Activer l'hologramme">${libelleBadge}</div>

  <div class="card-img-zone">
    <img
      class="card-img"
      src="assets/${mode === 'collection' ? 'maillots' : 'wishlist'}/${item.image}"
      alt="${nom} ${club} ${saison}"
      loading="lazy"
      draggable="false"
    />
  </div>

  <div class="card-info">
    <div class="info-name">${nom}</div>
    <div class="info-club">
      <span>${club}</span>
      ${ligue ? `<span class="info-ligue">${ligue}</span>` : ''}
    </div>

    <div class="info-grid">
      <div class="info-field">
        <span class="field-label">Saison</span>
        <span class="field-val">${saison}</span>
      </div>
      <div class="info-field">
        <span class="field-label">Joueur</span>
        <span class="field-val">${joueur}</span>
      </div>
      <div class="info-field">
        <span class="field-label">Numéro</span>
        <span class="field-val">${numDos(item.numero)}</span>
      </div>
      <div class="info-field">
        <span class="field-label">Taille</span>
        <span class="field-val">${taille}</span>
      </div>
    </div>

    <div class="info-stars">${étoiles(item.note)}</div>
  </div>

  ${badgeEtat}
</article>`;
}

/**
 * HTML pour la vue plein écran (un maillot à la fois, géant et sublime)
 */
function htmlFullscreenViewer(item, index, total) {
  const nom    = item.nom    || `Maillot ${item.id}`;
  const club   = item.club   || 'Club inconnu';
  const saison = item.saison || '—';
  const joueur = item.joueur || '—';
  const taille = item.taille || '—';
  const ligue  = item.ligue  || '';
  const etat   = item.etat   || '—';
  const note   = item.note   || 0;
  const numero = item.numero != null ? `N°${item.numero}` : '—';

  return `
<div class="fullscreen-viewer">
  <!-- Left Side: Interactive Giant Jersey -->
  <div class="fullscreen-left">
    <button class="nav-arrow prev" id="fs-prev" aria-label="Précédent">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="m15 18-6-6 6-6"/>
      </svg>
    </button>

    <div class="fullscreen-card-wrapper">
      <div class="fullscreen-card" id="fs-card-${item.id}">
        <div class="card-badge fs-badge">#${item.id}</div>
        <div class="fs-card-img-zone">
          <img
            class="fs-card-img"
            src="assets/maillots/${item.image}"
            alt="${nom} ${club} ${saison}"
            draggable="false"
          />
        </div>
      </div>
    </div>

    <button class="nav-arrow next" id="fs-next" aria-label="Suivant">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="m9 18 6-6-6-6"/>
      </svg>
    </button>
  </div>

  <!-- Right Side: Details panel -->
  <div class="fullscreen-right">
    <div class="fs-pagination">${index + 1} / ${total}</div>
    <h2 class="fs-club-title">${club}</h2>
    <div class="fs-jersey-name">${nom}</div>
    ${ligue ? `<div class="fs-ligue-badge">${ligue}</div>` : ''}

    <div class="fs-details-grid">
      <div class="fs-detail-card">
        <span class="fs-lbl">Saison</span>
        <span class="fs-val">${saison}</span>
      </div>
      <div class="fs-detail-card">
        <span class="fs-lbl">Joueur</span>
        <span class="fs-val">${joueur}</span>
      </div>
      <div class="fs-detail-card">
        <span class="fs-lbl">Numéro</span>
        <span class="fs-val">${numero}</span>
      </div>
      <div class="fs-detail-card">
        <span class="fs-lbl">Taille</span>
        <span class="fs-val">${taille}</span>
      </div>
      <div class="fs-detail-card">
        <span class="fs-lbl">Condition</span>
        <span class="fs-val ${classeEtat(etat)}-text">${etat}</span>
      </div>
      <div class="fs-detail-card">
        <span class="fs-lbl">Note</span>
        <span class="fs-val fs-stars">${étoiles(note)}</span>
      </div>
    </div>
  </div>
</div>
`;
}

/* ══════════════════════════════════════════════════════════════
   CHARGEMENT DE LA COLLECTION & WISHLIST
══════════════════════════════════════════════════════════════ */

/* ── Catégories de ligues pour le classement ──────────────── */
const CATEGORIES_LIGUES = [
  {
    id: 'ligue1',
    label: 'Ligue 1',
    icon: '🇫🇷',
    match: ligue => ['Ligue 1', 'Ligue 2'].includes(ligue)
  },
  {
    id: 'premier-league',
    label: 'Premier League',
    icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    match: ligue => ligue === 'Premier League'
  },
  {
    id: 'liga',
    label: 'Liga',
    icon: '🇪🇸',
    match: ligue => ligue === 'Liga'
  },
  {
    id: 'autre',
    label: 'Autre',
    icon: '🌍',
    match: () => true  // Fallback — tout ce qui n'a pas matché avant
  }
];

/**
 * Génère le HTML d'un en-tête de catégorie de ligue.
 */
function htmlCategorieHeader(categorie, count) {
  return `
<div class="league-category" id="cat-${categorie.id}">
  <div class="league-header">
    <span class="league-icon">${categorie.icon}</span>
    <h2 class="league-title">${categorie.label}</h2>
    <span class="league-count">${count} maillot${count > 1 ? 's' : ''}</span>
    <div class="league-line"></div>
  </div>
  <div class="jersey-grid" role="list" aria-label="Maillots ${categorie.label}">
`;
}

/**
 * Cache pour stocker les maillots valides (avec image) de la collection actuelle
 */
window.validCollectionItems = [];

/**
 * Affiche le maillot actuel en plein écran avec transitions fluides
 */
function afficherFullscreen(valides) {
  const fsContainer = document.getElementById('fullscreen-collection');
  if (!fsContainer) return;

  const item = valides[état.indexFullscreen];
  if (!item) return;

  fsContainer.innerHTML = htmlFullscreenViewer(item, état.indexFullscreen, valides.length);

  // Attacher les écouteurs d'événements
  const btnPrev = document.getElementById('fs-prev');
  const btnNext = document.getElementById('fs-next');

  if (btnPrev) {
    btnPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      état.indexFullscreen = (état.indexFullscreen - 1 + valides.length) % valides.length;
      afficherFullscreen(valides);
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', (e) => {
      e.stopPropagation();
      état.indexFullscreen = (état.indexFullscreen + 1) % valides.length;
      afficherFullscreen(valides);
    });
  }

  // Effet d'inclinaison 3D ultra premium sur la carte géante
  const fsCard = fsContainer.querySelector('.fullscreen-card');
  if (fsCard) {
    fsCard.addEventListener('mousemove', (e) => {
      const rect = fsCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      const angleX = (yc - y) / 10;
      const angleY = (x - xc) / 10;
      fsCard.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
    });

    fsCard.addEventListener('mouseleave', () => {
      fsCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
  }
}

// Navigation au clavier pour le plein écran
document.addEventListener('keydown', (e) => {
  if (état.onglet === 'collection' && état.modeAffichage === 'fullscreen') {
    if (window.validCollectionItems && window.validCollectionItems.length > 0) {
      if (e.key === 'ArrowLeft') {
        état.indexFullscreen = (état.indexFullscreen - 1 + window.validCollectionItems.length) % window.validCollectionItems.length;
        afficherFullscreen(window.validCollectionItems);
      } else if (e.key === 'ArrowRight') {
        état.indexFullscreen = (état.indexFullscreen + 1) % window.validCollectionItems.length;
        afficherFullscreen(window.validCollectionItems);
      }
    }
  }
});

async function afficherGrille(items, mode, gridId, badgeId, metaId) {
  const grille = document.getElementById(gridId);
  if (!grille) return;

  grille.innerHTML = `
    <div class="loading-state">
      <div class="spinner"></div>
      Vérification de la galerie…
    </div>`;

  const dossier = mode === 'collection' ? 'maillots' : 'wishlist';
  
  // Vérification de la présence des fichiers images (cases sans images non affichées)
  const verifs = await Promise.all(
    items.map(async item => ({
      item,
      existe: await imageDisponible(`assets/${dossier}/${item.image}`)
    }))
  );

  const valides = verifs.filter(v => v.existe);

  // Mise à jour des compteurs et statistiques
  const badge = document.getElementById(badgeId);
  if (badge) badge.textContent = valides.length;

  const meta = document.getElementById(metaId);
  if (meta) meta.textContent = valides.length;

  if (mode === 'collection') état.nbCollection = valides.length;
  else                       état.nbWishlist   = valides.length;

  majStatsGlobales();

  if (valides.length === 0) {
    const cibleDossier = mode === 'collection' ? 'assets/maillots/' : 'assets/wishlist/';
    grille.innerHTML = `
      <div class="empty-state">
        <div class="empty-ico">🗂️</div>
        <div class="empty-title">Galerie vide</div>
        <div class="empty-sub">
          Ajoute des photos nommées <code>maillot1.jpg</code> à <code>maillot50.jpg</code> dans le répertoire <code>${cibleDossier}</code> pour les faire apparaître ici.
        </div>
      </div>`;
    return;
  }

  // ── Mode collection : gérer les deux types d'affichage ──
  if (mode === 'collection') {
    const itemsExtraits = valides.map(v => v.item);
    window.validCollectionItems = itemsExtraits;

    const fsContainer = document.getElementById('fullscreen-collection');
    if (état.modeAffichage === 'fullscreen') {
      grille.classList.add('hidden');
      if (fsContainer) {
        fsContainer.classList.remove('hidden');
        afficherFullscreen(itemsExtraits);
      }
      return;
    } else {
      grille.classList.remove('hidden');
      if (fsContainer) fsContainer.classList.add('hidden');
    }

    // Classer chaque maillot dans sa catégorie
    const groupes = CATEGORIES_LIGUES.map(cat => ({ cat, items: [] }));
    const déjàClassé = new Set();

    for (const cat of CATEGORIES_LIGUES) {
      for (const v of valides) {
        if (!déjàClassé.has(v.item.id) && cat.match(v.item.ligue || '')) {
          groupes.find(g => g.cat.id === cat.id).items.push(v.item);
          déjàClassé.add(v.item.id);
        }
      }
    }

    // Générer le HTML groupé
    let html = '';
    for (const g of groupes) {
      if (g.items.length === 0) continue;
      html += htmlCategorieHeader(g.cat, g.items.length);
      html += g.items.map(item => htmlCarte(item, mode)).join('');
      html += `</div></div>`; // Ferme jersey-grid + league-category
    }
    grille.innerHTML = html;

  } else {
    // Mode wishlist : affichage plat standard
    grille.innerHTML = `<div class="jersey-grid">` + valides.map(v => htmlCarte(v.item, mode)).join('') + `</div>`;
  }
  
  // Associer les événements d'easter egg sur les badges ID
  grille.querySelectorAll('[data-egg="badge"]').forEach(badgeEl => {
    badgeEl.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = e.target.closest('.jersey-card');
      if (card) {
        card.classList.add('hologram-active');
        setTimeout(() => {
          card.classList.remove('hologram-active');
        }, 3000);
      }
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   CHARGEMENT DE LA SECTION JOUEURS
══════════════════════════════════════════════════════════════ */

async function photoJoueur(joueur) {
  const src = `assets/joueurs/${joueur.photo}`;
  const existe = await imageDisponible(src);

  if (existe) {
    return `<img class="player-avatar" src="${src}" alt="${joueur.nom}" loading="lazy" />`;
  }

  const initiales = joueur.nom
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return `<div class="player-avatar-fallback">${initiales}</div>`;
}

async function afficherJoueurs(gridId) {
  const grille = document.getElementById(gridId);
  if (!grille) return;

  grille.innerHTML = `
    <div class="loading-state" style="grid-column: 1/-1;">
      <div class="spinner"></div>
      Chargement de l'effectif…
    </div>`;

  if (!Array.isArray(JOUEURS) || JOUEURS.length === 0) {
    grille.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <div class="empty-ico">👥</div>
        <div class="empty-title">Aucun joueur renseigné</div>
        <div class="empty-sub">Configurez le tableau des joueurs favoris dans votre fichier de données.</div>
      </div>`;
    return;
  }

  const cartes = await Promise.all(
    JOUEURS.map(async j => {
      const photoEl = await photoJoueur(j);
      const tags = [
        j.poste  ? `<span class="ptag ptag-poste">${j.poste}</span>` : '',
        j.club   ? `<span class="ptag ptag-club">${j.club}</span>` : '',
        j.nationalite ? `<span class="ptag ptag-nation">${j.nationalite}</span>` : '',
      ].join('');

      const palmares = (j.palmares || [])
        .map(p => `<li class="palmares-item">${p}</li>`)
        .join('');

      return `
<article class="player-card" id="joueur-${j.id}" role="listitem">
  ${photoEl}
  <div class="player-body">
    <div class="player-name">${j.nom}</div>
    <div class="player-tags">${tags}</div>
    ${j.description ? `<p class="player-desc">${j.description}</p>` : ''}
    ${palmares ? `<ul class="player-palmares">${palmares}</ul>` : ''}
  </div>
</article>`;
    })
  );

  grille.innerHTML = cartes.join('');

  // Associer les événements d'easter egg (Spin 3D lors du clic sur l'avatar)
  grille.querySelectorAll('.player-card').forEach(card => {
    const avatar = card.querySelector('.player-avatar, .player-avatar-fallback');
    if (avatar) {
      avatar.addEventListener('click', () => {
        card.classList.add('spin-active');
        setTimeout(() => {
          card.classList.remove('spin-active');
        }, 800);
      });
    }
    
    // Double clic sur la carte complète pour effet de bascule complet
    card.addEventListener('dblclick', () => {
      card.classList.add('spin-active');
      setTimeout(() => {
        card.classList.remove('spin-active');
      }, 800);
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   NAVIGATION & ONGLETS
══════════════════════════════════════════════════════════════ */

function changerOnglet(nom) {
  if (état.onglet === nom) return;
  état.onglet = nom;

  // Mise à jour esthétique des boutons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    const actif = btn.dataset.tab === nom;
    btn.classList.toggle('active', actif);
    btn.setAttribute('aria-selected', actif ? 'true' : 'false');
  });

  // Bascule des zones de contenu
  document.querySelectorAll('.section').forEach(sec => {
    sec.classList.toggle('active', sec.id === `section-${nom}`);
  });

  // Rendu différé (Lazy-loading) pour optimiser les performances
  if (nom === 'wishlist' && !état.renduWishlist) {
    état.renduWishlist = true;
    afficherGrille(WISHLIST, 'wishlist', 'grille-wishlist', 'badge-wishlist', 'meta-wishlist');
  }

  if (nom === 'joueurs' && !état.renduJoueurs) {
    état.renduJoueurs = true;
    afficherJoueurs('grille-joueurs');
  }
}

function majStatsGlobales() {
  const elTotal = document.getElementById('nav-total');
  if (elTotal) elTotal.textContent = état.nbCollection;
  const elWishlist = document.getElementById('nav-wishlist');
  if (elWishlist) elWishlist.textContent = état.nbWishlist;
}

/* ══════════════════════════════════════════════════════════════
   MODULE DE PERSONNALISATION INTERACTIVE
══════════════════════════════════════════════════════════════ */

const Customizer = {
  accentColor: '#c9a84c',
  bgTheme: {
    bg: '#0d0d0f',
    surf: '#131318',
    surf2: '#1a1a22'
  },
  animations: true,
  glassEffect: true,

  initialiser() {
    this.chargerDepuisStockage();
    this.appliquerVariablesCSS();
    this.configurerUI();
    this.lierEvenements();
  },

  chargerDepuisStockage() {
    const accent = localStorage.getItem('kv-accent-color');
    if (accent) this.accentColor = accent;

    const bg = localStorage.getItem('kv-bg-color');
    const surf = localStorage.getItem('kv-surf-color');
    const surf2 = localStorage.getItem('kv-surf2-color');
    if (bg && surf && surf2) {
      this.bgTheme = { bg, surf, surf2 };
    }

    const anims = localStorage.getItem('kv-animations');
    if (anims !== null) this.animations = anims === 'true';

    const glass = localStorage.getItem('kv-glass');
    if (glass !== null) this.glassEffect = glass === 'true';

    const mode = localStorage.getItem('kv-mode-affichage');
    if (mode) état.modeAffichage = mode;
  },

  appliquerVariablesCSS() {
    const root = document.documentElement;
    
    // Couleur d'accent
    root.style.setProperty('--clr-gold', this.accentColor);
    root.style.setProperty('--clr-gold-light', this.eclaircirColor(this.accentColor, 15));
    root.style.setProperty('--clr-gold-dim', this.ajouterOpacite(this.accentColor, 0.12));

    // Couleurs de fond
    root.style.setProperty('--clr-bg', this.bgTheme.bg);
    root.style.setProperty('--clr-surface', this.bgTheme.surf);
    root.style.setProperty('--clr-surface-2', this.bgTheme.surf2);

    // Toggles d'effets globaux
    document.body.classList.toggle('no-transitions', !this.animations);
    document.body.classList.toggle('no-glass', !this.glassEffect);
  },

  configurerUI() {
    // Bouton de sélection d'accent libre
    const picker = document.getElementById('accent-color-picker');
    if (picker) picker.value = this.accentColor;

    // Presets d'accent actifs
    document.querySelectorAll('.color-preset').forEach(btn => {
      const active = btn.dataset.color.toLowerCase() === this.accentColor.toLowerCase();
      btn.classList.toggle('active', active);
    });

    // Presets de thèmes actifs
    document.querySelectorAll('.theme-preset').forEach(btn => {
      const active = btn.dataset.bg.toLowerCase() === this.bgTheme.bg.toLowerCase();
      btn.classList.toggle('active', active);
    });

    // Boutons bascules
    const animToggle = document.getElementById('animations-toggle');
    if (animToggle) animToggle.checked = this.animations;

    const glassToggle = document.getElementById('glass-toggle');
    if (glassToggle) glassToggle.checked = this.glassEffect;

    // Presets de vue actifs
    document.querySelectorAll('.view-preset').forEach(btn => {
      const active = btn.dataset.view === état.modeAffichage;
      btn.classList.toggle('active', active);
    });
  },

  lierEvenements() {
    // Ouverture / Fermeture du panneau
    const panel = document.getElementById('customizer-panel');
    const openBtn = document.getElementById('open-customizer-btn');
    const closeBtn = document.getElementById('close-customizer');

    if (openBtn && panel) {
      openBtn.addEventListener('click', () => panel.classList.add('open'));
    }
    if (closeBtn && panel) {
      closeBtn.addEventListener('click', () => panel.classList.remove('open'));
    }

    // Clic en dehors pour fermer
    document.addEventListener('click', (e) => {
      if (panel && panel.classList.contains('open') && 
          !panel.contains(e.target) && 
          (!openBtn || !openBtn.contains(e.target))) {
        panel.classList.remove('open');
      }
    });

    // Boutons de changement de vue
    document.querySelectorAll('.view-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        état.modeAffichage = btn.dataset.view;
        localStorage.setItem('kv-mode-affichage', état.modeAffichage);
        this.configurerUI();
        // Rafraîchir l'affichage de la collection
        afficherGrille(COLLECTION, 'collection', 'grille-collection', 'badge-collection', 'meta-collection');
      });
    });

    // Couleur d'accent par presets
    document.querySelectorAll('.color-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        this.accentColor = btn.dataset.color;
        localStorage.setItem('kv-accent-color', this.accentColor);
        this.appliquerVariablesCSS();
        this.configurerUI();
      });
    });

    // Couleur d'accent personnalisée
    const picker = document.getElementById('accent-color-picker');
    if (picker) {
      picker.addEventListener('input', (e) => {
        this.accentColor = e.target.value;
        localStorage.setItem('kv-accent-color', this.accentColor);
        this.appliquerVariablesCSS();
        this.configurerUI();
      });
    }

    // Thème de fond par presets
    document.querySelectorAll('.theme-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        this.bgTheme = {
          bg: btn.dataset.bg,
          surf: btn.dataset.surf,
          surf2: btn.dataset.surf2
        };
        localStorage.setItem('kv-bg-color', this.bgTheme.bg);
        localStorage.setItem('kv-surf-color', this.bgTheme.surf);
        localStorage.setItem('kv-surf2-color', this.bgTheme.surf2);
        this.appliquerVariablesCSS();
        this.configurerUI();
      });
    });

    // Bascules d'effets
    const animToggle = document.getElementById('animations-toggle');
    if (animToggle) {
      animToggle.addEventListener('change', (e) => {
        this.animations = e.target.checked;
        localStorage.setItem('kv-animations', this.animations);
        this.appliquerVariablesCSS();
      });
    }

    const glassToggle = document.getElementById('glass-toggle');
    if (glassToggle) {
      glassToggle.addEventListener('change', (e) => {
        this.glassEffect = e.target.checked;
        localStorage.setItem('kv-glass', this.glassEffect);
        this.appliquerVariablesCSS();
      });
    }

    // Bouton de réinitialisation
    const resetBtn = document.getElementById('reset-customizer');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        localStorage.removeItem('kv-accent-color');
        localStorage.removeItem('kv-bg-color');
        localStorage.removeItem('kv-surf-color');
        localStorage.removeItem('kv-surf2-color');
        localStorage.removeItem('kv-animations');
        localStorage.removeItem('kv-glass');
        localStorage.removeItem('kv-mode-affichage');

        this.accentColor = '#c9a84c';
        this.bgTheme = { bg: '#0d0d0f', surf: '#131318', surf2: '#1a1a22' };
        this.animations = true;
        this.glassEffect = true;
        état.modeAffichage = 'normal';
        état.indexFullscreen = 0;

        this.appliquerVariablesCSS();
        this.configurerUI();
        // Rafraîchir l'affichage de la collection
        afficherGrille(COLLECTION, 'collection', 'grille-collection', 'badge-collection', 'meta-collection');
      });
    }
  },

  // Fonctions de manipulation de couleurs (pure JS)
  ajouterOpacite(hex, opacity) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  },

  eclaircirColor(hex, percent) {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
    g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
    b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));

    const rHex = r.toString(16).padStart(2, '0');
    const gHex = g.toString(16).padStart(2, '0');
    const bHex = b.toString(16).padStart(2, '0');

    return `#${rHex}${gHex}${bHex}`;
  }
};

/* ══════════════════════════════════════════════════════════════
   EASTER EGGS ANIMÉS
══════════════════════════════════════════════════════════════ */

const EasterEggs = {
  confettisActifs: false,
  particules: [],
  canvas: null,
  ctx: null,
  animationId: null,

  initialiser() {
    this.canvas = document.getElementById('easteregg-canvas');
    if (this.canvas) this.ctx = this.canvas.getContext('2d');

    this.lierBrand();
    window.addEventListener('resize', () => this.redimensionnerCanvas());
  },

  redimensionnerCanvas() {
    if (this.canvas) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  },

  lierBrand() {
    const brandLogo = document.getElementById('brand-logo-trigger');
    if (!brandLogo) return;

    // Double-clic sur le logo -> Jet de confettis instantané
    brandLogo.addEventListener('dblclick', (e) => {
      e.preventDefault();
      this.declencherConfettis();
    });

    // 5 clics rapides sur le logo -> Surcharge néon temporaire (Mode Overdrive)
    brandLogo.addEventListener('click', (e) => {
      e.preventDefault();
      const maintenant = Date.now();
      if (maintenant - état.tempsDernierClic < 550) {
        état.clicsLogo++;
      } else {
        état.clicsLogo = 1;
      }
      état.tempsDernierClic = maintenant;

      if (état.clicsLogo >= 5) {
        this.declencherOverdrive();
        état.clicsLogo = 0;
      }
    });
  },

  declencherConfettis() {
    this.redimensionnerCanvas();
    if (!this.confettisActifs) {
      this.confettisActifs = true;
      this.creerParticules();
      this.animerParticules();
      
      // Stop automatique de l'animation après 4.5 secondes
      setTimeout(() => {
        this.confettisActifs = false;
        cancelAnimationFrame(this.animationId);
        if (this.ctx && this.canvas) {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        this.particules = [];
      }, 4500);
    } else {
      // Si déjà actif, ajouter de nouvelles vagues de particules
      this.creerParticules();
    }
  },

  creerParticules() {
    const couleurs = ['#c9a84c', '#e8c97a', '#3b82f6', '#ffffff', '#ec4899', '#a855f7'];
    const quantite = 110;
    
    for (let i = 0; i < quantite; i++) {
      this.particules.push({
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 50,
        y: 60, // Niveau du logo
        vitesseX: (Math.random() - 0.5) * 12,
        vitesseY: (Math.random() * 6) + 4,
        taille: (Math.random() * 7) + 4,
        couleur: couleurs[Math.floor(Math.random() * couleurs.length)],
        rotation: Math.random() * 360,
        vitesseRotation: (Math.random() - 0.5) * 6,
        gravite: 0.15,
        friction: 0.985
      });
    }
  },

  animerParticules() {
    if (!this.confettisActifs) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particules.length - 1; i >= 0; i--) {
      const p = this.particules[i];

      // Mise à jour de la trajectoire
      p.vitesseX *= p.friction;
      p.vitesseY += p.gravite;
      p.x += p.vitesseX;
      p.y += p.vitesseY;
      p.rotation += p.vitesseRotation;

      // Dessin de la particule
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation * Math.PI / 180);
      this.ctx.fillStyle = p.couleur;
      this.ctx.fillRect(-p.taille / 2, -p.taille / 2, p.taille, p.taille);
      this.ctx.restore();

      // Nettoyer les particules hors-champ
      if (p.y > window.innerHeight) {
        this.particules.splice(i, 1);
      }
    }

    this.animationId = requestAnimationFrame(() => this.animerParticules());
  },

  declencherOverdrive() {
    // Notification visuelle
    const logo = document.querySelector('.brand-logo');
    const header = document.querySelector('.navbar');
    const cards = document.querySelectorAll('.jersey-card, .player-card');

    if (logo) logo.classList.add('overdrive-pulse');
    if (header) header.classList.add('overdrive-pulse');
    cards.forEach(c => c.classList.add('overdrive-card'));

    // Déclencher également un jet de confettis pour couronner le tout
    this.declencherConfettis();

    setTimeout(() => {
      if (logo) logo.classList.remove('overdrive-pulse');
      if (header) header.classList.remove('overdrive-pulse');
      document.querySelectorAll('.jersey-card, .player-card').forEach(c => {
        c.classList.remove('overdrive-card');
      });
    }, 6000);
  }
};

/* ══════════════════════════════════════════════════════════════
   INITIALISATION GLOBALE
══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // Bind de la barre d'onglets
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => changerOnglet(btn.dataset.tab));
  });

  // Charger les modules additionnels
  Customizer.initialiser();
  EasterEggs.initialiser();

  // Chargement premier écran (Ma Collection en premier plan)
  afficherGrille(COLLECTION, 'collection', 'grille-collection', 'badge-collection', 'meta-collection');
});
