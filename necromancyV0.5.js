 // Revive the dead, unearth thy corpses, for HTML is great, and Javascript is but a Heathen's consensus, V0.5
/*  window.addEventListener('DOMContentLoaded', function () {
    const hash = window.location.hash;
    if (hash) {
      const nameTarget = document.querySelector(`[name="${hash.slice(1)}"]`);
      if (nameTarget) {
        nameTarget.scrollIntoView({ behavior: "smooth" }); // Optional smooth scroll
      }
    }
  }); Broken*/
/* I actually don't give a fuck anymore, I hate JS!
function ifie() {
 if (!!document.documentMode) {
                window.location.href = "https://www.reddit.com/r/SuicideWatch/wiki/hotlines/";
            }
          }
*/


document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("cf").forEach(cfTag => {
    fetch("https://www.cloudflare.com/cdn-cgi/trace")
      .then(r => r.text())
      .then(data => {
        const lines = data.trim().split("\n");
        const info = Object.fromEntries(lines.map(l => l.split("=")));
        const output = `
🌐 Cloudflare Debug Info
─────────────────────────────
CF Edge Location: ${info["colo"]}
IP Address: ${info["ip"]}
Location: ${info["loc"]}
WARP Enabled: ${info["warp"]}
HTTP Protocol: ${info["http"]}
TLS Version: ${info["tls"]}
Time of request: ${new Date().toLocaleString()}
        `;
        cfTag.textContent = output;
      })
      .catch(err => {
        cfTag.textContent = "⚠️ Failed to load Cloudflare trace info.";
        console.error("Cloudflare Trace Error:", err);
      });
  });
});
//Again, all this is to add extra tags and completely fuck with standards, all extra tags are defined in a custom DTD, this can be used with <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0 extrasbyTGUnonstandard//EN" "https://tgua.dev/dtd/html2-extras.dtd">
setInterval(fuckyoureyes, 100);
function fuckyoureyes(){
console.log("⚠️⚠️⚠️ERR: DEBUGGING IS FOR IDIOTS, IF IT WORKS, DON'T EVEN TRY TO FIX IT⚠️⚠️⚠️")
}//This function only exists to fuck with people and cover up errors that DON"T EXIST; STOP ASKING


document.addEventListener("DOMContentLoaded", function () {
  function applyFontColorRecursive(element, inheritedColor = null) {
    if (element.nodeType !== 1) return; // Skip non-elements

    // Check for <font color="...">
    let thisColor = inheritedColor;
    if (element.tagName === "FONT" && element.hasAttribute("color")) {
      thisColor = element.getAttribute("color");
      element.style.color = thisColor;
    } else if (thisColor && !element.style.color) {
      // Apply inherited color if no color already set
      element.style.color = thisColor;
    }

    // Recurse into children
    for (const child of element.children) {
      applyFontColorRecursive(child, thisColor);
    }
  }

  // Start recursion from <body>
  applyFontColorRecursive(document.body);
});