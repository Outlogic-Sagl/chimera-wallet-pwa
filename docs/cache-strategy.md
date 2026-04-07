# Cache Control Configuration for PWA

This document explains the caching strategy for the Chimera Wallet PWA.

## Service Worker Cache Versioning

The service worker now uses build-time cache versioning to ensure users always get the latest version:

- **Cache Name**: `arkade-cache-${BUILD_TIME}` where BUILD_TIME is generated at build time
- **Auto Cleanup**: Old caches are automatically deleted when a new service worker activates
- **Force Reload**: Clients are notified to reload when the service worker updates

## HTTP Cache Headers (Server Configuration)

To ensure proper cache invalidation, configure your web server with these headers:

### HTML Files (index.html)
```
Cache-Control: no-cache, no-store, must-revalidate
Pragma: no-cache
Expires: 0
```

### JavaScript & CSS Files (with content hash in filename)
```
Cache-Control: public, max-age=31536000, immutable
```

### Service Worker File (wallet-service-worker.mjs)
```
Cache-Control: no-cache, no-store, must-revalidate
Service-Worker-Allowed: /
```

### Manifest & Other Assets
```
Cache-Control: public, max-age=86400
```

## Netlify Configuration Example

If deploying to Netlify, add this to your `netlify.toml`:

```toml
[[headers]]
  for = "/"
  [headers.values]
    Cache-Control = "no-cache, no-store, must-revalidate"

[[headers]]
  for = "/index.html"
  [headers.values]
    Cache-Control = "no-cache, no-store, must-revalidate"

[[headers]]
  for = "/wallet-service-worker.mjs"
  [headers.values]
    Cache-Control = "no-cache, no-store, must-revalidate"
    Service-Worker-Allowed = "/"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/manifest.json"
  [headers.values]
    Cache-Control = "public, max-age=86400"
```

## Vercel Configuration Example

If deploying to Vercel, add this to your `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/wallet-service-worker.mjs",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        },
        {
          "key": "Service-Worker-Allowed",
          "value": "/"
        }
      ]
    }
  ]
}
```

## Cloudflare Pages Configuration

Add `_headers` file to your `public` directory:

```
/
  Cache-Control: no-cache, no-store, must-revalidate

/index.html
  Cache-Control: no-cache, no-store, must-revalidate

/wallet-service-worker.mjs
  Cache-Control: no-cache, no-store, must-revalidate
  Service-Worker-Allowed: /

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable
```

## Testing Cache Invalidation

After deploying a new version:

1. Open DevTools → Application → Service Workers
2. Check "Update on reload" 
3. Refresh the page
4. Verify the new service worker is activated
5. Check Application → Cache Storage - only the latest cache should be present

## Forcing Updates for Users

The app now automatically:
- Checks for service worker updates every 60 minutes
- Activates new service workers immediately on page load
- Clears old caches automatically
- Notifies clients to reload when updates are available

## Manual Cache Clear (for testing)

Users can manually clear all caches by:
1. Opening DevTools (F12)
2. Going to Application → Storage
3. Clicking "Clear site data"
4. Refreshing the page
