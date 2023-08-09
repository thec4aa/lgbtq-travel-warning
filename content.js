//
//
//

const bannedWords = [
  // Asia
  "Uzbekistan",
    "Uzbek",
    "Tashkent",
    "Samarkand",
    "Samarqand",
  "Russia",
    "Moscow",
    "Saint Petersburg",
    "St. Petersburg",
  "China",
    "Shanghai",
    "Beijing",
    "Guangzhou",
    "Shenzhen",
    "Chengdu",
    "Tianjin",
    "Chongqing",
    "Nanjing",
    "Wuhan",
    "Xi'an",
  // Middle east
  "Qatar",
  "Iran",
  "Saudi Arabia",
    "Riyadh",
    "Riad",
    "Jeddah",
    "Medina",
  "Kuwait",
  "Yemen",
  "Oman",
  // Africa
  "Algeria",
  "Cameroon",
  "Chad",
  "Ethiopia",
  "Eritria",
  "Mauritania",
  "Nigeria",
  "Somalia",
  "Uganda",
    "Kampala",
    "Entebbe",
  "Brunei",
  // North America
  "Jamaica",
  "Florida",
    "Miami",
    "Orlando",
    "Jacksonville, FL",
    "Jacksonville FL",
    "Tampa",
    "Port St. Lucie",
    "Cape Coral",
    "Tallahassee",
    "Fort Lauderdale"
];

const bannerId = "travel-alert-modal";
const closeButtonId = "travel-alert-modal-close";
let bannerInjected = false;

const createBanner = () => {
  if (bannerInjected) {
    console.log("travel-error: banner already injected");
    return;
  }

  console.log("creating banner...");
  bannerInjected = true;

  // slap in the HTML and force the browser to just figure it out
  // works but seems to introduce issues after we close our modal
  // document.body.innerHTML = bannerHTML + document.body.innerHTML;

  // try to inject a little more gently, using a cloned element
  const template = document.createElement("template");
  template.innerHTML = bannerHTML;
  const newElement = template.content.cloneNode(true);
  // document.body.prepend(banner);
  document.body.appendChild(newElement);

  // activate animation by turning up opacity
  const modal = document.getElementById(bannerId);
  modal.style.opacity = "1";

  // make our close button work, even with restricted content-security policies
  const el = document.getElementById(closeButtonId);
  el.addEventListener("click", function () {
    removeBanner();
  });
};

const removeBanner = () => {
  const banner = document.getElementById(bannerId);
  console.log("REMOVING BANNER", banner);
  if (banner) {
    banner.remove();
    bannerInjected = false;
  }
};

const checkTextForWords = (searchText) => {
  const regex = new RegExp(bannedWords.join("|"), "i");
  return regex.test(searchText);
};

function checkBodyForWords() {
  const bodyText = document.body.innerText;
  return checkTextForWords(bodyText);
}

function checkInputsForWords() {
  const inputs = document.querySelectorAll("input, textarea, select");
  for (let i = 0; i < inputs.length; i++) {
    if (checkTextForWords(inputs[i].value)) {
      console.log("checkInputsForWords: Found banned words in input =>", {
        input: inputs[i],
        value: inputs[i].value,
      });
      return true;
    }
  }
  return false;
}

function handleFormChangeWithName(name, ev) {
  console.log("travel-warning: handleFormChangeWithName", name);
  handleFormChange(ev);
}

function handleFormChange(ev) {
  console.log("travel-warning: handleFormChange", ev);
  if (ev.inputType == "deleteContentBackward") {
    console.log(
      "travel-warning: you're intelligently pressing backspace, ignoring..."
    );
    return;
  }

  if (ev.target) {
    if (
      checkTextForWords(ev.target.value) ||
      checkTextForWords(ev.target.defaultValue) ||
      checkTextForWords(ev.target.innerText)
    ) {
      console.log("travel-warning: bOoP BoOp TARGET HIT", {
        value: ev?.target?.value,
        defaultValue: ev?.target?.defaultValue,
        innerText: ev?.target?.innerText,
      });

      createBanner();
    }
  }
  if (ev.relatedTarget) {
    console.log();
    if (
      checkTextForWords(ev.relatedTarget.value) ||
      checkTextForWords(ev.relatedTarget.defaultValue) ||
      checkTextForWords(ev.relatedTarget.innerText)
    ) {
      console.log("travel-warning: oh SHI RELATEDTARGET HIT", {
        value: ev.relatedTarget.value,
        defaultValue: ev.relatedTarget.defaultValue,
        innerText: ev.relatedTarget.innerText,
      });
      createBanner();
    }
  }
}

const monitorInputs = () => {
  const formElements = document.querySelectorAll("input, select, textarea");
  console.log("travel-warning: monitoring form inputs...", formElements);
  formElements.forEach(function (element) {
    // avoid issues w/ accidentally double-binding same elements by tracking which ones we've bound to
    const attr = "data-travel-warning-bound";
    if (!element.hasAttribute(attr)) {
      element.setAttribute(attr, "true");
      // bind to input & blur to catch user input
      element.addEventListener("input", handleFormChange);
      element.addEventListener("blur", handleFormChange);
      // bind to change since apps often fill out the field if you click something
      element.addEventListener("change", handleFormChange);

      // element.addEventListener("input", (ev) => handleFormChangeWithName("input", ev));
      // element.addEventListener("change", (ev) => handleFormChangeWithName("change", ev));
      // element.addEventListener("blur", (ev) => handleFormChangeWithName("blur", ev));
    } else {
      console.log("travel-warning: not rebinding", element);
    }
  });
};

const monitorBody = () => {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (!node.innerText) return;
            const found = checkTextForWords(node.innerText);
            if (found) {
              createBanner();
            } else {
              console.log(
                "Did not find banned words in the updated HTML.",
                node.innerText
              );
            }
          }
        });
      }
    });
  });
  // Start observing the document with the configured parameters
  observer.observe(document, { childList: true, subtree: true });
};

console.log("travel-warning: content.js loaded", window.location.hostname);

// wait til page has sufficiently loaded to setup our event listeners
window.addEventListener("load", function () {
  console.log("travel-warning: load event fired, monitoring inputs...");
  monitorInputs();
  // monitorBody();
});

// test the banner
// setTimeout(() => {
//   createBanner();
// }, 1000);

const bannerHTML = `
<style>
@keyframes shake {
  0% { transform: translateX(0); }
  10% { transform: translateX(-10px); }
  20% { transform: translateX(10px); }
  30% { transform: translateX(-10px); }
  40% { transform: translateX(10px); }
  50% { transform: translateX(-10px); }
  60% { transform: translateX(10px); }
  70% { transform: translateX(-10px); }
  80% { transform: translateX(10px); }
  90% { transform: translateX(-10px); }
  100% { transform: translateX(0); }
}

/* The Modal (background) */
.modal {
  opacity: 0;
  position: fixed; /* Stay in place */
  z-index: 10001; /* Sit on top; Kaya uses modals w/ z = 10000 wtf */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  backdrop-filter: blur(2px);
}

/* Modal Content/Box */
.modal-content {
  animation: shake 1s;
  background-color: #fff;
  color: #0a314d;
  font-size: 22px;
  margin: 10% auto; /* 15% from the top and centered */
  padding: 30px;
  width: 80%; /* Could be more or less, depending on screen size */
}

.modal-content-text {
  margin: 5% 10% 5% 10%;
  padding-left: 5%;
  font-family: "Open Sans", Arial, Sans-Serif;
  font-size: 16px;
  line-height: 28px;
  letter-spacing: 0.05em;
  border-left: 10px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(
    180deg,
    red,
    orange,
    yellow,
    green,
    blue,
    purple
  );
}

.modal-content h1 {
  font-family: "EB Garamond", Times, Serif;
  font-weight: 400;
  padding: 0px;
  margin-top: 0.25em;
  font-size: 2.5em;
  line-height: 1em;
  animation-delay: 1s
  animation: blinker 0.5s linear 3;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}

.modal-content h2 {
  font-size: 14px;
  margin-bottom: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  line-height: 1.4;
  text-transform: uppercase;
}

.modal-content-text a {
  color: #0a314d;
  font-weight: bold;
  text-decoration: none;
  background: linear-gradient(90deg, red, orange, yellow, green, blue, purple);
  background-clip: text;
  -webkit-background-clip: text;
  letter-spacing: 0.1em;
}

.modal-content-text a:hover {
  color: transparent;
  transition: 500ms ease;
}
.modal-content-text .readmore {
  text-align: center;
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

</style>

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=EB+Garamond">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans">

<div id="${bannerId}" class="modal">
  <div class="modal-content">
    <span class="close" id="${closeButtonId}">&times;</span>
    <div class="modal-content-text">
    <h1>LGBTQ+ Travel Alert! ⚠️</h1>
    <h2><span class="red">❌ region not safe for travel ❌</span></h2>

        <p>Loving someone should never be a crime, yet discriminatory, anti-LGBTQ+ laws and practices in this region both endanger lives and put travelers at risk.
        <p><strong>This region's laws allow for one or more of the following:</strong></p>

        <ul>
          <li>Criminalization of homosexuality</li>
          <li>Torture of suspected LGBTQ+ individuals</li>
          <li>Criminalization of education about sexuality</li>
          <li>Criminalization of HIV status and/or testing</li>
          <li>Infringements on the rights of LGBTQ+ individuals</li>
        </ul>

        <p>Do not travel to, or spend money in, this region. Instead, choose somewhere fabulous.</p>
        <p class="readmore">Learn more at: <a href=https://LGBTQTravelAlert.org>LGBTQTravelAlert.org</a></p>
    </div>
  </div>
</div>
`;
