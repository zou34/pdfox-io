# PDFOX.io - Avec API securisee Vercel

## Ce qui a change

L'IA fonctionne maintenant via une fonction serverless Vercel (`api/chat.js`).
La cle Groq est stockee dans Vercel Environment Variables - JAMAIS dans le code.
Cela evite le blocage GitHub "repository rule violations".

## Installation locale

```bash
npm install -g vercel
cd pdfox-final2
vercel dev
```

Cela lance un serveur local QUI SUPPORTE les fonctions API (contrairement a Live Server).

## Deploiement

### 1. Pousser sur GitHub
```bash
git init
git add .
git commit -m "PDFOX.io avec API securisee"
git remote add origin https://github.com/zou34/pdfox-io.git
git push -u origin main
```

### 2. Configurer Vercel
1. Va sur vercel.com -> ton projet pdfox-io
2. Settings -> Environment Variables
3. Ajoute :
   - Key: GROQ_KEY
   - Value: ta-cle-groq-ici
   - Environments: Production, Preview, Development
4. Save
5. Deployments -> Redeploy

### 3. Tester
Va sur https://pdfox-io.vercel.app/pages/ai-summarizer.html
Upload un PDF -> Analyser avec l'IA -> ca doit fonctionner !

## Structure

```
pdfox-final2/
├── api/
│   └── chat.js          <- Fonction serverless (cle securisee ici)
├── css/
│   └── style.css
├── js/
│   ├── ai.js             <- Appelle /api/chat
│   ├── main.js
│   └── tools.js
├── pages/
│   ├── ai-summarizer.html
│   ├── ai-chat.html
│   ├── ai-rewrite.html
│   ├── ai-metadata.html
│   ├── tool.html
│   ├── blog.html
│   ├── article.html
│   ├── about.html
│   ├── contact.html
│   ├── privacy.html
│   └── terms.html
├── index.html
├── vercel.json
└── .gitignore
```

## Pourquoi ca marche maintenant

AVANT : window.GROQ_KEY etait dans js/config.js (jamais commite, donc absent sur Vercel)
APRES : la cle est dans process.env.GROQ_KEY (Vercel Environment Variables, jamais dans le code)

Le navigateur appelle /api/chat -> Vercel execute api/chat.js sur son serveur ->
ce serveur a acces a process.env.GROQ_KEY -> appelle Groq -> renvoie la reponse.

La cle ne touche jamais le code source, donc GitHub ne la bloque plus.
