# One Node image for both stages. CI reads its version from here, so a Dependabot update of it is
# checked on the new Node (infra/DEPLOY.md#dependabot).
FROM node:22.23.4-bookworm-slim AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
ARG SITE_URL=https://garbar.tech
ARG INDEX_SITE=true
ENV SITE_URL=${SITE_URL} INDEX_SITE=${INDEX_SITE} HOSTING_PROVIDER=google-cloud-run
RUN npm run build

FROM node:22.23.4-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=8080
COPY --from=build --chown=node:node /app/out ./out
COPY --from=build --chown=node:node /app/scripts/serve.mjs ./scripts/serve.mjs
USER node
EXPOSE 8080
CMD ["node", "scripts/serve.mjs"]
