# Base portfolio pro (GitHub Pages)

Site statique prêt à publier sur `luis-fernandes.github.io` avec un domaine externe.

## Structure

- `index.html` : contenu principal du portfolio
- `styles.css` : design responsive
- `script.js` : animations légères + année automatique
- `.nojekyll` : évite le traitement Jekyll sur GitHub Pages
- `CNAME.example` : exemple de domaine personnalisé

## Déploiement GitHub

1. Commit et push sur la branche principale:
   ```bash
   git add .
   git commit -m "init: base portfolio pro"
   git push origin main
   ```
2. Repo `username.github.io`:
   GitHub Pages publie automatiquement depuis la racine de `main`.

## DNS externe (domaine personnalisé)

1. Choisis le domaine final (ex: `portfolio.ton-domaine.com`).
2. Crée un fichier `CNAME` (sans extension) à la racine avec une seule ligne:
   ```txt
   portfolio.ton-domaine.com
   ```
3. Dans ton DNS:
   - Si `www` ou sous-domaine: ajoute un `CNAME` vers `luis1454.github.io`.
   - Si domaine racine (`ton-domaine.com`): ajoute des `A` records vers les IP GitHub Pages.
4. Dans GitHub > Settings > Pages:
   - vérifie le champ `Custom domain`
   - active `Enforce HTTPS` quand le certificat est prêt.

Référence GitHub officielle:
https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site

## Personnalisation rapide

- Remplacer les textes, email et liens GitHub dans `index.html`.
- Remplacer les cartes projet par tes vrais cas clients.
- Ajouter tes liens sociaux (LinkedIn, X, etc.) dans le footer.
