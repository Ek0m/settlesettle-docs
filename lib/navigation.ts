export interface NavPage {
  title: string
  slug: string
}

export interface NavSubgroup {
  group: string
  pages: NavPage[]
}

export interface NavGroup {
  group: string
  pages: (NavPage | NavSubgroup)[]
}

export const navigationData: NavGroup[] = [
  {
    group: "Getting Started",
    pages: [
      { title: "What is SettleSettle?", slug: "" },
      { title: "How SettleSettle Works", slug: "how-it-works" },
      { title: "Quick Start (5 minutes)", slug: "quickstart" },
      { title: "Core Concepts", slug: "concepts" }
    ]
  },
  {
    group: "SDK Reference",
    pages: [
      { title: "Installation", slug: "sdk/installation" },
      { title: "Initialization & Configuration", slug: "sdk/initialization" },
      { title: "Functions Quick Reference", slug: "sdk/functions" },
      {
        group: "Users (Directory Sync)",
        pages: [
          { title: "Sync User Profile", slug: "sdk/users/sync" }
        ]
      },
      {
        group: "Payments",
        pages: [
          { title: "Initialize a Payment", slug: "sdk/payments/initialize" },
          { title: "Verify a Payment", slug: "sdk/payments/verify" }
        ]
      },
      {
        group: "Wallet",
        pages: [
          { title: "Get Balance", slug: "sdk/wallet/balance" },
          { title: "Add Credits", slug: "sdk/wallet/credit" },
          { title: "Deduct Credits", slug: "sdk/wallet/debit" },
          { title: "Record Ad Reward", slug: "sdk/wallet/ad-reward" },
          { title: "Transaction History", slug: "sdk/wallet/history" }
        ]
      },
      {
        group: "Billing Configuration",
        pages: [
          { title: "Bootstrap Config", "slug": "sdk/billing/bootstrap" },
          { title: "Inline Ad Reward", "slug": "sdk/billing/reward-ad" }
        ]
      },
      {
        group: "Events (Usage Metering)",
        pages: [
          { title: "Track an Event", slug: "sdk/events/track" },
          { title: "Get Usage Summary", slug: "sdk/events/summary" }
        ]
      },
      { title: "Authentication", slug: "sdk/auth" },
      { title: "Subscriptions", slug: "sdk/subscriptions" },
      { title: "Error Handling", slug: "sdk/errors" },
      { title: "Graceful Shutdown", slug: "sdk/shutdown" },
      { title: "Central API Reference", slug: "sdk/reference-api" }
    ]
  },
  {
    group: "Guides",
    pages: [
      { title: "Setting Up Your First App", slug: "guides/first-app" },
      { title: "Tracking Usage in Next.js", slug: "guides/nextjs" },
      { title: "Tracking Usage in React Native", slug: "guides/react-native" },
      { title: "Building a Credit Wallet", slug: "guides/credit-wallet" },
      { title: "Charging Users Based on Usage", slug: "guides/usage-billing" },
      { title: "Setting Up Bank Payouts", slug: "guides/bank-payouts" },
      { title: "Graceful Shutdown & Event Flushing", slug: "guides/shutdown" },
      { title: "Global Payments & Currencies", slug: "guides/global-payments" },
      { title: "Sandbox vs Production Mode", slug: "guides/sandbox-transition" },
      { title: "Automated Settlement & Payouts", slug: "guides/settlement-chron" }
    ]
  },
  {
    group: "Example Integrations",
    pages: [
      { title: "VoiceShift (Voice AI)", slug: "examples/changevoice" },
      { title: "DocuMind (Document AI)", slug: "examples/documind" }
    ]
  },
  {
    group: "Webhooks",
    pages: [
      { title: "Overview", slug: "webhooks" },
      { title: "Verifying Webhook Signatures", slug: "webhooks/verification" },
      { title: "Webhook Event Types", slug: "webhooks/events" },
      { title: "Handling Failures and Retries", slug: "webhooks/retries" }
    ]
  },
  {
    group: "Security & Compliance",
    pages: [
      { title: "How We Handle Your Data (NDPR)", slug: "security/data" },
      { title: "How Keys Are Stored", slug: "security/keys" }
    ]
  }
]
