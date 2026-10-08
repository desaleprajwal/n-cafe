import { useState } from "react";
import { Check, Share2 } from "lucide-react";

function ShareButton() {
  const [message, setMessage] = useState("");

  const shareCafe = async () => {
    const shareData = {
      title: "N Café — Loni Budruk, Shirdi",
      text: "Explore N Café's menu, combos and food.",
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        if (error.name !== "AbortError") setMessage("Could not share the link.");
      }
      return;
    }
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(shareData.url);
      else throw new Error("Clipboard API unavailable");
      setMessage("Link copied");
      window.setTimeout(() => setMessage(""), 2400);
    } catch {
      let copied = false;
      let field;
      try {
        field = document.createElement("textarea");
        field.value = shareData.url;
        field.setAttribute("readonly", "");
        Object.assign(field.style, { position: "fixed", insetInlineStart: "-9999px", opacity: "0" });
        document.body.append(field);
        field.select();
        copied = document.execCommand("copy");
      } catch {
        copied = false;
      } finally {
        field?.remove();
      }
      setMessage(copied ? "Link copied" : "Could not copy the link.");
      if (copied) window.setTimeout(() => setMessage(""), 2400);
    }
  };

  return (
    <div className="share-action">
      <button className="contact-share button button-outline" type="button" onClick={shareCafe}><Share2 size={16} /> Share N Café</button>
      {message && <span className="share-feedback" role="status"><Check size={14} /> {message}</span>}
    </div>
  );
}

export default ShareButton;
