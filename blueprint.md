# SettleSettle Documentation Site Blueprint & Build Specification

This document provides the complete structural blueprint and the raw markdown content for all pages of the **SettleSettle Developer Hub**. It is designed to be fed into an IDE, AI coding agent, or project generator to automatically rebuild the entire documentation site in any target project environment.

---

## 1. Build & Scaffolding Instructions for the IDE/Agent

To build the documentation site in a new project, follow these structural, styling, and architectural rules:

### A. Core Architecture Options

#### Option 1: Next.js App Router (Custom Markdown Rendering)
If building inside a custom Next.js application, structure the folder hierarchy as follows:
```text
your-project/
├── app/
│   └── docs/
│       ├── [[...slug]]/
│       │   └── page.tsx        # Dynamic route for rendering markdown pages
│       └── layout.tsx          # Docs layout with sticky sidebar navigation
├── components/
│   └── docs/
│       └── CodeBlock.tsx       # Syntax highlighted code renderer
├── lib/
│   └── docs-data.ts            # The content dictionary (copied from Section 3 of this document)
```

#### Option 2: Mintlify (Configuration-Based MDX)
If deploying via Mintlify:
1. Create a `mint.json` at the root using the navigation schema in Section 2.
2. Output each content block into individual `.mdx` files according to the folder structure outlined in `mint.json`.

---

### B. Global Style Sheet & Theme Tokens
Ensure the target application incorporates the following CSS tokens for a premium midnight aesthetic:

```css
:root {
  --background: #070B14;
  --foreground: #F3F4F6;
  --brand-emerald: #10B981;
  --brand-emerald-hover: #34D399;
  --border-color: #1F2937;
  --code-bg: #0F131E;
}

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: 'Inter', sans-serif;
}

/* Custom heading font mapping */
h1, h2, h3 {
  font-family: 'Outfit', sans-serif;
  color: #FFFFFF;
}
```

---

### C. Markdown Parsing & Custom Render Rules
If you are rendering the markdown customly in React/Next.js, the parser MUST handle these specific constructs:
1. **Alert Boxes / Notes**:
   - `> [!NOTE]` -> Render a blue container with a `lucide-react` `Info` icon.
   - `> [!WARNING]` or `> [!CAUTION]` -> Render an amber container with a `lucide-react` `AlertTriangle` icon.
2. **Tables**:
   - Standard GFM tables with vertical bars `|` and alignment dashes. Render them inside a scrollable container with customized background (`#080B12`) and borders (`#1F2937`).
3. **Inline Styles**:
   - Parse bold `**text**` to bold tags.
   - Parse code tags `` `code` `` to custom colored monospace spans.
   - Parse markdown links `[Label](URL)` into Next.js `<Link>` components for zero-refresh SPA routing.
4. **Code Blocks**:
   - Support syntax highlighting for `bash`, `typescript`, `javascript`, `json`, `http`, and `text`.

---

## 2. Navigation & Sidebar Structure

Use this exact navigation definition to configure your Mintlify `mint.json` or sidebar component:

```json
{
  "navigation": [
    {
      "group": "Getting Started",
      "pages": [
        { "title": "What is SettleSettle?", "slug": "" },
        { "title": "How SettleSettle Works", "slug": "how-it-works" },
        { "title": "Quick Start (5 minutes)", "slug": "quickstart" },
        { "title": "Core Concepts", "slug": "concepts" }
      ]
    },
    {
      "group": "SDK Reference",
      "pages": [
        { "title": "Installation", "slug": "sdk/installation" },
        { "title": "Initialization & Configuration", "slug": "sdk/initialization" },
        { "title": "Functions Quick Reference", "slug": "sdk/functions" },
        {
          "group": "Users (Directory Sync)",
          "pages": [
            { "title": "Sync User Profile", "slug": "sdk/users/sync" }
          ]
        },
        {
          "group": "Payments",
          "pages": [
            { "title": "Initialize a Payment", "slug": "sdk/payments/initialize" },
            { "title": "Verify a Payment", "slug": "sdk/payments/verify" }
          ]
        },
        {
          "group": "Wallet",
          "pages": [
            { "title": "Get Balance", "slug": "sdk/wallet/balance" },
            { "title": "Add Credits", "slug": "sdk/wallet/credit" },
            { "title": "Deduct Credits", "slug": "sdk/wallet/debit" },
            { "title": "Record Ad Reward", "slug": "sdk/wallet/ad-reward" },
            { "title": "Transaction History", "slug": "sdk/wallet/history" }
          ]
        },
        {
          "group": "Billing Configuration",
          "pages": [
            { "title": "Bootstrap Config", "slug": "sdk/billing/bootstrap" },
            { "title": "Inline Ad Reward", "slug": "sdk/billing/reward-ad" }
          ]
        },
        {
          "group": "Events (Usage Metering)",
          "pages": [
            { "title": "Track an Event", "slug": "sdk/events/track" },
            { "title": "Get Usage Summary", "slug": "sdk/events/summary" }
          ]
        },
        { "title": "Authentication", "slug": "sdk/auth" },
        { "title": "Subscriptions", "slug": "sdk/subscriptions" },
        { "title": "Error Handling", "slug": "sdk/errors" },
        { "title": "Graceful Shutdown", "slug": "sdk/shutdown" },
        { "title": "Central API Reference", "slug": "sdk/reference-api" }
      ]
    },
    {
      "group": "Guides",
      "pages": [
        { "title": "Setting Up Your First App", "slug": "guides/first-app" },
        { "title": "Tracking Usage in Next.js", "slug": "guides/nextjs" },
        { "title": "Tracking Usage in React Native", "slug": "guides/react-native" },
        { "title": "Building a Credit Wallet", "slug": "guides/credit-wallet" },
        { "title": "Charging Users Based on Usage", "slug": "guides/usage-billing" },
        { "title": "Setting Up Bank Payouts", "slug": "guides/bank-payouts" },
        { "title": "Graceful Shutdown & Event Flushing", "slug": "guides/shutdown" },
        { "title": "Global Payments & Currencies", "slug": "guides/global-payments" },
        { "title": "Sandbox vs Production Mode", "slug": "guides/sandbox-transition" },
        { "title": "Automated Settlement & Payouts", "slug": "guides/settlement-chron" }
      ]
    },
    {
      "group": "Example Integrations",
      "pages": [
        { "title": "VoiceShift (Voice AI)", "slug": "examples/changevoice" },
        { "title": "DocuMind (Document AI)", "slug": "examples/documind" }
      ]
    },
    {
      "group": "Webhooks",
      "pages": [
        { "title": "Overview", "slug": "webhooks" },
        { "title": "Verifying Webhook Signatures", "slug": "webhooks/verification" },
        { "title": "Webhook Event Types", "slug": "webhooks/events" },
        { "title": "Handling Failures and Retries", "slug": "webhooks/retries" }
      ]
    },
    {
      "group": "Security & Compliance",
      "pages": [
        { "title": "How We Handle Your Data (NDPR)", "slug": "security/data" },
        { "title": "How Keys Are Stored", "slug": "security/keys" }
      ]
    }
  ]
}
```

---

## 3. Comprehensive Content Dictionary

Here is the exact page-by-page title, category, and raw markdown content to be populated:

---

### Page 1: What is SettleSettle?
* **Slug**: `""` (Root/Index page)
* **Category**: `Getting Started`
* **Content**:
```markdown
SettleSettle is a platform built for global developers who want to charge users without spending weeks writing custom billing infrastructure. You focus on crafting excellent software. SettleSettle orchestrates the financial settlement pipelines globally.

### What it does — three lines
- Tracks what your users execute in your app (real-time usage metering)
- Charges them based on customized rules you define (billing logic)
- Settles earnings globally via direct local bank transfers or instantaneous Web3 rails (Solana/USDC)

### What it is NOT — be explicit

> SettleSettle is not a standalone raw processing gateway. Paystack, Flutterwave, and Solana move the actual capital.
> SettleSettle decides *when* to move it, *how much*, and *what to do if a user
> can't pay*. We sit atop the global rails to orchestrate workflows.

### Simple analogy

> Think of a power meter in a house. Electricity (your product) flows to users.
> The meter tracks usage and triggers a bill at the right time.
> SettleSettle is the meter. Paystack & Solana are the wires.

### API Base URL
For developers crafting custom system integrations, raw network requests flow directly through our secure REST edge:
> **`https://api.settlesettle.uno/v1`**

[**Quick Start — get running in 5 minutes →**](/docs/quickstart)
```

---

### Page 2: How SettleSettle Works
* **Slug**: `how-it-works`
* **Category**: `Getting Started`
* **Content**:
```markdown
Developer understands the full flow before writing a line of code.

### Step 1 — You integrate the SDK

Your app sends SettleSettle a signal every time a user does something billable. This is called a usage event. You define what counts as an event.

```typescript
// User ran an AI prompt — tell SettleSettle it happened
settle.events.track({ userId: 'user_123', eventType: 'AI_QUERY' })
```

### Step 2 — SettleSettle applies your billing rules

Based on the rules you set in your dashboard:
- Does this user have credits? Deduct from their wallet.
- Have they hit their limit? Block access or show an ad.
- Are they on a paid plan? Record the usage for their invoice.

Earnings accumulate in your SettleSettle dashboard ledger. Upon request, assets flow seamlessly into your Nigerian bank account or directly into your Solana wallet.

---

### Two API key types

| Key type | Where it lives | Used for |
|---|---|---|
| App API Key (`ss_live_...`) | Your server's `.env` | SDK calls — event tracking, wallet, payments |
| Developer JWT | Obtained via `settle.auth.login()` | Dashboard operations — viewing earnings, requesting payouts |

> [!CAUTION]
> Never put either key in client-side code (browser or mobile app).

### Where your money lives

```text
Option A: Traditional Rails (Fiat)
User pays ₦5,000
    → Goes to SettleSettle's Paystack account
    → Automatic split: 96.5% to your local bank / 3.5% fee
    → Real-time availability in your dashboard

Option B: Next-Gen Web3 (Solana)
User pays USDC / SOL
    → Instant Peer-to-Peer payment on Solana Mainnet
    → Directly settles in your Solana wallet
    → Absolute isolation and speed
```

> [!IMPORTANT]
> **Onboarding Prerequisite**: You **MUST** link your local Nigerian bank account OR add your Solana wallet address in the dashboard settings before deploying live. Linking a bank account enables Paystack dynamic subaccount splits. Link a Solana wallet for zero-latency Web3 payouts. If neither parameter is set, client initialization gates will fail.
```

---

### Page 3: Quick Start (5 minutes)
* **Slug**: `quickstart`
* **Category**: `Getting Started`
* **Content**:
```markdown
Developer tracks their first event and reads a wallet balance in under 5 minutes.

### Prerequisites
- Node.js 18+ installed
- A SettleSettle account ([sign up free](/register))
- A Next.js or Node.js project to drop this into

---

### Step 1 — Install the SDK

```bash
npm install settlesettle
# or
pnpm add settlesettle
```

### Step 2 — Get your API key

1. Go to your **SettleSettle Dashboard**
2. Click **Create App**
3. Name your app (e.g. "My AI Tool")
4. Copy the API key — it starts with `ss_live_`

> [!WARNING]
> The raw API key is shown **once only**. Save it in your `.env` immediately.

### Step 3 — Add it to your environment

```bash
# .env
SETTLESETTLE_API_KEY=ss_live_your_key_here
```

### Step 4 — Initialize the SDK

```typescript
// lib/settle.ts
import { SettleSettle } from 'settlesettle'

if (!process.env.SETTLESETTLE_API_KEY) {
  throw new Error('SETTLESETTLE_API_KEY is not set')
}

export const settle = new SettleSettle({
  apiKey: process.env.SETTLESETTLE_API_KEY,
})
```

### Step 5 — Track your first event

```typescript
import { settle } from '@/lib/settle'

export async function handleAiQuery(userId: string, prompt: string) {
  const result = await runAiModel(prompt)

  // Tell SettleSettle this billable action happened
  // Non-blocking — this never slows down your response
  settle.events.track({
    userId,
    eventType: 'AI_QUERY',
  })

  return result
}
```

### Step 6 — Check a user's wallet balance

```typescript
const { balance } = await settle.wallet.getBalance(userId)

if (balance <= 0) {
  throw new Error('No credits remaining.')
}
```

**✅ Success state:**
Events appear in your SettleSettle dashboard under your app within seconds. Under the hood, all signals are dispatched straight to our secure API root at `https://api.settlesettle.uno/v1`.

#### What's next
- [Set up wallet top-ups so users can add credits →](/docs/sdk/wallet/credit)
- [Configure what happens when a user runs out →](/docs/errors)
- [Set up bank payouts →](/docs/guides/bank-payouts)
```

---

### Page 4: Core Concepts
* **Slug**: `concepts`
* **Category**: `Getting Started`
* **Content**:
```markdown
Glossary of every term used in the docs.

| Term | What it means |
|---|---|
| **Developer** | You. The person who registered on SettleSettle and is building with it. |
| **App** | A project you register inside SettleSettle. Each app gets its own API key, users, and balance. If you're building two products, make two apps. |
| **End User / User** | The person using YOUR app. Not a SettleSettle account. Just an ID you pass — a UUID, email, whatever your system uses. |
| **API Key** | A secret key identifying your app. Format: `ss_live_xxxxxxxxxx`. Server-side only — never in browser or mobile code. |
| **Usage Event** | A signal sent when a user does something billable. You define the names. SettleSettle counts them. |
| **Event Type** | The name of a specific action. Use `SCREAMING_SNAKE_CASE`: `AI_QUERY`, `API_CALL`, `PDF_EXPORT`. |
| **Wallet** | A virtual credit balance attached to a user inside your app. Phase 1: credits. Phase 2: real Naira. |
| **Credits** | The unit of value in your app's wallet. You define what one credit costs. |
| **Kobo** | The smallest unit of Nigerian Naira. ₦1 = 100 kobo. All money amounts in the SDK are passed in kobo. |
| **Platform Fee** | The percentage SettleSettle takes per transaction. Default: 3.5%. Shown clearly before you go live. |
| **Payout** | When SettleSettle sends your earned money to your Nigerian bank account. |
| **Webhook** | A POST request SettleSettle sends to your server when something happens — payment confirmed, payout sent, etc. |
```

---

### Page 5: Installation
* **Slug**: `sdk/installation`
* **Category**: `SDK Reference`
* **Content**:
```markdown
Install the official Node SDK.

```bash
# npm
npm install settlesettle

# pnpm
pnpm add settlesettle

# yarn
yarn add settlesettle
```

### Supported environments

| Environment | Supported | Notes |
|---|---|---|
| Node.js 18+ | ✅ | Full support |
| Next.js App Router | ✅ | Server components and Route Handlers only |
| Next.js Pages Router | ✅ | `getServerSideProps` and API routes |
| React Native | ✅ | Use with a backend proxy — never on-device |
| Browser / Client-side | ❌ | API key would be publicly exposed |

> [!WARNING]
> The SDK is **server-side only**. Every request to SettleSettle must go through your server. If a user finds your API key, they can manipulate wallet balances on your app.
```

---

### Page 6: Initialization & Configuration
* **Slug**: `sdk/initialization`
* **Category**: `SDK Reference`
* **Content**:
```markdown
### Recommended pattern — create a singleton

```typescript
// lib/settle.ts
import { SettleSettle } from 'settlesettle'

if (!process.env.SETTLESETTLE_API_KEY) {
  throw new Error('SETTLESETTLE_API_KEY is not set in environment variables')
}

export const settle = new SettleSettle({
  apiKey: process.env.SETTLESETTLE_API_KEY,
})
```

Import this singleton wherever you need it:

```typescript
import { settle } from '@/lib/settle'
```

---

### Full configuration reference

```typescript
const settle = new SettleSettle({
  apiKey: 'ss_live_your_key', // Required if not in environment
  baseUrl: 'https://api.settlesettle.uno/v1', // Optional: Override API endpoint
  timeout: 10000,             // Optional: Request timeout in ms (default: 10000)
  eventBuffering: {
    enabled: true,            // Recommended: Process events in the background
    maxBatchSize: 50,         // Flush when queue reaches 50 events
    flushIntervalMs: 2000,    // Or flush every 2 seconds
  },
  retry: {
    maxRetries: 3,            // Retry on network/5xx/429 errors (default: 3)
    backoffFactor: 2,         // Exponential backoff multiplier (default: 2)
  },
})
```

### All config options

| Option | Type | Default | Description |
|---|---|---|---|
| `apiKey` | string | `process.env.SETTLESETTLE_API_KEY` | Your app API key |
| `baseUrl` | string | `https://api.settlesettle.uno/v1` | The central SettleSettle API Base URL |
| `timeout` | number | `10000` | Request timeout in milliseconds |
| `eventBuffering.enabled` | boolean | `true` | Enable background event batching |
| `eventBuffering.maxBatchSize` | number | `50` | Force flush at this queue size |
| `eventBuffering.flushIntervalMs` | number | `2000` | Background flush interval |
| `retry.maxRetries` | number | `3` | Max retry attempts per request |
| `retry.backoffFactor` | number | `2` | Exponential backoff multiplier |
```

---

### Page 7: Functions Quick Reference
* **Slug**: `sdk/functions`
* **Category**: `SDK Reference`
* **Content**:
```markdown
A master index of all core functions and client-side utilities exposed by the official `SettleSettle` SDK. Use this directory to quickly check return types and understand what methods to call for various integration milestones.

### Global Overview Table

| Function / Method | SDK Module | Expected Output | Operational Objective | Action Classification |
|---|---|---|---|---|
| `settle.users.sync(data)` | **Users** | `Promise<AppUser>` | Syncs end-user details to SettleSettle user directory for auditing and historical ledger lookup. | **Onboarding** |
| `settle.payments.initialize(data)` | **Payments** | `Promise<PaymentInit>` | Provisions dynamic payment links and initiates transactional intent nodes. | **Monetization** |
| `settle.payments.verify(ref)` | **Payments** | `Promise<Payment>` | Connects to core networks to confirm completion of payment events. | **Monetization** |
| `settle.wallet.getBalance(id)` | **Wallet** | `Promise<Balance>` | Queries the system ledger for user virtual credit tallies and equivalent fiat value. | **Audit** |
| `settle.wallet.credit(id, data)` | **Wallet** | `Promise<Wallet>` | Directly programmatically injects free, promotional, or custom credits to an account. | **Billing** |
| `settle.wallet.debit(id, data)` | **Wallet** | `Promise<Wallet>` | Atomically consumes credits for programmatic system tasks (API calls, queries, downloads). | **Billing** |
| `settle.wallet.getHistory(id)` | **Wallet** | `Promise<History[]>` | Enumerates real-time transaction logs, charge statements, and audit trails. | **Audit** |
| `settle.wallet.recordAdReward(id)` | **Wallet** | `Promise<Wallet>` | Captures completed video-ad engagement and dispenses custom virtual reward allocations. | **Engagement** |
| `settle.billing.bootstrap()` | **Billing** | `Promise<Billing>` | Hydrates client environments with global layout tokens, rulesheets, and gateway parameters. | **Lifecycle** |
| `settle.billing.recordInlineAdReward(id)` | **Billing** | `Promise<Reward>` | Authorizes and allocates dynamic inline user credits via standard web monetization gates. | **Engagement** |
| `settle.events.track(event)` | **Events** | `Promise<Ack>` | Fires non-blocking usage telemetry to run automatic, server-side event-based pricing rules. | **Tracking** |
| `settle.events.getSummary(id)` | **Events** | `Promise<Summary>` | Compiles telemetry streams into aggregated app-level velocity analytics. | **Analytics** |
| `settle.auth.checkCredentials()` | **Auth** | `Promise<boolean>` | Runs connectivity checks validating that current API key tokens are active and routed. | **Core** |
| `settle.shutdown()` | **Core** | `Promise<void>` | Flushes background queues securely and releases connection memory buffers. | **Lifecycle** |

---

### Implementation Insights

#### 📡 Non-Blocking Event Tracking
Calling `settle.events.track()` queues telemetry locally and fires asynchronously. It does **not** impact your API response times, ensuring zero overhead for app users.
```typescript
// Fire-and-forget. The SDK processes this in the background.
settle.events.track({
  userId: "user_456",
  eventType: "AI_QUERY"
});
```

#### 🏦 Monetary Consistency
Always remember that the SDK, API, and Webhooks expect financial numeric parameters in **Kobo** (100 kobo = ₦1.00) to prevent floating-point rounding discrepancies.

#### 🧼 Clean Disconnections
When running on serverless environments (AWS Lambda, Vercel) or process lifecycles (PM2), invoke `settle.shutdown()` upon application close to prevent unhandled async event loss.
```typescript
process.on('SIGTERM', async () => {
  console.log('Cleaning down connections...');
  await settle.shutdown();
});
```
```

---

### Page 8: Initialize a Payment
* **Slug**: `sdk/payments/initialize`
* **Category**: `SDK Reference`
* **Content**:
```markdown
Create a Paystack checkout session for your user. Redirect them to the returned URL to complete payment.

```typescript
const { checkoutUrl, reference } = await settle.payments.initialize({
  endUserId: 'user_123',
  amountKobo: 500000,             // ₦5,000 — always pass amounts in kobo
  email: 'user@example.com',
  metadata: { plan: 'starter' }, // Optional — attach any extra context
})

// Redirect the user to this URL to complete payment
console.log(checkoutUrl)
// → https://checkout.paystack.com/xxxxxxxxxxxxxxxxxx

// Store this — use it to check payment status
console.log(reference)
// → ss_1234567890_abcdef
```

### Request fields

| Field | Type | Required | Description |
|---|---|---|---|
| `endUserId` | string | Yes | Your user's ID in your system |
| `amountKobo` | number | Yes | Amount in kobo. ₦1 = 100 kobo. Must be a positive integer. |
| `email` | string | Yes | User's email for the Paystack receipt |
| `metadata` | object | No | Any extra key-value data to attach |

### Converting Naira to kobo

```typescript
// ₦500 = 50000 kobo
const amountKobo = nairaAmount * 100
```

### After payment
You do not need to do anything. SettleSettle receives the Paystack webhook, confirms the payment, and credits your developer balance automatically. If you need to check status manually, use `settle.payments.verify()`.
```

---

### Page 9: Verify a Payment
* **Slug**: `sdk/payments/verify`
* **Category**: `SDK Reference`
* **Content**:
```markdown
> [!WARNING]
> Successful payments are confirmed automatically via webhooks. Only use this method if you need to manually poll for payment status.

```typescript
const result = await settle.payments.verify('ss_1234567890_abcdef')

console.log(result.status)
// 'pending' | 'success' | 'failed' | 'refunded'
```

### Response fields

| Field | Type | Description |
|---|---|---|
| `reference` | string | Your payment reference |
| `status` | string | `pending` | `success` | `failed` | `refunded` |
| `amountKobo` | number | Amount in kobo |
| `paidAt` | string | null | ISO 8601 timestamp of payment, or null if unpaid |
```

---

### Page 10: Get Balance
* **Slug**: `sdk/wallet/balance`
* **Category**: `SDK Reference`
* **Content**:
```markdown
```typescript
const { balance } = await settle.wallet.getBalance('user_123')

console.log(balance) // 47
```

### Use this before any billable action:

```typescript
async function canUserProceed(userId: string): Promise<boolean> {
  const { balance } = await settle.wallet.getBalance(userId)
  return balance > 0
}
```
```

---

### Page 11: Add Credits
* **Slug**: `sdk/wallet/credit`
* **Category**: `SDK Reference`
* **Content**:
```markdown
Use this when a user tops up their wallet, completes a task, or receives a reward.

```typescript
await settle.wallet.credit('user_123', {
  amount: 100,                        // Credits to add — must be >= 1
  description: 'Top-up via Paystack', // Shown in transaction history
  metadata: {                         // Optional
    paymentReference: 'ss_1234567890_abc',
  },
})
```

### Request fields

| Field | Type | Required | Description |
|---|---|---|---|
| `amount` | number | Yes | Credits to add. Must be a positive integer >= 1. |
| `description` | string | No | Human-readable label for the transaction |
| `metadata` | object | No | Any additional context |
```

---

### Page 12: Deduct Credits
* **Slug**: `sdk/wallet/debit`
* **Category**: `SDK Reference`
* **Content**:
```markdown
Deduct credits when a user performs a paid action.

```typescript
import { InsufficientCreditsError } from 'settlesettle'

try {
  await settle.wallet.debit('user_123', {
    amount: 10,
    description: 'AI Image Generation',
  })
} catch (err) {
  if (err instanceof InsufficientCreditsError) {
    // This is expected — not a bug
    // Show a paywall, prompt a top-up, or trigger an ad
    console.log(`Balance: ${err.currentBalance}, Needed: ${err.requestedAmount}`)
  }
}
```

> [!WARNING]
> `InsufficientCreditsError` is **expected behaviour**, not a bug. Always catch it and decide what your app should do — show a paywall, trigger an ad, or gracefully downgrade the action.
```

---

### Page 13: Record Ad Reward
* **Slug**: `sdk/wallet/ad-reward`
* **Category**: `SDK Reference`
* **Content**:
```markdown
Award credits to a user after they watch a rewarded ad. Use this as a fallback when their balance hits zero.

```typescript
await settle.wallet.recordAdReward('user_123', {
  adNetwork: 'admob',           // The ad network that served the ad
  rewardAmount: 5,              // Credits to award
  adUnitId: 'ca-app-pub-xxx',  // Optional — the specific ad unit
})
```

### Typical flow

```typescript
try {
  await settle.wallet.debit(userId, { amount: 10, description: 'AI Query' })
} catch (err) {
  if (err instanceof InsufficientCreditsError) {
    // Show a rewarded ad to the user
    const adResult = await showRewardedAd()

    if (adResult.completed) {
      // User watched the ad — give them credits
      await settle.wallet.recordAdReward(userId, {
        adNetwork: 'admob',
        rewardAmount: 10,
      })
      // Retry the original action
      await settle.wallet.debit(userId, { amount: 10, description: 'AI Query' })
    }
  }
}
```
```

---

### Page 14: Transaction History
* **Slug**: `sdk/wallet/history`
* **Category**: `SDK Reference`
* **Content**:
```markdown
Get a paginated list of a user's wallet transactions.

```typescript
const history = await settle.wallet.getHistory('user_123', {
  page: 1,
  limit: 20,
})

console.log(history.currentBalance)  // 47
console.log(history.transactions)    // Array of transactions
console.log(history.pagination.hasMore) // true/false
```

### Response shape

```typescript
{
  userId: string
  currentBalance: number
  transactions: Array<{
    id: string
    type: 'CREDIT' | 'DEBIT' | 'AD_REWARD'
    amount: number
    balanceAfter: number
    description: string | null
    createdAt: string // ISO 8601
  }>
  pagination: {
    page: number
    limit: number
    total: number
    hasMore: boolean
  }
}
```
```

---

### Page 15: Track an Event
* **Slug**: `sdk/events/track`
* **Category**: `SDK Reference`
* **Content**:
```markdown
Track what users are doing in your app. Used for usage metering, billing, and analytics.

```typescript
// Non-blocking — returns void immediately
// The event is queued and sent in the background
settle.events.track({
  userId: 'user_123',
  eventType: 'AI_QUERY',
  quantity: 1,           // Optional — defaults to 1
  metadata: {            // Optional — attach any context
    model: 'gpt-4',
    tokens: 1240,
  },
})
```

**`track()` is synchronous and non-blocking.** It never `await`s a network call. Events are pushed to an internal buffer and sent to the API in batches automatically. This means it will never slow down your response time.

> [!NOTE]
> **Why is `track()` not awaited, but `wallet.debit()` is?**
> - **`events.track()` (Usage Telemetry)**: Operates on a background in-memory queue and processes at 0ms user-latency. It returns `void` instantly.
> - **`wallet.debit()` (Credit Transactions)**: Makes a blocking atomic database withdrawal and can throw `InsufficientCreditsError`. It MUST be awaited to guarantee transaction safety before exposing paid features.

> [!CAUTION]
> **Never do this:**
> ```typescript
> // ❌ Wrong — track() returns void, not a Promise
> await settle.events.track({ userId, eventType: 'AI_QUERY' })
> ```

**Always do this:**

```typescript
// ✅ Correct — fire and continue
settle.events.track({ userId, eventType: 'AI_QUERY' })
```

### Naming your events — use SCREAMING_SNAKE_CASE

| Good | Bad |
|---|---|
| `AI_QUERY` | `aiQuery` |
| `PDF_EXPORT` | `pdf-export` |
| `API_CALL` | `event1` |
| `VIDEO_MINUTE` | `userDidSomething` |

### 💎 100% TypeScript Type-Safety
While the SDK accepts any `string` as an `eventType` to remain completely flexible, you can strictly enforce autocomplete across your entire app by wrapping it in a typesafe map:

```typescript
// 1. Define your immutable application events
export const APP_EVENTS = {
  AI_QUERY: 'AI_QUERY',
  IMAGE_GEN: 'IMAGE_GEN',
  PDF_EXPORT: 'PDF_EXPORT',
} as const;

export type AppEvent = typeof APP_EVENTS[keyof typeof APP_EVENTS];

// 2. Create a lightweight typesafe wrapper
export function trackAppEvent(userId: string, type: AppEvent) {
  settle.events.track({ userId, eventType: type });
}

// 3. Now get IDE Autocomplete & Compiler safety!
trackAppEvent(userId, APP_EVENTS.AI_QUERY);
```

### Force-flush the buffer immediately

```typescript
// Use this during graceful shutdown
await settle.events.flush()
```

### Check how many events are waiting

```typescript
console.log(settle.events.pendingCount) // e.g. 12
```
```

---

### Page 16: Get Usage Summary
* **Slug**: `sdk/events/summary`
* **Category**: `SDK Reference`
* **Content**:
```markdown
Get an aggregated breakdown of what a user has done in your app.

```typescript
const summary = await settle.events.getSummary('user_123')

console.log(summary.summary)
// [
//   { eventType: 'AI_QUERY', totalQuantity: 145, count: 140 },
//   { eventType: 'PDF_EXPORT', totalQuantity: 12, count: 12 },
// ]
```
```

---

### Page 17: Authentication (SDK)
* **Slug**: `sdk/auth`
* **Category**: `SDK Reference`
* **Content**:
```markdown
The `auth` module lets you authenticate developers programmatically — useful if you are building your own dashboard or tooling on top of SettleSettle.

> For most SDK use cases (tracking events, wallet operations, payments) you only need your App API Key. The auth module is for developer account operations.

---

### Login

```typescript
const auth = await settle.auth.login({
  email: 'dev@example.com',
  password: 'securepassword',
})

console.log(auth.accessToken)  // JWT — valid for 15 minutes
console.log(auth.refreshToken) // Opaque token — valid for 7 days
```

### Refresh Token

Access tokens expire after 15 minutes. Use your refresh token to get a new pair without requiring the developer to log in again.

```typescript
const auth = await settle.auth.refresh({
  refreshToken: 'your_refresh_token_here',
})
// Returns a fresh { accessToken, refreshToken }
// The old refresh token is immediately revoked
```

> [!WARNING]
> Refresh tokens rotate on every use. Once you call `refresh()`, the token you passed in is permanently revoked. Store the new one immediately.

### Logout

```typescript
await settle.auth.logout({
  refreshToken: 'your_refresh_token_here',
})
// The refresh token is revoked — the developer is fully logged out
```
```

---

### Page 18: Error Handling
* **Slug**: `sdk/errors`
* **Category**: `SDK Reference`
* **Content**:
```markdown
The SettleSettle SDK uses typed error classes. Always catch by class — never by message string, because messages can change between versions.

### Import the error classes you need

```typescript
import {
  SettleSettleError,        // Base — catch all SDK errors
  InsufficientCreditsError, // 402 — user has no credits
  AuthenticationError,      // 401 — bad or missing API key
  ValidationError,          // 400 — invalid request body
  RateLimitError,           // 429 — too many requests
  TimeoutError,             // 408 — request took too long
  ApiError,                 // Any other API error
} from 'settlesettle'
```

### Full handling example

```typescript
try {
  await settle.wallet.debit('user_123', { amount: 10 })

} catch (err) {

  if (err instanceof InsufficientCreditsError) {
    // Expected — user is out of credits
    // Trigger your paywall or ad fallback
    console.log(`Need: ${err.requestedAmount}, Have: ${err.currentBalance}`)

  } else if (err instanceof AuthenticationError) {
    // Your API key is wrong or missing
    console.error('Check your SETTLESETTLE_API_KEY.')

  } else if (err instanceof ValidationError) {
    // You sent a bad request body
    console.error('Bad request:', err.message, err.fields)

  } else if (err instanceof RateLimitError) {
    // Slow down — too many requests
    console.error(`Rate limited. Retry in ${err.retryAfterMs}ms.`)

  } else if (err instanceof TimeoutError) {
    // Request took too long
    console.error('Request timed out. Check your connection.')

  } else if (err instanceof SettleSettleError) {
    // Any other SDK error — catch-all
    console.error(`SDK error [${err.code}]: ${err.message}`)
    console.error('Status code:', err.statusCode)

  } else {
    // Completely unexpected — rethrow
    throw err
  }
}
```

### Error class reference

| Class | HTTP Status | When it's thrown | Key properties |
|---|---|---|---|
| `SettleSettleError` | Any | Base class — don't throw directly | `statusCode`, `code`, `payload` |
| `AuthenticationError` | 401 | API key is missing, wrong, or expired | — |
| `InsufficientCreditsError` | 402 | Wallet debit with not enough credits | `userId`, `currentBalance`, `requestedAmount` |
| `ValidationError` | 400 | Invalid request payload | `fields` (which fields failed) |
| `RateLimitError` | 429 | Too many requests | `retryAfterMs` |
| `TimeoutError` | 408 | Request exceeded timeout | — |
| `ApiError` | Other | Any unhandled server error | `statusCode` |

### Errors that are retried automatically by the SDK:

The SDK automatically retries these before throwing — you only see the error if all retries are exhausted:
- `429 RateLimitError` — respects `Retry-After` header
- `5xx` server errors
- Timeouts
- Network failures

These are **never retried** (they're deterministic failures):
- `400 ValidationError`
- `401 AuthenticationError`
- `402 InsufficientCreditsError`
- `403 ForbiddenError`
```

---

### Page 19: Graceful Shutdown
* **Slug**: `sdk/shutdown`
* **Category**: `SDK Reference`
* **Content**:
```markdown
If you're using event buffering (recommended), some events may still be in the internal queue when your process is about to exit. Call `settle.destroy()` during your shutdown sequence to flush them before the process terminates.

```typescript
// In your app's startup/shutdown file
import { settle } from './lib/settle'

process.on('SIGTERM', async () => {
  console.log('Flushing SettleSettle event buffer...')
  await settle.destroy()
  process.exit(0)
})

process.on('SIGINT', async () => {
  await settle.destroy()
  process.exit(0)
})
```

> Without this, any events still in the buffer when your process exits will be lost. This is especially important in serverless environments with short lifetimes.
```

---

### Page 20: Sync User Profile
* **Slug**: `sdk/users/sync`
* **Category**: `SDK Reference`
* **Content**:
```markdown
Track and catalog your app's users inside SettleSettle's directory. Call this when an end-user signs in, registers, or updates their details in your app.

This action is **100% idempotent** — safe to trigger repeatedly. If the user doesn't exist, they're instantly registered; if they do, their metadata updates.

```typescript
const user = await settle.users.sync({
  externalUserId: 'user_998877',    // Required — your unique ID for them
  email: 'lexi@example.com',        // Optional — user email
  name: 'Lexi Thompson',            // Optional — full name
  metadata: {                       // Optional — any custom context
    plan: 'premium',
    cohort: 'may_2026',
  },
})

console.log(user.id) // internal SettleSettle user ID
```

### Usage Strategies — The Vibe Coder's Playbook

> [!NOTE]
> Just sprinkle this in your server-side auth handler. Right after your db records the user's session, fire this off to keep SettleSettle in perfect lock-step alignment.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `externalUserId` | `string` | **Yes** | The user ID string from your primary database. |
| `email` | `string` | No | Used to link automatic financial records. |
| `name` | `string` | No | Standard visual identifier for Dashboard lookups. |
| `metadata` | `object` | No | Extra telemetry keys you want visible in User Profiler. |
```

---

### Page 21: Bootstrap Config
* **Slug**: `sdk/billing/bootstrap`
* **Category**: `SDK Reference`
* **Content**:
```markdown
Hydrate the entire billing and wallet modal experience for an end-user in **one single network round-trip**. 

Instead of triggering 4 or 5 separate calls (balance, pricing, history, themes), use this single fast method to bootstrap your custom billing interfaces instantly.

```typescript
const dashboardData = await settle.billing.bootstrap('user_998877')

// 1. Read current active wallet balance
console.log(dashboardData.walletState.currentBalance) // 450

// 2. Retrieve custom UI customizations from SettleSettle config
console.log(dashboardData.uiConfig.themeColor) // "#10B981"
console.log(dashboardData.uiConfig.title)      // "Credit Wallet"

// 3. Loop through active monetized event rules
console.log(dashboardData.billingRules)
// [{ eventType: 'AI_PROMPT', creditsCost: 5 }]

// 4. Deliver local ledger transactions
console.log(dashboardData.walletState.history)
```

### Building Your Customizable User Wallet

With the bootstrap payload, you can effortlessly construct a native user wallet dashboard tailored to your branding:

1. **Showcase Available Balance**: Extract `walletState.currentBalance` and wrap it inside an immersive banner styled with your centralized `uiConfig.themeColor`.
2. **Expose Deductions & Grants**: Map through the `walletState.history` payload to show users precisely how their credits are being consumed (e.g., "-5 Credits for AI Prompt") and awarded.
3. **Embed Quick Refills**: Render a prominent "Get More Credits" button at the head of your UI that instantly initialises standard Checkout modals when their ledger drops low.

### Response Schema Overview

This method delivers a combined object payload mapping to your active Dashboard settings:

- **`uiConfig`**: Custom branding configurations containing `themeColor`, `logoUrl`, `title`, and custom visual CSS injectors.
- **`walletState`**: Complete financial payload housing `currentBalance` and detailed itemized transaction `history` records for usage visibility.
- **`billingRules`**: All active pricing configurations (i.e., how many credits are consumed per tracked usage event).
- **`availablePackages`**: Array of custom active Credit Packages configured directly inside your SettleSettle Dashboard (e.g. `{ name: 'Starter Pack', credits: 1000, priceKobo: 500000 }`), allowing you to render a dynamic refill grid instantly.
```

---

### Page 22: Inline Ad Reward
* **Slug**: `sdk/billing/reward-ad`
* **Category**: `SDK Reference`
* **Content**:
```markdown
Award automated, pre-configured credit incentives to users directly from your custom modal controllers after they view an ad.

Instead of passing hardcoded amounts from your code, this calls your centralized dashboard config values (`adCredits`) to award static, consistent incentive points.

```typescript
// Ad complete signal confirmed by network
const result = await settle.billing.rewardAd('user_998877')

console.log(result.creditsAwarded) // e.g. 5 (controlled in dashboard)
console.log(result.newBalance)     // e.g. 455
```

### The Ultimate "Vibe Fallback" Flow

```typescript
try {
  // 1. Charge user for premium action
  await settle.wallet.debit(userId, { amount: 5, description: "AI Tool" })
} catch (err) {
  if (err instanceof InsufficientCreditsError) {
    // 2. Prompt them to watch a quick sponsored ad to gain free credits
    const watched = await triggerRewardedAdClient()
    if (watched) {
      // 3. Inform the API and grant their instant incentive
      await settle.billing.rewardAd(userId)
      
      // 4. Retry original action now that balance is restored!
      await settle.wallet.debit(userId, { amount: 5, description: "AI Tool" })
    }
  }
}
```
```

---

### Page 23: Setting Up Your First App
* **Slug**: `guides/first-app`
* **Category**: `Guides`
* **Content**:
```markdown
**Time:** 5 minutes

1. Sign up at [settlesettle.uno](/register)
2. Click **New App** in the dashboard
3. Enter your app name and currency (NGN)
4. Copy your API key — save it immediately into your `.env`
5. Add your Nigerian bank account for payouts
6. You're ready to integrate
```

---

### Page 24: Tracking Usage in Next.js
* **Slug**: `guides/nextjs`
* **Category**: `Guides`
* **Content**:
```markdown
Full walkthrough on using SettleSettle within the Next.js ecosystem:

- Where to create the SDK singleton (`lib/settle.ts`)
- How to track events in server components
- How to track events in Route Handlers (`app/api/...`)
- How to check wallet balance before allowing an action
- How to handle `InsufficientCreditsError` in the API layer

> [!CAUTION]
> Common mistake: importing SDK in client components (will expose API key). Always ensure files that initialize the SDK are either marked `server-only` or only imported in server files.
```

---

### Page 25: Tracking Usage in React Native
* **Slug**: `guides/react-native`
* **Category**: `Guides`
* **Content**:
```markdown
Building an iOS or Android app with React Native? You absolutely MUST use a backend proxy. If you ship your `ss_live` key inside your mobile binary, anyone can unpack it and steal your balance!

### The "Secure Vibe" Architecture

```text
[React Native App]
      ↓ (Secure HTTPS Call with User JWT)
[Your Backend (Node/NextJS)]  <-- SS Key lives safely here
      ↓ (SettleSettle SDK)
[SettleSettle API]
```

### Step 1: Create the Endpoint in Your Backend

In your Next.js, Express, or NestJS backend, create a route handler:

```typescript
// Next.js: app/api/user-action/route.ts
import { settle } from '@/lib/settle'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { userId, actionType } = await req.json()

  // 1. Logically process the task (e.g. generate an image)
  // 2. Trigger the usage event safely using the server-side SDK
  settle.events.track({ userId, eventType: actionType })

  return NextResponse.json({ success: true })
}
```

### Step 2: Consume in React Native

```typescript
async function handleButtonPress() {
  const response = await fetch('https://api.yourapp.com/api/user-action', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: 'user_998877', actionType: 'MOBILE_AI_RUN' })
  })
}
```
```

---

### Page 26: Building a Credit Wallet
* **Slug**: `guides/credit-wallet`
* **Category**: `Guides`
* **Content**:
```markdown
Building an AI tool or consumption-based platform requires keeping track of virtual credits. Here's the complete recipe for a killer flow:

### Phase 1: The "Welcome Wagon" (New Users)
When a user registers, give them a small bucket of free credits to try your product.

```typescript
// Inside your registration logic
await settle.users.sync({ externalUserId: user.id, email: user.email })

await settle.wallet.credit(user.id, {
  amount: 20, 
  description: 'Welcome free trial credits!'
})
```

### Phase 2: The "Gatekeeper" (Guarding Features)
Deduct credits before executing the high-cost API (like Midjourney or GPT4).

```typescript
try {
  await settle.wallet.debit(userId, { amount: 5, description: 'Generation cost' })
  
  // If it succeeds, execute the AI code!
  return await executeAiTask()
  
} catch (err) {
  if (err instanceof InsufficientCreditsError) {
    return { error: 'TOPUP_REQUIRED', message: 'Zero credits remaining!' }
  }
}
```

### Phase 3: The "Refill" (Customizable Dashboard Packages)

Instead of hardcoding price points inside your code, you should manage and customize **Credit Packages** directly from your **SettleSettle Dashboard** (under the *Billing Config* tab).

This gives you instant control to tweak pricing, add promotional tiers, or adjust credit counts without deploying a single line of code!

#### 1. Configure Packages in Your Dashboard
Create tiers like:
- **Starter Pack**: 500 Credits for ₦1,500.00
- **Pro Growth**: 2,500 Credits for ₦5,000.00
- **Enterprise Lift**: 10,000 Credits for ₦15,000.00

#### 2. Render Dynamic Refills & Open Checkout
Hydrate your pricing cards instantly using the SDK Bootstrap payload:

```typescript
// 1. Grab your dynamic packages configured in the dashboard
const { availablePackages } = await settle.billing.bootstrap(userId)

// 2. Display the grid to the user, and when they click 'Buy':
async function onPurchaseClick(selectedPkg) {
  const { checkoutUrl } = await settle.payments.initialize({
    endUserId: userId,
    amountKobo: selectedPkg.priceKobo, 
    email: user.email,
    metadata: {
      packageId: selectedPkg.id,
      creditedAmount: selectedPkg.credits
    }
  })
  
  // Redirect the user to the secure checkout session!
  window.location.href = checkoutUrl
}
```

> [!NOTE]
> When the payment clears, SettleSettle automatically fires a webhook payload to your API. Catch the `charge.success` event, parse your `metadata.creditedAmount`, and execute `settle.wallet.credit()` to instantly restore the user's ledger balance!
```

---

### Page 27: Charging Users Based on Usage
* **Slug**: `guides/usage-billing`
* **Category**: `Guides`
* **Content**:
```markdown
Metering allows you to track specific actions instead of flat wallets. This is ideal if you bill at the end of the month or simply want granular analytics.

> [!IMPORTANT]
> **Understanding the `await` model**:
> 1. **Telemetry** (`settle.events.track()`) runs on a non-blocking background memory queue. **Do NOT await it.**
> 2. **Credit Wallet** (`settle.wallet.debit()`) performs atomic network transactions. **You MUST await it.**

### 1. Log Events Liberally
You can track unlimited events. `track()` uses background memory buffering, meaning it runs at **0ms latency cost** to your main execution loop.

```typescript
// Just fire and forget. Do NOT await!
settle.events.track({
  userId: 'user_123',
  eventType: 'API_CALL',
  metadata: { endpoint: '/v1/metrics' }
})
```

### 2. Query Summary Metrics
Need to see what users consumed to generate a custom report or view in your admin portal?

```typescript
const summary = await settle.events.getSummary('user_123')
console.log(summary.summary)
// [ { eventType: 'API_CALL', totalQuantity: 15400 } ]
```
```

---

### Page 28: Setting Up Bank Payouts
* **Slug**: `guides/bank-payouts`
* **Category**: `Guides`
* **Content**:
```markdown
Getting your money into your local Nigerian Bank Account is the ultimate reward. SettleSettle provides full CBN clearing house support.

### The Complete Walkthrough

1. **Onboard Your Account**:
   Navigate to the Dashboard **Payouts** tab. Enter your 10-digit NUBAN and select your clearing bank.
   *Behind the scenes, we verify your account status with Paystack instant verification engines.*

2. **Accumulate Gross Ledger**:
   As end-users pay through your SDK gateways, funds fill up your Developer Wallet.
   
3. **Initiate the Clearing Transfer**:
   Submit a payout request from the Payout Deck (minimum ₦1,000.00).
   - **Pending**: Funds are reserved and submitted into verification queues.
   - **Success**: External Paystack nodes successfully push money to your default bank account.

> [!WARNING]
> If an external settlement fails due to transient CBN downtime, the system atomizes a safe rollback, instantly restoring the pending Naira balance back into your available developer ledger!
```

---

### Page 29: Graceful Shutdown & Event Flushing
* **Slug**: `guides/shutdown`
* **Category**: `Guides`
* **Content**:
```markdown
By default, SettleSettle buffers event tracking signals in local application memory. Every 2 seconds (or when the bucket hits 50 items), it flushes them in a single batched REST request.

This boosts performance massively, but introduces a small risk: **What if your server restarts?** Any events currently in that 2-second window will disappear.

### The Cure: Listen to OS Signals

Tell Node.js to force a memory flush right before exiting.

```typescript
import { settle } from './lib/settle'

async function shutdown() {
  console.log('⚠️ Node process shutting down. Draining event buffer...')
  await settle.destroy() // Forces a sync flush and destroys timers
  process.exit(0)
}

// Catch OS termination signals
process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
```

> [!NOTE]
> Essential if you are deploying to **Render**, **Vercel**, **Heroku**, or **Docker** where container lifecycles restart frequently during deployments.
```

---

### Page 30: Webhooks Overview
* **Slug**: `webhooks`
* **Category**: `Webhooks`
* **Content**:
```markdown
SettleSettle webhooks let your servers receive real-time, event-driven HTTP POST notifications when key user behavior and lifecycle signals occur inside your workspace.

By subscribing to webhooks, you don't have to repeatedly poll our APIs to stay up-to-date with event pricing, customer wallets, or critical intelligence telemetry.

### Registering Your Endpoint

To configure a webhook:
1. Go to your **SettleSettle Dashboard** and open **Application Settings**.
2. Scroll to the **Developer Webhooks** panel.
3. Enter your public HTTPS URL (e.g. `https://api.yourdomain.com/webhooks/settlesettle`).
4. Click **Register Webhook**.
5. Copy the secure signing key (`wh_sec_...`) immediately. For maximum security, this secret key is displayed only **once** during registration.

### Testing Webhooks

You can trigger a manual mock event directly from the dashboard:
- Under your configured webhooks list, click the **Test** button next to your endpoint.
- SettleSettle instantly dispatches a test payload containing a mock version of your subscribed events, allowing you to debug and verify your server-side handler before deploying live.
```

---

### Page 31: Verifying Webhook Signatures
* **Slug**: `webhooks/verification`
* **Category**: `Webhooks`
* **Content**:
```markdown
To guarantee that incoming webhook requests are genuinely sent by SettleSettle and have not been intercepted or manipulated, you must verify the signature headers of every HTTP POST payload.

SettleSettle signs each webhook request using HMAC SHA256 of the raw request body, keyed by the **SHA256 hash of your webhook secret** (Rule 5).

### Signature Verification Headers
Every webhook delivery contains the following signature header:
- **`x-settlesettle-signature`**: The SHA256 signature calculated from the raw payload buffer.

### Verification Algorithm
To verify the payload signature:
1. Read the **`x-settlesettle-signature`** header.
2. Read the raw request body buffer (do not parse or modify JSON formatting before hashing).
3. Compute the SHA256 hash of your webhook secret (`wh_sec_...`) in hex format.
4. Generate the expected HMAC SHA256 of the raw body using the computed secret hash as the key.
5. Securely compare the header signature with the computed signature using a constant-time comparison to prevent timing attacks.

---

### Concrete Node.js Express Example

Here is a ready-to-run middleware blueprint for verifying webhook signatures:

```javascript
const crypto = require('crypto');

function verifySettleSettleWebhook(req, res, next) {
  const signature = req.headers['x-settlesettle-signature'];
  const webhookSecret = process.env.SETTLESETTLE_WEBHOOK_SECRET; // wh_sec_...

  if (!signature || !webhookSecret) {
    return res.status(401).send('Unauthorized: Missing signature or webhook secret');
  }

  // 1. Get raw request body buffer
  const rawBody = req.rawBody; // Make sure express.raw() is configured

  // 2. Compute SHA256 hash of the webhook secret key
  const hashedSecret = crypto
    .createHash('sha256')
    .update(webhookSecret)
    .digest('hex');

  // 3. Generate expected HMAC SHA256 signature of the raw payload
  const computedSignature = 'sha256=' + crypto
    .createHmac('sha256', hashedSecret)
    .update(rawBody)
    .digest('hex');

  // 4. Secure constant-time comparison
  const signatureBuffer = Buffer.from(signature);
  const computedBuffer = Buffer.from(computedSignature);

  if (signatureBuffer.length !== computedBuffer.length || 
      !crypto.timingSafeEqual(signatureBuffer, computedBuffer)) {
    return res.status(400).send('Invalid Webhook Signature');
  }

  next();
}
```
```

---

### Page 32: Webhook Event Types
* **Slug**: `webhooks/events`
* **Category**: `Webhooks`
* **Content**:
```markdown
SettleSettle delivers webhook events as a standard HTTP POST with a consistent JSON body shape. Here is the list of active events and their exact payload schemas.

### Common Payload Envelope
All webhook bodies contain the following envelope metadata:

| Field | Type | Description |
|---|---|---|
| `event` | string | The event classification, e.g., `churn.risk.detected` |
| `webhookId` | string | Unique registered webhook identifier |
| `appId` | string | The originating SettleSettle Application ID |
| `payload` | object | Event-specific data and properties |
| `createdAt` | string | ISO 8601 timestamp of event generation |

---

### 1. Churn Risk Detected (`churn.risk.detected`)
Fired instantly when the Predictive Churn AI detects that an end-user exhibits patterns matching critical customer churn parameters (Rule 3).

#### Event Payload Example
```json
{
  "event": "churn.risk.detected",
  "webhookId": "wh_1234567890",
  "appId": "app_987654321",
  "createdAt": "2026-05-18T07:00:00.000Z",
  "payload": {
    "userId": "user_abc123",
    "email": "customer@domain.com",
    "currentBalance": 0,
    "totalUsageCount": 42,
    "lastActiveAt": "2026-05-17T20:30:00.000Z",
    "daysSinceLastActive": 1,
    "predictedChurnRisk": "HIGH",
    "riskBreakdown": {
      "walletExhaustion": true,
      "insufficientCreditsFrequency": 3,
      "usageDropoffPercentage": 85.0
    }
  }
}
```
```

---

### Page 33: Handling Failures and Retries
* **Slug**: `webhooks/retries`
* **Category**: `Webhooks`
* **Content**:
```markdown
SettleSettle is designed for rock-solid reliability. We guarantee at-least-once delivery for webhook requests. If your server is offline or fails to respond with a successful HTTP status code, we retry delivery automatically.

### Delivery Timeouts and Status
Your endpoint must respond to a webhook POST request with a successful HTTP status code (**`2xx`**) within **`10 seconds`** to signify successful processing.

If your server returns any non-2xx status (e.g. `500`, `503`, `404`) or fails to respond within the 10-second timeout window, the delivery attempt is marked as failed.

### Automatic Retry Protocol
SettleSettle retries failed webhook deliveries up to **5 times** in total.

- **Attempt 1**: Sent immediately when the event occurs.
- **Attempt 2**: Sent after **`15 seconds`**
- **Attempt 3**: Sent after **`1 minute`**
- **Attempt 4**: Sent after **`5 minutes`**
- **Attempt 5**: Sent after **`15 minutes`**

If all 5 delivery attempts fail, the event is permanently recorded as failed. You can inspect the failure status codes, timestamps, and full response bodies at any time in the **Deliveries History** drawer within your App Settings panel.
```

---

### Page 34: How We Handle Your Data (NDPR)
* **Slug**: `security/data`
* **Category**: `Security & Compliance`
* **Content**:
```markdown
- SettleSettle is registered with the NDPC under NDPR
- All data stored on AWS Lagos region (af-south-1) — never leaves Nigeria
- Developer and user data never sold or shared with third parties
- Full data deletion available on request via support
```

---

### Page 35: How Keys Are Stored
* **Slug**: `security/keys`
* **Category**: `Security & Compliance`
* **Content**:
```markdown
### App API Keys
SHA-256 hashed before storage. We cannot retrieve the raw key — that's why it's only shown once. If you lose it, rotate it from the dashboard.

### Bank Account Numbers
Encrypted with AES-256-GCM. The encryption key is stored separately from the database. Even a full database compromise would not expose account numbers.

### Developer Passwords
Hashed with bcrypt (cost factor 12). Never stored in plaintext.
```

---

### Page 36: Subscriptions
* **Slug**: `sdk/subscriptions`
* **Category**: `SDK Reference`
* **Content**:
```markdown
Learn how to implement recurring billing, check feature access limits, and manage active customer subscription tiers securely via the official SDK.

### The Subscriptions Module

The SDK's `subscriptions` module exposes a suite of high-fidelity methods to check user states and verify access criteria instantly:

```typescript
import { settle } from '@/lib/settle'

// 1. Retrieve user's current subscription profile
const profile = await settle.subscriptions.getSubscription('user_998877')

console.log(profile.planName)   // e.g. "Growth Premium"
console.log(profile.isActive)   // true / false
console.log(profile.endsAt)     // Date object of next renewal
```

---

### Method Reference

#### 1. Check Feature Access
```typescript
const access = await settle.subscriptions.checkAccess('user_998877', 'feature_gpt4')

if (access.hasAccess) {
  // Allow customer to proceed!
} else {
  // Show premium billing modal or redirect
  console.log(access.reason) // e.g. "INACTIVE_SUBSCRIPTION"
}
```

#### 2. Activate a Subscription Plan
```typescript
const result = await settle.subscriptions.activate('user_998877', 'plan_growth_monthly')

console.log(result.status) // "active" | "trialing"
```

#### 3. Cancel an Active Subscription
```typescript
const result = await settle.subscriptions.cancel('user_998877')

console.log(result.message) // "Subscription cancelled at next period end"
```

---

### Access Check Reasons

When `checkAccess()` returns `hasAccess: false`, one of the following audit reasons will be provided:

| Reason Code | Explanation | Resolution |
|---|---|---|
| `NO_ACTIVE_SUBSCRIPTION` | The user has no subscription record. | Call `subscriptions.activate()` |
| `SUBSCRIPTION_EXPIRED` | The cycle end date has passed. | Direct user to standard Checkout |
| `INSUFFICIENT_CREDITS` | Debit checks failed due to zero query credits. | Trigger rewarded video ad or top-up |
| `FEATURE_RESTRICTED` | The plan does not support this feature ID. | Prompt plan upgrade wizard |

> [!TIP]
> **Automatic Renewal Runner**: Wallet-based subscriptions are audited and renewed automatically on interval by SettleSettle's background processor. You do not need to schedule periodic renewal checks.
```

---

### Page 37: VoiceShift AI (Voice AI Integration Example)
* **Slug**: `examples/changevoice`
* **Category**: `Example Integrations`
* **Content**:
```markdown
VoiceShift (ChangeVoice) is a stunning, high-fidelity AI video dubbing workspace built to showcase a complete real-world integration of the SettleSettle SDK. It manages idempotent user profile syncing, dynamic credits-based billing, multi-rail checkouts (Paystack + Solana), and rewarded ad fallbacks.

All billing rates, package sizes, and lookups are fetched dynamically from the SettleSettle cloud dashboard to ensure zero hardcoded values in the codebase.

[**View the Repository on GitHub →**](https://github.com/Ek0m/changevoice)

### Core Integration Blueprint

- **Dynamic Cost Resolution**: Costs are queried live from the active rules defined in your SettleSettle dashboard (e.g. charging 10 credits per minute of video processed).
- **Debit-Before-Processing (The Gatekeeper)**: Enforces credit validation *before* executing expensive AI dubbing GPU/CPU tasks. If the wallet drops below the threshold, the SDK throws `InsufficientCreditsError` (402).
- **Usage Tracking Telemetry**: Emits a non-blocking asynchronous usage event after successful execution, allowing zero-latency performance.
- **Flexible Refills**: Supports traditional card payments via Paystack and next-gen Solana Web3 USDC peer-to-peer transfers.

---

### Step-by-Step Integration Recipes

#### 1. Setup Singleton Client
Configure SettleSettle in a dedicated file (`lib/settle.ts`) to avoid duplicate connections in local Next.js HMR:
```typescript
import { SettleSettle } from 'settlesettle'

// 1. Declare 'settle' in the global scope so it's typed everywhere
declare global {
  var settle: SettleSettle;
}

// 2. Resolve singleton instance (preventing double instantiation in Next.js HMR development mode)
const settleInstance =
  globalThis.settle ||
  new SettleSettle({
    apiKey: process.env.SETTLESETTLE_API_KEY!,
    baseUrl: process.env.SETTLESETTLE_BASE_URL,
  })

// 3. Assign to globalThis so it is globally accessible directly as 'settle'
globalThis.settle = settleInstance

// 4. Export it for standard import patterns as well
export const settle = settleInstance
```

#### 2. Sync User Idempotently
Sync the logged-in user profile with SettleSettle's directory:
```typescript
// app/api/settle/sync-user/route.ts
import { settle } from '@/lib/settle'
import { NextResponse } from 'next/server'

export async function POST() {
  const user = await settle.users.sync({
    externalUserId: 'voiceshift_demo_user',
    email: 'demo@voiceshift.dev',
    name: 'Demo Creator',
  })
  return NextResponse.json({ ok: true, data: user })
}
```

#### 3. Debit-Before-Processing & Telemetry Metering
```typescript
// app/api/settle/dub/route.ts
import { settle } from '@/lib/settle'
import { InsufficientCreditsError } from 'settlesettle'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const userId = 'voiceshift_demo_user'
  
  try {
    const { videoUrl, language, durationMinutes } = await req.json()
    const duration = Math.ceil(Number(durationMinutes))

    // 1. Fetch live rules from bootstrap configuration
    const bootstrapData = await settle.billing.bootstrap(userId)
    const activeRules = bootstrapData.walletState?.activeRules || []
    
    // Find the rule for event billing
    const billingRule = activeRules.find(r => r.eventType === 'VIDEO_MINUTE_PROCESSED')
    const costPerMinute = billingRule ? billingRule.cost : 10
    const creditsRequired = duration * costPerMinute

    // 2. Enforce pre-debit check
    await settle.wallet.debit(userId, {
      amount: creditsRequired,
      description: `Dubbed ${duration} min video → ${language.toUpperCase()}`,
    })

    // 3. Process video dubbing (GPU/CPU action)
    const result = await processAIDubbing(videoUrl, language, durationMinutes)

    // 4. Emit non-blocking usage event
    settle.events.track({
      userId,
      eventType: 'VIDEO_MINUTE_PROCESSED',
      quantity: duration,
    })

    return NextResponse.json({ ok: true, data: result })

  } catch (error) {
    if (error instanceof InsufficientCreditsError) {
      return NextResponse.json({
        code: 'INSUFFICIENT_CREDITS',
        currentBalance: error.currentBalance,
      }, { status: 402 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

---

### Clone & Run Locally

To spin up VoiceShift locally:

1. Clone the repository and navigate inside:
```bash
git clone https://github.com/Ek0m/changevoice.git
cd changevoice
```

2. Install dependencies:
```bash
npm install
```

3. Configure your local environment in `.env.local`:
```env
SETTLESETTLE_API_KEY=ss_live_xxxxxxxxxxxxxxxxxxxxxxxx
SETTLESETTLE_BASE_URL=https://api.settlesettle.uno/v1
```

4. Run the Next.js development server:
```bash
npm run dev
```
```

---

### Page 38: DocuMind AI Suite (Document AI Integration Example)
* **Slug**: `examples/documind`
* **Category**: `Example Integrations`
* **Content**:
```markdown
DocuMind is a premium, open-source AI document toolkit built with Next.js 15+, Tailwind CSS 4, and the SettleSettle SDK. It serves as a flagship production blueprint for developers looking to implement usage-based billing, multi-rail checkouts (Paystack + Solana), and interactive ad monetization in their SaaS products.

[**View the Repository on GitHub →**](https://github.com/Ek0m/documind)

### Why is DocuMind unique?

- **One-Round-Trip Hydration**: Boosts UI performance by querying all user metadata, active credit packages, billing rules, and transaction history in one fast network request using `settle.billing.bootstrap()`.
- **Advanced Payment Redirects**: Dynamically injects a secure `callbackUrl` into checkout flows to seamlessly return the user back to the application homepage once their Paystack or Solana checkout completes.
- **Rewarded Ad Incentives**: Leverages native sponsored ad fallbacks, letting low-credit users restore their balances instantly by engaging with reward video ads.

---

### Implementation Highlights

#### 1. Ultra-Fast Dashboard Hydration
Query all user data, packages, active rules, and balance states at once to avoid multiple waterfall requests:
```typescript
// app/api/settle/bootstrap/route.ts
import { settle } from '@/lib/settle'
import { NextResponse } from 'next/server'

export async function GET() {
  const userId = 'demo-user-123'
  try {
    const bootstrapData = await settle.billing.bootstrap(userId)
    return NextResponse.json({ ok: true, data: bootstrapData })
  } catch (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }
}
```

#### 2. Multi-Rail Checkouts with Dynamic Redirection
Initialize dynamic billing links for Cards (Paystack) or Web3 SPL tokens (Solana), passing a secure return location that takes users back to the dashboard upon successful payment:
```typescript
// app/api/settle/topup/route.ts
import { settle } from '@/lib/settle'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const userId = 'demo-user-123'
  try {
    const { packageId, provider } = await req.json()

    // 1. Fetch available packages from bootstrap parameters
    const bootstrap = await settle.billing.bootstrap(userId)
    const selectedPkg = bootstrap.availablePackages.find(p => p.id === packageId)

    if (!selectedPkg) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 })
    }

    // 2. Construct return redirect callback URL
    const url = new URL(req.url)
    const callbackUrl = `${url.origin}/?success=true`

    // 3. Initialize checkout session
    const paymentSession = await settle.payments.initialize({
      endUserId: userId,
      email: 'user@documind.ai',
      amountKobo: selectedPkg.priceKobo,
      provider: provider === 'solana' ? 'solana' : 'paystack',
      callbackUrl,
      metadata: {
        packageId: selectedPkg.id,
        credits: selectedPkg.credits,
      },
    })

    return NextResponse.json({ ok: true, data: paymentSession })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

#### 3. Rewarded Video Ads Integration
Let users earn free credits instantly inside your workspace when their wallet balance reaches zero:
```typescript
// app/api/settle/ad-reward/route.ts
import { settle } from '@/lib/settle'
import { NextResponse } from 'next/server'

export async function POST() {
  const userId = 'demo-user-123'
  try {
    // Awards dynamic credits configured directly in the cloud dashboard
    const result = await settle.billing.rewardAd(userId)
    return NextResponse.json({ ok: true, data: result })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

---

### Clone & Run Locally

To spin up DocuMind locally:

1. Clone the repository and navigate inside:
```bash
git clone https://github.com/Ek0m/documind.git
cd documind
```

2. Install dependencies:
```bash
npm install
```

3. Configure your local environment in `.env.local`:
```env
SETTLESETTLE_API_KEY=your_api_key_here
```

4. Run the Next.js development server:
```bash
npm run dev
```
```

---

### Page 39: Global Payments & Currencies
* **Slug**: `guides/global-payments`
* **Category**: `Guides`
* **Content**:
```markdown
SettleSettle acts as a smart orchestration and dynamic ledger layer sitting directly on top of global fiat gateways and Web3 payment networks.

### Core Payment Rails

SettleSettle leverages multiple payment rails to deliver frictionless checkouts globally:

1. **Card & Bank Transfer (Fiat - Local & Global)**:
   - **Paystack (NGN)**: Best suited for local Naira transactions (fiat cards, bank transfers, USSD).
   - **Flutterwave (Non-NGN Fiat)**: Automatically routed for all non-NGN currencies (USD, GHS, KES, ZAR, etc.), allowing smooth global card processing and dynamic checkout initialization.
   - Integrates split payout logic that routes earnings automatically into your destination ledger.

2. **Web3 Native (Crypto - USDC / SOL)**:
   - Powered by Solana Devnet and Mainnet-Beta.
   - Zero-latency peer-to-peer settlement directly into developer wallets using standard SPL tokens.
   - Bypasses traditional banking hours, payment limits, and card disputes.

---

### Multi-Currency Framework

SettleSettle supports absolute isolation of pricing models across active currencies. By defining your target currency, our orchestration layer dynamically dispatches the transaction to the optimal provider gateway under the hood (e.g. NGN → Paystack, all other fiat currencies → Flutterwave).

- **NGN (Nigerian Naira)**: Tailored for local checkouts via bank transfers or cards.
- **Non-NGN Fiat (USD, GHS, etc.)**: Managed via Flutterwave globally.
- **USDC (USD Coin)**: Tailored for high-growth global platforms. Allows seamless Web3 checkouts using standard SPL tokens.

### Dynamic Payment Initialisation

To provision a secure checkout link regardless of the provider rail, call `settle.payments.initialize()` from your secure backend environment. SettleSettle dynamically selects the correct provider based on the specified currency:

```typescript
const session = await settle.payments.initialize({
  endUserId: "user_456",
  email: "customer@global.com",
  amountKobo: 250000, // ₦2,500, $25.00, or 25.00 USDC depending on currency parameters
  currency: "NGN", // "NGN" | "USD" | "USDC" | etc. (Defaults to App currency)
  provider: "paystack", // "paystack" | "solana" (Orchestrator dynamically swaps to Flutterwave for USD fiat)
  callbackUrl: "https://yourapp.com/dashboard/billing",
  metadata: {
    custom_tier: "enterprise_pro"
  }
})

// Redirect the end-user to complete payment securely
console.log(session.checkoutUrl)
```
```

---

### Page 40: Sandbox vs Production Mode
* **Slug**: `guides/sandbox-transition`
* **Category**: `Guides`
* **Content**:
```markdown
Testing and staging are critical for building reliable billing flows. SettleSettle operates a strict sandbox mechanism designed to isolate test simulations from production financials.

### Key Prefix Identification

Your active SettleSettle state is determined strictly by the prefix of the API Key you supply:

- **Sandbox Test Mode**: Key prefix starts with **`ss_test_`**. All transactions, checkouts, and micro-debits are simulated. No real currency is charged.
- **Production Live Mode**: Key prefix starts with **`ss_live_`**. Real-world payment gateways are initialized, real bank accounts are credited, and transactions represent binding value.

---

### Simulated Sandbox Checkout

When initializing checkouts with a Sandbox credential, the payment engine bypasses third-party provider gateways completely:
1. Records a local reference starting with **`ss_sandbox_...`**.
2. Dynamically generates a secure local sandbox checkout redirect URL:
   `http://localhost:3000/v1/payments/sandbox-checkout?reference=ss_sandbox_...`
3. Allows developers to simulate success and failure callback hooks without entering real credit card details, facilitating rapid local prototyping.

---

### SDK Sandbox Mismatch Warning

To protect your business from accidentally deploying test configurations to live users, the official SettleSettle SDK automatically runs background checks on startup.

If you load a sandbox test key (`ss_test_...`) while your host server is running in a production environment (`process.env.NODE_ENV === 'production'`), the SDK will print a warning to the console:

```text
⚠️ [SettleSettle SDK Warning]: Utilizing sandbox test key (ss_test_...) in production environment. Sandbox transactions will not charge real money.
```

---

### Go-Live Eligibility Checklist

Before SettleSettle will activate production live modes and provision your real `ss_live_` API key, your application must fulfill 4 platform-level checks. You can audit these anytime from your App Details page:

1. **App Description**: Ensure your app description is defined (between 10 and 500 characters) to describe your service to gateways.
2. **Business Category**: Assign an active market sector (e.g. AI, SaaS, Finance) under your settings panel.
3. **Active Webhook**: Configure at least one operational Webhook URL to securely capture live transaction alerts.
4. **Bank Account linked**: Connect a valid bank account or Solana wallet address to enable dynamic payment splits.
```

---

### Page 41: Automated Settlement & Payouts
* **Slug**: `guides/settlement-chron`
* **Category**: `Guides`
* **Content**:
```markdown
SettleSettle operates an automated, reliable settlement loop that ensures that your processed transaction earnings are routed to your local accounts without manual friction.

### T+1 Settlement Model (Pending Balance)

For fiat rails (Paystack and Flutterwave), SettleSettle implements a secure **T+1 Settlement Ledger** to prevent chargebacks and coordinate secure bank clearings:

1. **Transaction Split Allocation**:
   When a user makes a payment, SettleSettle immediately applies your predefined subaccount split parameters:
   - 96.5% of the processing volume is allocated to your developer ledger.
   - SettleSettle collects a 3.5% transaction commission fee.

2. **Pending Balance Credit**:
   Your 96.5% earnings are instantly credited to your developer balance under the **`pendingKobo`** ledger, keeping your dashboard logs in perfect synchronization.

3. **Background Payout Cron**:
   - The platform runs an automated payout scheduler every **24 hours**.
   - The cron sweeps your funds from **`pendingKobo` → `availableKobo`** exactly 1 day (T+1) after transaction confirmation.
   - It aggregates your total `availableKobo` earnings and automatically triggers a local bank clearing or SPL token transfer.

---

### Settlement Rails

- **Fiat Payouts**: Handled via secure local bank clearing networks. Payouts land directly in your connected Nigerian bank accounts in NGN.
- **Solana Web3 Payouts**: Submits an immediate SPL token transfer of USDC directly to your registered wallet address, bypassing standard bank holidays and traditional banking delays.
```

---

### Page 42: Central API Reference
* **Slug**: `sdk/reference-api`
* **Category**: `SDK Reference`
* **Content**:
```markdown
For developers building custom wrappers, non-Node backends, or microservices, SettleSettle provides a robust, RESTful REST endpoint grid.

### Base Endpoint

All raw REST queries flow securely through our global API gateway:
> **`https://settlesettle-api.onrender.com/v1`**

---

### Required Request Headers

Every request sent to our central edge must supply the following headers to pass request firewalls:

```http
Content-Type: application/json
X-API-Key: ss_live_your_active_application_key
```

If you are accessing developer-specific administrative endpoints (such as manual payouts or predictive AI leaderboards), you must instead pass a developer JWT token:

```http
Authorization: Bearer dev_jwt_token_here
```

---

### Key Central Endpoint Grid

| Method | REST Route | Access Level | Description |
|---|---|---|---|
| `POST` | `/payments/initialize` | App Key | Creates a dynamic checkout link and records reference nodes. |
| `GET` | `/payments/verify/:reference` | App Key | Queries gateway networks to audit the completion state of a transaction. |
| `GET` | `/wallet/:userId/balance` | App Key | Retrieves the active credit wallet parameters and balance of a synced user. |
| `POST` | `/wallet/:userId/debit` | App Key | Performs an atomic credit withdrawal from a user's wallet ledger. |
| `GET` | `/intelligence/apps/:appId/users/top-by-credits` | Dev JWT | Returns high-spend customer leaderboards for developer auditing. |
| `GET` | `/intelligence/apps/:appId/users/top-by-events` | Dev JWT | Returns usage-volume analysis logs representing top user telemetry. |
| `GET` | `/intelligence/apps/:appId/users/event-patterns` | Dev JWT | Synthesizes all global app events through Gemini to advice on pricing. |
| `GET` | `/intelligence/apps/:appId/users/:userId/full-profile` | Dev JWT | Fetches detailed unified user logs, wallet transactions, and recurring subscriptions. |

---

### Advanced AI & Telemetry Endpoints (Dev JWT Required)

#### 1. Top Users by Credits (`/intelligence/apps/:appId/users/top-by-credits`)
Returns a list of power users who have consumed the most financial credits. Useful for mapping high-value client segments.
* **Response Payload Shape**:
  ```json
  {
    "data": [
      {
        "userId": "user_123",
        "totalCreditsConsumed": 250000,
        "riskLevel": "healthy"
      }
    ]
  }
  ```

#### 2. Top Users by Events (`/intelligence/apps/:appId/users/top-by-events`)
Returns usage volume rankings to identify users with the highest telemetry activity (total events tracked, average daily frequency).

#### 3. Global AI Event Patterns (`/intelligence/apps/:appId/users/event-patterns`)
Leverages Gemini AI to process application telemetry streams and generate:
- **advice**: Strategic business pricing and packaging recommendations.
- **featuresSuggested**: Recommended expansion modules.
- **bottlenecksFound**: Potential friction points in payment flows.
- **anomaliesDetected**: Security or rate-limiting warnings.

#### 4. Unified Ledger User Profile (`/intelligence/apps/:appId/users/:userId/full-profile`)
Aggregates all telemetry, wallet micro-debits, active subscriptions, plans, and churn scores for a specific customer into a unified developer-facing record.
```

---

## 4. Prompt to copy and tell the Target Project IDE/AI Agent

Copy the block below and paste it into the IDE or AI Agent of your other project to guide it through building the docs:

```text
You are an expert developer building a high-fidelity documentation hub for SettleSettle.
Your goal is to build a documentation site using [Mintlify / Next.js Custom Router].
Here are the configuration specifications:
1. Navigation: Follow the sidebar JSON structure provided in the blueprint file. Group categories together cleanly.
2. Aesthetic Theme: The site must match a premium developer tool aesthetic. Use Inter and Outfit Google Fonts, a deep dark midnight background (#070B14), electric violet/emerald accent hues, thin border grids (#1F2937), and clean rounded panels.
3. Syntax Highlighting: Implement clean code block wrapping for typescript, javascript, json, and curl commands.
4. Custom Alert Boxes: Add support for special markdown blockquotes containing:
   - `> [!NOTE]` -> Render a blue container with Info icons.
   - `> [!WARNING]` or `> [!CAUTION]` -> Render an amber container with Alert icons.
5. Populated Content: Set up every route corresponding to the slugs inside the blueprint content dictionary, using the exact raw markdown code blocks. Ensure there are no empty placeholder sections.
```
