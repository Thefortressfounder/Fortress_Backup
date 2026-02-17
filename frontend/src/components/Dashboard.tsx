export default function Dashboard() {
  // Distributor sovereign balance
  const distributorCvt = 50_000_000;
  const internalUsd = distributorCvt * 1; // CVT = 1.00 USD internally

  const formatNumber = (value: number) =>
    value.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const formatCurrency = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="text-xs tracking-[0.28em] text-[#7b8194] uppercase mb-1">
            System Core
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-[0.18em] text-[#f5e3c0] uppercase">
            Fortress Dashboard
          </h1>
          <p className="mt-2 text-sm text-[#9ca3b8] max-w-xl">
            Internal valuation, system status, and CVT sovereignty under the
            locked issuer account.
          </p>
        </div>
      </div>

      {/* Three-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-4">
          <section className="rounded-xl border border-[#1b1f2a] bg-[#050608]/80 p-4">
            <div className="text-[0.65rem] tracking-[0.26em] text-[#7b8194] uppercase mb-3">
              System Status
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-[#9ca3b8]">Issuer Account</span>
                <span className="text-[#4ade80] text-xs tracking-[0.18em] uppercase">
                  Locked & Immutable
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[#9ca3b8]">CVT Minting</span>
                <span className="text-[#f97373] text-xs tracking-[0.18em] uppercase">
                  Permanently Disabled
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[#9ca3b8]">Internal Valuation</span>
                <span className="text-[#cfa86b] text-xs tracking-[0.18em] uppercase">
                  1 CVT = 1.00 USD
                </span>
              </li>
            </ul>
          </section>

          <section className="rounded-xl border border-[#1b1f2a] bg-[#050608]/80 p-4">
            <div className="text-[0.65rem] tracking-[0.26em] text-[#7b8194] uppercase mb-3">
              Session
            </div>
            <p className="text-xs text-[#9ca3b8]">
              Founder session active. All values shown reflect internal
              protocol-truth inside The Fortress.
            </p>
          </section>
        </div>

        {/* CENTER COLUMN — CVT MODULE */}
        <div className="space-y-4">
          <section className="rounded-2xl border border-[#cfa86b]/40 bg-gradient-to-br from-[#0b0d12] via-[#050608] to-[#151823] p-5 shadow-[0_0_32px_rgba(0,0,0,0.85)]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[0.6rem] tracking-[0.3em] text-[#f5e3c0]/80 uppercase mb-1">
                  CVT Sovereign Balance
                </div>
                <div className="text-xs text-[#c4cadb]">
                  Distributor account under locked issuer authority.
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#cfa86b] to-[#8b5a24] flex items-center justify-center border border-[#f5e3c0]/60">
                <svg
                  viewBox="0 0 32 32"
                  className="h-5 w-5 text-[#050608]"
                  aria-hidden="true"
                >
                  <circle cx="16" cy="16" r="12" fill="currentColor" />
                  <path
                    d="M11 17.5L16 9l5 8.5-5 5-5-5z"
                    fill="#f5e3c0"
                  />
                </svg>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-xs tracking-[0.24em] text-[#9ca3b8] uppercase mb-1">
                Distributor CVT
              </div>
              <div className="text-3xl md:text-4xl font-semibold text-[#f5e3c0]">
                {formatNumber(distributorCvt)}{" "}
                <span className="text-base align-middle text-[#cfa86b] tracking-[0.24em] uppercase">
                  CVT
                </span>
              </div>
              <div className="mt-2 text-sm text-[#c4cadb]">
                Internal minimum valuation:{" "}
                <span className="text-[#f5e3c0] font-medium">
                  {formatCurrency(internalUsd)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs mt-3">
              <div className="rounded-lg border border-[#2b3242] bg-[#050608]/80 px-3 py-2">
                <div className="text-[0.6rem] tracking-[0.24em] text-[#7b8194] uppercase mb-1">
                  Issuer
                </div>
                <div className="text-[#c4cadb]">Locked & Immutable</div>
              </div>
              <div className="rounded-lg border border-[#2b3242] bg-[#050608]/80 px-3 py-2">
                <div className="text-[0.6rem] tracking-[0.24em] text-[#7b8194] uppercase mb-1">
                  Minting
                </div>
                <div className="text-[#f97373]">Permanently Disabled</div>
              </div>
              <div className="rounded-lg border border-[#2b3242] bg-[#050608]/80 px-3 py-2">
                <div className="text-[0.6rem] tracking-[0.24em] text-[#7b8194] uppercase mb-1">
                  Floor
                </div>
                <div className="text-[#cfa86b]">1 CVT = 1.00 USD (internal)</div>
              </div>
              <div className="rounded-lg border border-[#2b3242] bg-[#050608]/80 px-3 py-2">
                <div className="text-[0.6rem] tracking-[0.24em] text-[#7b8194] uppercase mb-1">
                  Scope
                </div>
                <div className="text-[#c4cadb]">Inside The Fortress only</div>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-[#1b1f2a] bg-[#050608]/80 p-4">
            <div className="text-[0.65rem] tracking-[0.26em] text-[#7b8194] uppercase mb-3">
              Portfolio Overview
            </div>
            <p className="text-xs text-[#9ca3b8]">
              Additional assets, external markets, and multi-chain balances will
              be surfaced here as the system expands.
            </p>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">
          <section className="rounded-xl border border-[#1b1f2a] bg-[#050608]/80 p-4">
            <div className="text-[0.65rem] tracking-[0.26em] text-[#7b8194] uppercase mb-3">
              Activity Feed
            </div>
            <p className="text-xs text-[#9ca3b8]">
              Recent CVT movements, system events, and administrative actions
              will appear here for auditability.
            </p>
          </section>

          <section className="rounded-xl border border-[#1b1f2a] bg-[#050608]/80 p-4">
            <div className="text-[0.65rem] tracking-[0.26em] text-[#7b8194] uppercase mb-3">
              Founder Notes
            </div>
            <p className="text-xs text-[#9ca3b8]">
              This space can evolve into a live Founder console: protocol
              switches, issuance views, and system decrees.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

