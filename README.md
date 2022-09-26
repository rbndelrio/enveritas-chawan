# `chawan`  🍵
A *[chawan](https://en.wikipedia.org/wiki/Chawan)* is a bowl used for preparing tea in traditional East Asian tea ceremonies. In Japan, it's used as the container for the mixing and sharing of matcha. It's like a *jebena* with a simpler physical form and an entirely different use case, yet they both play an equally important role in their respective caffeine rituals.

<details>
<summary>Rationale / Planning</summary>

## Approach

To my understanding, Jebena serves as the base for this sequence of user experiences:

1. Spec writing for surveys
2. Survey authoring based on those specs (and assigning evaluation metrics to them)
3. Deploying completed surveys
4. Ingesting the results
5. Reviewing & correcting the data

My goal in this little repo is to build a prototype that can perform a subset of #2 in a way that theoretically meshes with the existing app.

## Inspo

In the Vue world, I'm a huge fan of [FormKit](https://formkit.com/). It's a pretty comprehensive form builder library with the ability to specify schemas in pure JSON.

Advanced Custom Fields is a WordPress plugin/library that enables users to add more inputs and database fields on top of WP' provided Post+Taxonomy schema. More notably, the UI for creating these fields is pretty nice.

## UX
I'm thinking a split pane UI? Field management on the left, realtime form preview on the right.

</details>

## Setup

This was built with Node v18 (though probably works down to v14) and pnpm.

`pnpm install && pnpm build`

## Tech Stack
I like to keep my code relatively portable and platform-agnostic to mitigate vendor lock-in, and my choice of dependencies is a reflection of that.

* **Runtime:** React
* **Language:** TS/TSX
* **CSS:** PostCSS + Tailwind
* **Builder:** Vite
* **UI Library:** Headless UI
* **Form handling:** `react-hook-form`
* **Hooks:** ??? maybe `react-use`
* **Schema Validation:** Zod
* **Monorepo:** none/`pnpm` workspaces

While I'm technically more experienced in Vue than React, I'm going with the latter as both a personal exercise and so you guys can evaluate it better.

## Architecture + Features

Project will be broken into three parts:

### `@chawan/builder`
The app you guys actually asked for

### `@chawan/forms`
Data model + form validator
* `createSchema`

### `@chawan/react`
React hooks + components
* `<Chawan>`
* `<ChawanContext>`
* `<ChawanBuilder`
* `<ChawanForm>`
* `<ChawanWrapper`
* `<ChawanInput>`
* `useSchema()`