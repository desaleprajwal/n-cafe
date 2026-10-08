function OpeningStatus({ status, compact = false }) {
  const label = compact ? status.navbarLabel : status.heroLabel;
  const accessibleStatus = compact ? label : `${label}. ${status.detail}`;

  return (
    <div className={`opening-status${status.isOpen ? " is-open" : " is-closed"}${compact ? " is-compact" : ""}`} role="status" aria-label={accessibleStatus} title={accessibleStatus} aria-live="polite">
      <span className="opening-status-light" aria-hidden="true" />
      <span className="opening-status-copy">
        <strong>{label}</strong>
        {!compact && <><span className="opening-status-divider" aria-hidden="true" /><small>{status.detail}</small></>}
      </span>
    </div>
  );
}

export default OpeningStatus;
