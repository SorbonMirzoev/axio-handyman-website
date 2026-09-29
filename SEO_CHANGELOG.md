# AXIO SEO Changelog

## 2026-09-29 — Baseline
Connected sources available during the audit:
- Google Search Console
- Google Business Profile
- GitHub / live deployment workflow
- GA4 installed through GTM and verified in Realtime
- Semrush connection present, but API units unavailable for report execution

### Search Console baseline (last 28 days at audit time)
- Homepage: 54 impressions
- Homepage: 13 clicks
- CTR: 24.07%
- Average position: 6.0
- Sitemap submitted URLs before expansion: 3
- Sitemap errors: 0
- Sitemap warnings: 0

Observed query examples:
- handyman — avg position 4.8 across 5 impressions
- handyman carmichael — avg position 30
- handyman near me — avg position 2
- handyman services near me — avg position 3.5
- tile repair near me — avg position 7

### Google Business Profile baseline
Period reviewed: 2026-09-15 through 2026-09-26
- 43 impressions
- 3 call clicks
- 3 website clicks
- 13 direction requests
- 14 reviews
- 5.0 total average rating

## 2026-09-29 — Technical / On-page SEO
Commit: 784daa63e1e8c50bf8df29922be7e818895c6941

Implemented:
- Improved homepage title and meta description
- Improved Pricing and Contact titles/descriptions
- Added Open Graph / social metadata
- Added HomeAndConstructionBusiness structured data
- Replaced unfinished service-area placeholder copy
- Added factual Sacramento-area city coverage
- Added lazy-loading / async decoding to below-the-fold images
- Added visible phone number in site footer
- Added conversion dataLayer hooks:
  - click_phone
  - click_email
  - estimate_click
  - service_quote_click
  - form_submit_attempt
  - generate_lead
- Added form-type markers to estimate/contact forms
- Marked thank-you page as the successful lead page

## 2026-09-29 — Local Service Architecture
Commit: e01150daf30df0d857d5a52d99ccffff7efec180

Created:
- /tv-mounting-sacramento/
- /furniture-assembly-sacramento/
- /drywall-repair-sacramento/
- /door-repair-sacramento/
- /flooring-repair-sacramento/
- /painting-handyman-sacramento/
- /handyman-carmichael/

Each page includes:
- Unique title/meta
- Unique H1/content
- Pricing context based on existing published AXIO pricing
- Local service-area content
- Internal links
- Visible phone + free-estimate CTA
- Service structured data
- Breadcrumb structured data
- Visible FAQ + FAQ structured data

Also:
- Updated homepage service-card internal links
- Expanded sitemap from 3 URLs to 10 URLs
- Added lastmod values
- Added /projects/ portfolio structure, noindexed until real documented projects are published
- Added reusable CSS for service/FAQ/related-service page layouts

## Next measurement checkpoints
- 7 days: check indexing and early impressions for new pages
- 14 days: compare query/page impressions and positions
- 28 days: compare clicks, calls, estimate events and generated leads
