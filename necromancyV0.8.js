 // Revive the dead, unearth thy corpses, for HTML is great, and Javascript is but a Heathen's consensus, V0.8
window.addEventListener('DOMContentLoaded', function () {
nameatribnecromancy();

/* I actually don't give a fuck anymore, I hate JS!*/
injectcjscript();
cffuckery();

//Again, all this is to add extra tags and completely fuck with standards, all extra tags are defined in a custom DTD, this can be used with <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0 extrasbyTGUnonstandard//EN" "https://tgua.dev/dtd/html2-extras.dtd">

setInterval(fuckyoureyes, 500);

  // Start recursion from <body>
  applyFontColorRecursive(document.body);
  applyFontFaceRecursive(document.body);
  applyFontSizeRecursive(document.body);
  plaintextnecromancy();

  // Wait until CheerpJ runtime loads
  cheerpjInit().then(() => {
      appletnecromancy();
    });

});








//Shit below is outside DOMloaded, this is all functions and shit that aren't executed without being called
function ifie() {
 if (!!document.documentMode) {
                window.location.href = "https://tgua.dev/help";
            }//redirect to legacy page(Uses old tags and bright color scheme, hence name)
          }

    function appletnecromancy(){
      const applets = document.getElementsByTagName('applet');
      let idCounter = 1;

      for (let i = 0; i < applets.length; i++) {
        const applet = applets[i];
        const code = applet.getAttribute('code');
        const width = parseInt(applet.getAttribute('width')) || 300;
        const height = parseInt(applet.getAttribute('height')) || 150;

        if (!code) continue;

        const uniqueId = `CheerpJapplet${idCounter++}`;
        const container = document.createElement('div');
        container.id = uniqueId;
        container.className = 'cheerpj-applet-container';

        // Insert new container before the <applet>, then remove the <applet>
        applet.parentNode.insertBefore(container, applet);
        applet.remove();

        // Run the applet with CheerpJ
        cjRunApplet(code.replace(/\.class$/, ''), {
          width,
          height,
          archive: null,
          codebase: '.', // assumes .class files are in the same folder
          params: {},
          container: container
        });
      };
          };

function plaintextnecromancy(){
  const plaintexts = document.querySelectorAll('plaintext');
  plaintexts.forEach((el, idx) => {
    // Get the "plaintext" content as raw text.
    // Since <plaintext> consumes all remaining HTML in old browsers,
    // here we grab its innerHTML or innerText as the source text.
    // The problem: modern browsers do parse it as a normal tag, so innerHTML is empty.
    // We'll have to get all sibling nodes after <plaintext> and serialize them.

    // Grab all sibling nodes after the <plaintext> tag
    const siblingNodes = [];
    let next = el.nextSibling;
    while (next) {
      siblingNodes.push(next);
      next = next.nextSibling;
    }

    // Serialize all those nodes to raw HTML text (unparsed)
    let rawText = '';
    siblingNodes.forEach(node => {
      if (node.outerHTML) rawText += node.outerHTML;
      else if (node.textContent) rawText += node.textContent;
    });

    // Remove all siblings after <plaintext> since they are now "inside" plaintext
    siblingNodes.forEach(node => node.parentNode.removeChild(node));

    // Optionally remove the <plaintext> tag itself, or keep as a placeholder
    el.parentNode.removeChild(el);

    // Create an iframe to hold the raw text as plain content
    const iframe = document.createElement('iframe');

    // Style iframe (optional)
    iframe.style.width = '100%';
    iframe.style.border = 'none';
    iframe.style.height = 'auto';
    iframe.style.minHeight = '100px';
    iframe.style.fontFamily = 'monospace, monospace';
    iframe.style.backgroundColor = '#f9f9f9';

    // Create a data URL with escaped rawText inside a <pre> tag for whitespace preservation
    const encodedText = encodeURIComponent(rawText);

    const srcDoc = `
      <html>
        <head>
          <style>body{margin:0;white-space:pre; font-family: monospace; background: #f9f9f9;}</style>
        </head>
        <body>${rawText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</body>
      </html>`;

    iframe.srcdoc = srcDoc;

    // Insert the iframe where <plaintext> was
    document.body.appendChild(iframe);


    iframe.onload = () => {
      try {
        const iframeBody = iframe.contentDocument.body;
        iframe.style.height = iframeBody.scrollHeight + 20 + 'px';
      } catch (e) {
        iframe.style.height = '200px';
      }
    };
  });
};
  function mapFontSize(sizeAttr) {
    // Legacy font sizes: 1 (smallest) to 7 (largest)
    // Base size (3) maps to 16px typically, so we follow:
    const base = 16;
    const scale = [8, 10, 13, 16, 18, 24, 32]; // Sizes for 1–7

    let n = parseInt(sizeAttr, 10);
    if (isNaN(n)) return null;
    n = Math.max(1, Math.min(7, n)); // Clamp to 1–7
    return scale[n - 1] + "px";
  }
  function applyFontSizeRecursive(element, inheritedSize = null) {
    if (element.nodeType !== 1) return;

    let thisSize = inheritedSize;
    if (element.tagName === "FONT" && element.hasAttribute("size")) {
      const mapped = mapFontSize(element.getAttribute("size"));
      if (mapped) {
        thisSize = mapped;
        element.style.fontSize = thisSize;
      }
    } else if (thisSize && !element.style.fontSize) {
      element.style.fontSize = thisSize;
    }

    for (const child of element.children) {
      applyFontSizeRecursive(child, thisSize);
    }
  }

    function applyFontFaceRecursive(element, inheritedFace = null) {
    if (element.nodeType !== 1) return; // Skip non-elements

    // Check for <font face="...">
    let thisFace = inheritedFace;
    if (element.tagName === "FONT" && element.hasAttribute("face")) {
      thisFace = element.getAttribute("face");
      element.style.fontFamily = thisFace;
    } else if (thisFace && !element.style.fontFamily) {
      element.style.fontFamily = thisFace;
    }

    // Recurse into children
    for (const child of element.children) {
      applyFontFaceRecursive(child, thisFace);
    }
  }
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
  function fuckyoureyes(){
console.log("⚠️⚠️⚠️ERR: DEBUGGING IS FOR IDIOTS, IF IT WORKS, DON'T EVEN TRY TO FIX IT⚠️⚠️⚠️")
}//This function only exists to fuck with people and cover up errors that DON"T EXIST; STOP ASKING
function injectcjscript(){
  const script = document.createElement('script');
      script.src = 'https://cjrtnc.leaningtech.com/4.1/loader.js';
      document.head.appendChild(script);
    };
    function cffuckery(){
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
    }


    function nameatribnecromancy(){
    const hash = window.location.hash;
    if (hash) {
      const nameTarget = document.querySelector(`[name="${hash.slice(1)}"]`);
      if (nameTarget) {
        nameTarget.scrollIntoView({ behavior: "smooth" }); // Optional smooth scroll
      }
    }
    }