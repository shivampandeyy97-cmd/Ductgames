# Google Search Console — Complete Setup & URL Removal Guide

## ⚠️ URGENT: Remove Broken URLs from Google Index

### Step 1: Verify Site in Google Search Console
1. Go to [https://search.google.com/search-console](https://search.google.com/search-console)
2. Click **"Add property"** → choose **"URL prefix"** → enter `https://ductgames.com/` → Continue
3. Choose **"HTML tag"** verification method
4. Copy the meta tag (looks like `<meta name="google-site-verification" content="abc123...">`)
5. Open `/Users/shivampandey/Downloads/Ductgames/index.html`
6. Find: `<meta name="google-site-verification" content="PASTE_YOUR_VERIFICATION_CODE_HERE" />`
7. Replace `PASTE_YOUR_VERIFICATION_CODE_HERE` with your actual code
8. Push to GitHub (wait ~2 mins for deploy)
9. Click **"Verify"** in Search Console

---

## 🗑️ Remove Broken URLs from Google (Priority!)

After verifying, do this for **both** broken URLs:

### URL 1: `https://ductgames.com/new-games`
### URL 2: `https://ductgames.com/game/cool-math-games-for-kids`

**Steps:**
1. In Search Console left sidebar → **"Removals"** (under Index)
2. Click **"New Request"**
3. Enter the full URL (e.g. `https://ductgames.com/new-games`)
4. Select **"Remove this URL only"**
5. Click **"Next"** → **"Submit Request"**
6. Repeat for the second URL

> ℹ️ **Note:** The redirect pages + `noindex` meta tags + `robots.txt` blocks have already been deployed. Google will stop crawling these URLs within 1–2 weeks. The URL removal tool accelerates this to within 24–48 hours.

---

## 📊 Submit Sitemap
1. In Search Console → **"Sitemaps"** (left sidebar)
2. Enter: `https://ductgames.com/sitemap.xml`
3. Click **"Submit"**

---

## 🔍 Request Indexing for New Pages
After submitting the sitemap, also request indexing for key pages:
1. In Search Console → **"URL Inspection"**
2. Enter: `https://ductgames.com/`
3. Click **"Request Indexing"**
4. Repeat for each canonical game and blog URL:
   - `https://ductgames.com/games/snake/`
   - `https://ductgames.com/games/tictactoe/`
   - `https://ductgames.com/games/memory/`
   - `https://ductgames.com/games/2048/`
   - `https://ductgames.com/blog/`

---

## 📈 SEMrush Keyword Setup
1. Sign up at [https://www.semrush.com](https://www.semrush.com) (free tier available)
2. Go to **"Domain Overview"** → enter `ductgames.com`
3. Use **"Keyword Magic Tool"** → search `free HTML5 games`
4. Filter by: Difficulty < 50, Volume > 500
5. Top keywords to target:
   - `free html5 games` (high volume, medium difficulty)
   - `play snake game online` 
   - `tic tac toe online`
   - `2048 game online free`
   - `memory match game`
   - `free browser games no download`

---

## 📊 Bing Webmaster Tools (Bonus — powers DuckDuckGo too)
1. Go to [https://www.bing.com/webmasters](https://www.bing.com/webmasters)
2. Sign in with Microsoft account
3. Click **"Import from Google Search Console"** (fastest method)
4. Submit sitemap: `https://ductgames.com/sitemap.xml`

---

## 🎯 Keywords Already in Your Site

| Keyword | Where Used |
|---------|------------|
| free online games | meta keywords, h2, body |
| HTML5 games | title, meta, body |
| browser games no download | meta, body |
| snake game online | JSON-LD, body |
| tic tac toe online | JSON-LD, body |
| 2048 game | JSON-LD, body |
| memory match game | JSON-LD, body |
| games like Poki | meta keywords |
| unblocked games | meta keywords |
| free casual games | meta keywords |
| kids games online free | meta keywords |
| best free browser games | meta keywords |
