# VisionsAlign Rebranding Strategy

## Overview

This document outlines the comprehensive strategy for rebranding the current template to VisionsAlign, an AI-powered executive communication platform. It provides a detailed roadmap for ensuring all references to the original brand are properly updated throughout the codebase.

## Identified Brand References

Based on the code review, the following brand references need to be updated:

### 1. Direct Brand Name References

- **FeNAgO** -> **VisionsAlign**
- **fenago** -> **visionsalign** (lowercase variations)
- **FENAGO** -> **VISIONSALIGN** (uppercase variations)

### 2. URLs and Domains

- **fenago.com** -> **visionsalign.com**
- **https://fenago.com/** -> **https://visionsalign.com/**
- **shipfast.beehiiv.com** -> **visionsalign.beehiiv.com** (update or remove)

### 3. Email Addresses

- **hello@fenago.com** -> **hello@visionsalign.com**
- **marc@fenago.com** -> **[appropriate email]@visionsalign.com**

## Rebranding Checklist

### Configuration Files

- [x] Update `config.ts` appName to "VisionsAlign" (completed)
- [ ] Update `config.ts` domainName to "fenago.com"
- [ ] Update `config.ts` email configurations
- [ ] Update `next-sitemap.config.js` siteUrl

### Visual Branding

- [ ] Replace favicon and app icons in `/public` and `/app`
- [ ] Update logo references in components
- [ ] Update color scheme if needed

### Components

- [ ] Update `Hero.tsx` with VisionsAlign branding (pending)
- [ ] Update `Header.tsx` navigation and branding
- [ ] Update `Footer.tsx` brand references and links
- [ ] Review and update all testimonial components
- [ ] Update any ProductHunt or external service references

### Legal Documents

- [ ] Update `app/tos/page.tsx` with VisionsAlign branding and contact information
- [ ] Update `app/privacy-policy/page.tsx` with VisionsAlign details

### Documentation

- [ ] Update `README.md` with VisionsAlign information
- [ ] Update any inline documentation or comments

### Blog Content

- [ ] Review and update blog posts in `app/blog/_assets/content.tsx`

### Email Templates

- [ ] Update email templates with VisionsAlign branding

## File-by-File Rebranding Guide

### High Priority Files

1. **config.ts**
   - Update appName, domainName, and email configuration
   - Review and update plan descriptions and features

2. **README.md**
   - Complete rewrite with VisionsAlign information
   - Update documentation links
   - Remove/replace ProductHunt badges

3. **app/layout.tsx** and **app/page.tsx**
   - Update metadata and SEO tags
   - Ensure correct branding in layout wrapper

4. **components/Hero.tsx** and **components/Header.tsx**
   - Complete rebranding of hero section messaging
   - Update navigation links and CTA buttons

5. **Legal Documents**
   - `app/tos/page.tsx`
   - `app/privacy-policy/page.tsx`

### Medium Priority Files

1. **components/Footer.tsx**
   - Update copyright information
   - Update social links and branding

2. **Email Templates and Configurations**
   - Update any hardcoded email templates
   - Update sender names and addresses

3. **Blog Content**
   - Review and update blog posts or sample content

4. **Dashboard Components**
   - Update any dashboard branding elements

### Lower Priority Files

1. **Testimonials and Social Proof**
   - Update or replace testimonial content
   - Replace social proof elements specific to ShipFast

2. **Tutorial and Documentation Links**
   - Update any tutorial references
   - Replace documentation URLs

## Search and Replace Strategy

Use targeted search and replace operations in the following order:

1. **Exact Brand Name Replacement**
   - Case-sensitive replacement of "ShipFast" with "FeNAgO"
   - Case-sensitive replacement of "shipfast" with "fenago"
   - Case-sensitive replacement of "SHIPFAST" with "FENAGO"

2. **Domain Replacement**
   - Replace "shipfa.st" with "fenago.com"
   - Update full URLs accordingly

3. **Email Replacement**
   - Replace all "@shipfa.st" email addresses

4. **Visual Asset Replacement**
   - Update image references and branding elements

## Code Example: Search and Replace Commands

```bash
# Find all instances of ShipFast in the codebase
grep -r "shipfa\.st" --include="*.{ts,tsx,js,jsx,md}" .

# Find all instances of shipfast in the codebase
grep -r "shipfast" --include="*.{ts,tsx,js,jsx,md}" .

# Example search and replace (Unix)
sed -i 's/ShipFast/FeNAgO/g' filename.tsx

# Example search and replace (PowerShell)
(Get-Content filename.tsx) -replace 'ShipFast', 'FeNAgO' | Set-Content filename.tsx
```

## Testing Rebranding Changes

After completing rebranding changes, perform the following tests:

1. **Visual Inspection**:
   - Check all pages for correct branding
   - Verify logos, colors, and themes are consistent

2. **Functional Testing**:
   - Test all links to ensure they point to correct URLs
   - Verify email functionality uses correct branding
   - Test authentication flows

3. **SEO and Metadata**:
   - Verify page titles and meta descriptions
   - Check Open Graph and Twitter card metadata

4. **Legal Compliance**:
   - Ensure ToS and Privacy Policy correctly reference VisionsAlign
   - Verify copyright notices and legal disclaimers

## Post-Rebranding Tasks

1. **Redirect Strategy**: If migrating from an existing ShipFast domain, implement appropriate redirects
2. **Search Engine Reindexing**: Submit new sitemap to search engines
3. **Documentation Update**: Ensure all development documentation reflects new branding
4. **Analytics Reconfiguration**: Update any analytics tools with new brand information
