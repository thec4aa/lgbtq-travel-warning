//
//
//

const bannedWords = ["Uzbekistan", "Uganda", "Russia", "Florida"];

const bannerId = "travel-warning-banner";
let bannerInjected = false;

const createBanner = () => {
  if (bannerInjected) {
    console.log("travel-error: banner already injected");
    return;
  }

  // create hideModal() function in-page
  // FIXME this doesn't work on booking.com due to their content security policy
  // const script = document.createElement("script");
  // script.textContent = `
  //   function hideModal() {
  //     var modal = document.getElementById('myModal');
  //     modal.style.display = 'none';
  //   }
  // `;
  // document.body.appendChild(script);

  // inject our banner HTML by brute force
  console.log("creating banner...");
  document.body.innerHTML = bannerHTML + document.body.innerHTML;
  const modal = document.getElementById("myModal");
  modal.style.opacity = "1"; // activate fade in animation

  // const banner = document.createElement("div");
  // banner.id = bannerId;
  // banner.style.position = "fixed";
  // banner.style.width = "100%";
  // banner.style.height = "50px";
  // banner.style.backgroundColor = "red";
  // banner.style.color = "white";
  // banner.style.zIndex = "9999";
  // banner.style.textAlign = "center";
  // banner.style.paddingTop = "10px";
  // banner.style.fontSize = "20px";
  // banner.style.fontWeight = "bold";
  // banner.innerHTML = "WARNING: This is a warning banner.";
  // document.body.prepend(banner);

  bannerInjected = true;
};

const removeBanner = () => {
  const banner = document.getElementById(bannerId);
  if (banner) {
    banner.remove();
    bannerInjected = false;
  }
};

// const monitorInput = (input) => {
//   input.addEventListener("change", function () {
//     console.log("travel-warning: input value changed to: " + this.value);
//     if (checkTextForWords(this.value)) createBanner();
//   });
// };

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

function handleFormChange(ev) {
  // brute force check every input
  // if (checkInputsForWords()) createBanner();
  // else console.log("handleFormChange: no banned words found");

  // just check what changed
  console.log("handleFormChange", ev);
  if (ev.target) {
    console.log({
      value: ev?.target?.value,
      defaultValue: ev?.target?.defaultValue,
      innerText: ev?.target?.innerText,
    });
    if (
      checkTextForWords(ev.target.value) ||
      checkTextForWords(ev.target.defaultValue) ||
      checkTextForWords(ev.target.innerText)
    ) {
      console.log("TARGET HIT");
      createBanner();
    }
  }
  if (ev.relatedTarget) {
    console.log({
      value: ev.relatedTarget.value,
      defaultValue: ev.relatedTarget.defaultValue,
      innerText: ev.relatedTarget.innerText,
    });
    if (
      checkTextForWords(ev.relatedTarget.value) ||
      checkTextForWords(ev.relatedTarget.defaultValue) ||
      checkTextForWords(ev.relatedTarget.innerText)
    ) {
      console.log("RELATEDTARGET HIT");
      createBanner();
    }
  }
}

const monitorInputs = () => {
  const formElements = document.querySelectorAll("input, select, textarea");
  console.log("monitoring form inputs", formElements);
  formElements.forEach(function (element) {
    element.addEventListener("input", handleFormChange);
    element.addEventListener("change", handleFormChange);
    element.addEventListener("blur", handleFormChange);
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

console.log("travel-warning: content.js", window.location.hostname);
monitorInputs();
// monitorBody();

// test mode
// setTimeout(() => {
//   createBanner();
// }, 1000);

// if (window.location.hostname === "www.google.com") {
//   console.log("travel-warning: Google Flights");
//   const selector = "div[aria-placeholder='Where to?'] input";
//   const input = document.querySelector(selector);
//   // TODO annoyingly need to monitor for a hidden div that is appended after the input
//   // monitorInput(input);
// } else if (window.location.hostname.match(/booking\.com/)) {
//   console.log("travel-warning: Booking.com");
//   const selector = "input[name='ss']";
//   const input = document.querySelector(selector);
//   // monitorInput(input);
//   const check = checkBodyForWords();
//   console.log({ check });
// } else {
//   console.log("travel-warning: unsupported site", window.location);
// }

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
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  backdrop-filter: blur(3px);
}

/* Modal Content/Box */
.modal-content {
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

.modal-content .stars {
  margin: 0;
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

.red {
  color: red;
}

.orange {
  color: orange;
}

.yellow {
  color: yellow;
}

.green {
  color: green;
}

.blue {
  color: blue;
}

.indigo {
  color: purple;
}

.violet {
  color: pink;
}

.babyblue {
  color: #a1c9f2;
}
</style>

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=EB+Garamond">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans">

<div id="myModal" class="modal">
<!-- Modal content -->
<div class="modal-content">
  <span class="close">&times;</span>
  <div class="modal-content-text">
    <h1>LGBTQ+ Travel Alert! ⚠️</h1>
    <h2><span class="red">This region is not safe for travel</span></h2>

    <p>Loving someone should not a crime. Yet this region's discriminatory, anti-LGBTQ+ laws put travelers at risk. Do not travel here.

    <p><strong>This region's laws allow for one or more of the following:</strong></p>

    <ul>
      <li>Criminalization of homosexuality</li>
      <li>Torture of suspected LGBTQ people</li>
      <li>Criminalization of education about sexuality</li>
      <li>Criminalization of HIV status and/or testing</li>
    </ul>

    <p>Learn more at: <a href=https://BringLoveToUzbekistan.org>BringLoveToUzbekistan.org</a>
  </div>
</div>

</div>
`;
