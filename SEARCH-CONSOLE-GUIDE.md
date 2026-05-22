# Google Search Console & SEMrush — Connection Guide

## Step 1: Google Search Console

### Add Your Property
1. Go to [https://search.google.com/search-console](https://search.google.com/search-console)
2. Click **"Add property"** → choose **"Domain"** → type `ductgames.com` → Continue
3. They will show you an HTML tag like:
   ```html
   <meta name="google-site-verification" content="abc123XYZ..." />
   ```
4. Open `/Users/shivampandey/Downloads/Ductgames/index.html`
5. Find this line:
   ```html
   <meta name="google-site-verification" content="PASTE_YOUR_VERIFICATION_CODE_HERE" />
   ```
6. Replace `PASTE_YOUR_VERIFICATION_CODE_HERE` with the code Google gave you
7. Save → push to GitHub → wait 1–2 minutes for the site to deploy
8. Back in Search Console, click **"Verify"**

### Submit Sitemap
After verifying:
1. In Search Console, go to **Sitemaps** (left sidebar)
2. Enter: `https://ductgames.com/sitemap.xml`
3. Click **Submit**

---

## Step 2: Google Trends
No code changes needed. Use Google Trends to research keywords:
- Go to [https://trends.google.com](https://trends.google.com)
- Search: `HTML5 games`, `free browser games`, `play games online free`
- Use "Related queries" to find rising keywords to add to your content

---

## Step 3: SEMrush (Optional but Powerful)
1. Sign up at [https://www.semrush.com](https://www.semrush.com) (free tier available)
2. Go to **"Domain Overview"** → type `ductgames.com`
3. Use **"Keyword Magic Tool"** to find keywords like:
   - `free HTML5 games` — search volume, difficulty
   - `play games online no download`
   - `best browser games 2025`
4. Use **"On Page SEO Checker"** to get page-specific recommendations

---

## Step 4: Bing Webmaster Tools (Bonus)
Don't forget Bing — it powers DuckDuckGo too!
1. Go to [https://www.bing.com/webmasters](https://www.bing.com/webmasters)
2. Import from Google Search Console (1-click if GSC is connected)
3. Submit your sitemap: `https://ductgames.com/sitemap.xml`

---

## Keywords Already Added to Your Site
Your `index.html` now includes these keywords in meta tags + content:

| Keyword | Type |
|---------|------|
| free online games | Primary |
| HTML5 games | Primary |
| browser games | Primary |
| no download games | Long-tail |
| free games online | Primary |
| play games online free | Long-tail |
| HTML5 arcade games | Category |
| puzzle games online | Category |
| snake game online | Game-specific |
| 2048 game | Game-specific |
| memory match game | Game-specific |
| tic tac toe online | Game-specific |
| best free browser games | Comparison |
| games like Poki | Competitor |
| unblocked games | Long-tail |
| instant play games | Feature |
| kids games online free | Audience |
| free casual games | Category |
| online strategy games | Category |
| retro browser games | Niche |
