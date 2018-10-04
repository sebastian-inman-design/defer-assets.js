/**
 * @name: defer-assets.js
 * @description Lightweight "vanilla" JavaScript file that defers the loading of CSS and JS assets in the DOM.
 * @author: Sebastian Inman (hello@sebastianinman.me)
 * @license MIT License (http://www.opensource.org/licenses/mit-license.php)
 */

const DeferAssets = () => {
  let stylesArray = [];
  let scriptsArray = [];

  let FindAssets = () => {
    /* Self initialization. */
    if (($self = document.getElementById("defer-assets"))) {
      /* Search for deferrable stylesheets. */
      if (($styles = document.getElementById("deferred-styles"))) {
        // Get the contents of the styles element.
        let stylesNode = $styles.textContent;
        // Create a temporary wrapper for the contents.
        let $wrapper = document.createElement("div");
        // Add the contents to the wrapper.
        $wrapper.innerHTML = stylesNode;
        // Fetch each style from the wrapper.
        stylesArray = Array.from($wrapper.children);
        // Remove the original element from the DOM.
        $styles.parentNode.removeChild($styles);
      }

      /* Search for deferrable scripts. */
      if (($scripts = document.getElementById("deferred-scripts"))) {
        // Get the contents of the scripts element.
        let scriptsNode = $scripts.textContent;
        // Create a temporary wrapper for the contents.
        let $wrapper = document.createElement("div");
        // Add the contents to the wrapper.
        $wrapper.innerHTML = scriptsNode;
        // Fetch each style from the wrapper.
        scriptsArray = Array.from($wrapper.children);
        // Remove the original element from the DOM.
        $scripts.parentNode.removeChild($scripts);
      }

      // Remove self from DOM. */
      $self.parentNode.removeChild($self);

      return InsertAssets();
    }
  };

  let InsertAssets = () => {
    // Insert deferred stylesheets.
    if (stylesArray.length && stylesArray.length > 0) {
      stylesArray.forEach(style => {
        // Create a new DOM element for each stylesheet.
        let $style = document.createElement("link");
        // Assign each attrivute to the new link element.
        Array.from(style.attributes).forEach(attr => {
          $style.setAttribute(attr.name, attr.value);
        });
        // Append the link to the DOM head.
        document.head.appendChild($style);
      });
    }

    // Insert deferred scripts.
    if (scriptsArray.length && scriptsArray.length > 0) {
      scriptsArray.forEach(script => {
        // Create a new DOM element for each script.
        let $script = document.createElement("script");
        // Assign each attrivute to the new script element.
        Array.from(script.attributes).forEach(attr => {
          $script.setAttribute(attr.name, attr.value);
        });
        // Append the style to the DOM body.
        document.body.appendChild($script);
      });
    }
  };

  return FindAssets();
};

/* Attempt to access the animationFrame function. */
let AnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

/* Load the deferrred assets either on the first animation frame or page load. */
if(AnimationFrame) AnimationFrame(() => { window.setTimeout(DeferAssets, 0); });
else window.addEventListener("load", DeferAssets);