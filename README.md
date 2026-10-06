# Portfolio — Luis Fernandes

Portfolio d'ingénieur logiciel systèmes & embarqué (Systems & Embedded Software Engineer), publié sur `luisfernandes.tech` (via GitHub Pages).

## Architecture du Portfolio

- `index.html` : Structure sémantique épurée, orientée ingénierie systèmes & embarqué.
- `styles.css` : Design sombre minimaliste, inspiré de l'outillage technique, 100% responsive, sans dépendance externe.
- `main.js` : Moteur de filtrage et recherche instantanée pour le répertoire de projets (Project Directory) + interactions légères.
- `assets/resume_newspace.pdf` : CV ciblé aérospatiale / systèmes embarqués.
- `CNAME` : Domaine personnalisé (`luisfernandes.tech`).

## Sections Principales

1. **01 / Technical Competencies** : Piliers fondamentaux (Systèmes embarqués & FPGA, Linux & introspection binaire ELF, pipelines de télémétrie RF, simulation numérique N-corps & relativiste).
2. **02 / Featured Projects** : Études de cas complètes avec architecture technique détaillée :
   - *LBR Telemetry Receiver* (Long Beach Rocketry — acquisition RF, démodulation, tramage, CRC-32).
   - *Backlight* (Simulateur cosmologique N-corps en pur C, 1000 corps à 30+ FPS, précision étendue).
   - *Relativistic Raytracer* (Raytracing relativiste en C++20, géodésiques d'espace-temps courbé, trous noirs).
   - *Unix Diagnostic Toolchain* (Reconstruction `strace`, `nm`, `objdump`, `ftrace` en C avec `ptrace` et spécification ELF64).
   - *Tekspice* (Simulateur de circuits logiques numériques en C++20 avec graphe orienté).
3. **03 / Engineering Project Directory** : Répertoire interactif de 28 projets logiciels vérifiés avec barre de recherche temps réel (titre, module, langage, mot-clé) et filtres par catégorie.
4. **04 / Trajectory & Education** : Parcours académique (CSULB & Epitech Tek5) et stages professionnels (X'PROCHEM, Monstock, Indium Solutions).
5. **05 / Direct Access** : Coordonnées réelles (`luis.fernandes@epitech.eu`, LinkedIn officiel, GitHub, démos YouTube, CV PDF).

## Test en local

```bash
python3 -m http.server 8080
# Ouvrir http://localhost:8080
```
