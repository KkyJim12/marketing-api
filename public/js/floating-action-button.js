const apiUrl = "http://localhost:8080";
const iconUrl = "http://localhost:3000";

const storeEvent = async (fabContentId, sessionRef) => {
  try {
    const response = await fetch(
      `${apiUrl}/api/v1/guest/products/store-event`,
      {
        headers: {
          requesthost: window.location.host,
          fabcontentid: fabContentId,
          sessionref: sessionRef,
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error.response);
  }
};

const generateSession = () => {
  const uuidv4 = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  };

  const getMinutesBetweenDates = (startDate, endDate) => {
    const diff = endDate - startDate;

    return diff / 60000;
  };

  if (
    !localStorage.getItem("fab-session-ref") ||
    getMinutesBetweenDates(
      new Date(),
      atob(localStorage.getItem("fab-session-ref")).split(".")[1]
    ) < 0
  ) {
    const now = new Date();
    const expireTime = now.setMinutes(now.getMinutes() + 30);
    const id = uuidv4();
    const sessionRef = btoa(id + "." + expireTime);
    localStorage.setItem("fab-session-ref", sessionRef);
  }
};

const generateButton = async (id) => {
  generateSession();
  try {
    // Get button details
    const response = await fetch(
      `${apiUrl}/api/v1/user/my-products/${id}/public-button`,
      {
        headers: {
          requesthost: window.location.host,
          exactreferer: window.document.referrer,
          sessionref: atob(localStorage.getItem("fab-session-ref")).split(
            "."
          )[0],
        },
      }
    );

    // Convert result to json
    const style = await response.json();

    // Get contents list
    const contacts = style.data.contents;

    // Init open content
    let isContentsOpened = false;

    // Manage icons
    const splitIcon = style.data.button.icon.split(" ");

    let prefixIcon;

    if (splitIcon[0] === "fas") {
      prefixIcon = "fa-solid";
    } else {
      prefixIcon = "fa-brands";
    }

    let iconValue = "fa-" + splitIcon[1];

    // Manage contents
    const contents = [];

    for (let i = 0; i < contacts.length; i++) {
      const contentSplitIcon = contacts[i].icon.split(" ");
      let contentPrefixIcon;

      if (contentSplitIcon[0] === "fas") {
        contentPrefixIcon = "fa-solid";
      } else {
        contentPrefixIcon = "fa-brands";
      }

      let contentIconValue = "fa-" + contentSplitIcon[1];

      contents.push(
        `<a onclick="storeEvent('${contacts[i].id}', '${
          atob(localStorage.getItem("fab-session-ref")).split(".")[0]
        }')" style="text-decoration:none !important; width:100% !important; display:flex !important; align-items: center; gap: 10px; color: ${
          contacts[i].textColor
        } !important;" href="${
          contacts[i].destination
        }" target="_blank"><span><iframe scrolling="no" width="20" height="20" style="border: 0px none; cursor:pointer; margin-top:auto; margin-bottom:auto;" src="${iconUrl}/icons/${contacts[i].icon
          .split(" ")
          .join("_")}/${contacts[i].textColor.slice(
          1
        )}/${style.data.button.bodyColor.slice(
          1
        )}/20"></iframe></span><span style="font-size:20px !important; font-weight:500 !important; margin-left:10 !important; cursor:pointer; margin-top:auto; margin-bottom:auto;"> ${
          contacts[i].textContent
        }</span> <iframe scrolling="no" width="20" height="20" style="border: 0px none; margin-left:auto;" src="${iconUrl}/icons/fas_angle-right/${contacts[
          i
        ].textColor.slice(1)}/${style.data.button.bodyColor.slice(
          1
        )}/20"></iframe></a>`
      );
    }

    // Create element
    const mainArea = document.createElement("div");
    const buttonContainer = document.createElement("div");
    const button = document.createElement("button");
    const mainContent = document.createElement("div");
    const innerDiv = document.createElement("div");
    const header = document.createElement("div");
    const contentLists = document.createElement("div");
    let textContainer;
    let buttonText;

    // Create text container for rounded button
    if (
      style.data.button.buttonStyle === "Rounded Button With Text" ||
      style.data.button.buttonStyle === "Long Rounded Button#1" ||
      style.data.button.buttonStyle === "Long Rounded Button#2"
    ) {
      textContainer = document.createElement("div");
      buttonText = document.createElement("h5");
    }

    for (let i = 0; i < contents.length; i++) {
      let newList = document.createElement("div");
      newList.innerHTML = contents[i];
      contentLists.appendChild(newList);
      newList.className = "fab-content-list";
    }

    if (
      style.data.button.buttonStyle === "Rounded Button" ||
      style.data.button.buttonStyle === "Rounded Button With Text" ||
      style.data.button.buttonStyle === "Long Rounded Button#1"
    ) {
      button.innerHTML =
        style.data.button.iconType === "font-awesome"
          ? `<iframe id="logo-iframe" scrolling="no" width="35" height="35" style="border: 0px none; cursor:pointer; margin-top:auto; margin-bottom:auto;" src="${iconUrl}/icons/${style.data.button.icon
              .split(" ")
              .join("_")}/${style.data.button.textColor.slice(
              1
            )}/${style.data.button.backgroundColor.slice(1)}/35"></iframe>`
          : `<img id="fab-img" src="${style.data.button.icon}" alt="logo" />`;
    }

    header.innerHTML = style.data.button.textContent;

    if (
      style.data.button.buttonStyle === "Rounded Button With Text" ||
      style.data.button.buttonStyle === "Long Rounded Button#1" ||
      style.data.button.buttonStyle === "Long Rounded Button#2"
    ) {
      buttonText.innerHTML = style.data.button.textContent;
      buttonText.className = "fab-content-text";
    }

    document.body.appendChild(mainArea);

    mainArea.appendChild(buttonContainer);

    if (style.data.button.left) {
      buttonContainer.appendChild(button);
    }

    if (style.data.button.buttonStyle === "Rounded Button With Text") {
      buttonContainer.appendChild(textContainer);
      textContainer.appendChild(buttonText);
    }

    if (style.data.button.buttonStyle === "Long Rounded Button#1") {
      button.appendChild(buttonText);
      buttonText.style.color = style.data.button.textColor;
    }

    if (style.data.button.buttonStyle === "Long Rounded Button#2") {
      const logoContainer = document.createElement("div");
      button.appendChild(buttonText);
      logoContainer.innerHTML =
        style.data.button.iconType === "font-awesome"
          ? `<iframe id="logo-iframe" scrolling="no" width="35" height="35" style="border: 0px none; cursor:pointer; margin-top:auto; margin-bottom:auto;" src="${iconUrl}/icons/${style.data.button.icon
              .split(" ")
              .join("_")}/${style.data.button.textColor.slice(
              1
            )}/${style.data.button.backgroundColor.slice(1)}/35"></iframe>`
          : `<img src="${style.data.button.icon}" alt="logo" />`;
      button.appendChild(logoContainer);
      logoContainer.id = "logo-container";
      logoContainer.style.background = style.data.button.backgroundColor;
      logoContainer.style.width = style.data.button.size * 0.9 + "px";
      logoContainer.style.height = style.data.button.size * 0.9 + "px";
    }

    if (style.data.button.right) {
      buttonContainer.appendChild(button);
    }
    mainContent.appendChild(innerDiv);
    innerDiv.appendChild(header);
    innerDiv.appendChild(contentLists);

    mainArea.id = "fab-main-area";

    mainArea.style.width = style.data.button.size + "px";
    mainArea.style.height = style.data.button.size + "px";

    if (style.data.button.top) {
      mainArea.style.top = style.data.button.top + "px";
    }

    if (style.data.button.right) {
      mainArea.style.right = style.data.button.right + "px";
    }

    if (style.data.button.bottom) {
      mainArea.style.bottom = style.data.button.bottom + "px";
    }

    if (style.data.button.left) {
      mainArea.style.left = style.data.button.left + "px";
    }

    buttonContainer.id = "fab-button-container";

    if (style.data.button.right) {
      buttonContainer.style.float = "right";
    } else {
      buttonContainer.style.float = "left";
    }

    if (style.data.button.buttonStyle === "Rounded Button With Text") {
      textContainer.id = "fab-text-container";
    }

    if (
      style.data.button.buttonStyle === "Rounded Button" ||
      style.data.button.buttonStyle === "Rounded Button With Text"
    ) {
      button.id = "fab-button";
      button.style.width = style.data.button.size + "px";
      button.style.height = style.data.button.size + "px";
    }

    if (style.data.button.buttonStyle === "Long Rounded Button#1") {
      button.id = "fab-button-long-1";
      button.style.height = style.data.button.size + "px";
    }

    if (style.data.button.buttonStyle === "Long Rounded Button#2") {
      button.id = "fab-button-long-2";
      button.style.height = style.data.button.size + "px";
    }

    button.style.backgroundColor = style.data.button.backgroundColor;
    button.style.color = style.data.button.textColor;

    mainContent.style.position = "relative";

    if (style.data.button.top) {
      mainContent.style.top = 90 + "px";
    }
    if (style.data.button.right) {
      mainContent.style.right = "280px";
    }
    if (style.data.button.bottom) {
      mainContent.style.bottom = 75 + contacts.length * 75 + "px";
    }
    if (style.data.button.left) {
      mainContent.style.left = "10px";
    }

    // Inner Div styles
    innerDiv.id = "fab-inner-div";

    header.style.backgroundColor = style.data.button.backgroundColor;
    header.style.color = style.data.button.textColor;

    header.id = "fab-header";
    contentLists.style.minHeight = 65 * contacts.length;
    contentLists.style.background = style.data.button.bodyColor;
    contentLists.id = "fab-content-lists";

    const pluginButton =
      style.data.button.buttonStyle === "Rounded Button" ||
      style.data.button.buttonStyle === "Rounded Button With Text"
        ? document.getElementById("fab-button")
        : style.data.button.buttonStyle === "Long Rounded Button#1"
        ? document.getElementById("fab-button-long-1")
        : document.getElementById("fab-button-long-2");

    pluginButton.addEventListener("click", (event) => {
      if (isContentsOpened === false) {
        mainArea.appendChild(mainContent);
        mainContent.id = "pluginButtonContents";
        isContentsOpened = true;
      } else {
        mainArea.removeChild(mainContent);
        isContentsOpened = false;
      }
    });

    const logoIframe = document.getElementById("logo-iframe");
    logoIframe.addEventListener("click", (event) => {
      if (isContentsOpened === false) {
        mainArea.appendChild(mainContent);
        mainContent.id = "pluginButtonContents";
        isContentsOpened = true;
      } else {
        mainArea.removeChild(mainContent);
        isContentsOpened = false;
      }
    });
  } catch (error) {
    console.log("Website is not match button qualifications.");
  }
};
