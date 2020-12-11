# 🐬 DEKA COLLECTION

also known as _Hall of Shame_

## ⚙ Development

- Prerequisites
  - node
  - [wrangler](https://developers.cloudflare.com/workers/cli-wrangler/install-update)

### API

```
cd api
wrangler dev
```

### View

```
cd view
npm install
npm run dev
```

## 🚀 Deployment

### API

```
cd api
wrangler publish -e production
```

### View

```
cd view
npm run build
cd ../site
wrangler publish -e production
```

## Maintainers

- [@deka0106](https://github.com/deka0106)
- [@sekai67](https://github.com/sekai67)
