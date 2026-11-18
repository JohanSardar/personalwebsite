type Props = {
  title: string;
  meta: string;
  sub?: string;
  body?: string;
  reason: string;
  sender: string;
  caption: React.ReactNode;
  fields: [string, React.ReactNode][];
};

/* The BOGO tab's Review card, drawn in HTML from the app's layout. */
export default function ReviewCard({ title, meta, sub, body, reason, sender, caption, fields }: Props) {
  return (
    <figure className="bd-phone-fig">
      <div className="bd-phone" aria-hidden="true">
        <div className="bd-phone-screen">
          <div className="bd-phone-status">
            <span>9:41</span>
            <span className="bd-phone-island" />
            <svg className="bd-phone-icons" viewBox="0 0 66 12" aria-hidden="true">
              <rect x="0" y="8" width="3" height="4" rx="0.8" />
              <rect x="4.5" y="6" width="3" height="6" rx="0.8" />
              <rect x="9" y="3.5" width="3" height="8.5" rx="0.8" />
              <rect x="13.5" y="1" width="3" height="11" rx="0.8" />
              <path d="M29 2.2a10 10 0 0 1 7.4 3.2l-1.3 1.3a8.2 8.2 0 0 0-12.2 0l-1.3-1.3A10 10 0 0 1 29 2.2Zm0 3.6a6.4 6.4 0 0 1 4.8 2.1l-1.3 1.3a4.6 4.6 0 0 0-7 0l-1.3-1.3A6.4 6.4 0 0 1 29 5.8Zm0 3.6c.9 0 1.7.4 2.3 1L29 12.7l-2.3-2.3c.6-.6 1.4-1 2.3-1Z" />
              <rect x="41.5" y="1" width="21" height="10.5" rx="3" fill="none" stroke="currentColor" strokeOpacity="0.4" />
              <rect x="43.3" y="2.8" width="15.5" height="6.9" rx="1.6" />
              <path d="M64 4.3v4a2 2 0 0 0 0-4Z" fillOpacity="0.45" />
            </svg>
          </div>
          <div className="bd-rc-top">
            <span className="bd-rc-round">‹</span>
            <span>Review request</span>
            <span className="bd-rc-round">···</span>
          </div>
          <p className="bd-rc-title">{title}</p>
          <p className="bd-rc-meta">{meta}</p>
          {sub && <p className="bd-rc-sub">{sub}</p>}
          {body && <div className="bd-rc-body">{body}</div>}
          <div className="bd-rc-rule" />
          <p className="bd-rc-label">Reason</p>
          <p className="bd-rc-reason">{reason}</p>
          <p className="bd-rc-fine">Not verified by BOGO</p>
          <p className="bd-rc-fine">{sender}</p>
          <div className="bd-rc-slide">
            <span className="bd-rc-knob">›</span>
            <span>Slide to approve</span>
          </div>
          <p className="bd-rc-deny">Deny</p>
        </div>
      </div>
      <figcaption>
        <p className="bd-fig-title">{caption}</p>
        <dl className="bd-fig-map">
          {fields.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </figcaption>
    </figure>
  );
}
