const apiUrl = "http://localhost:8080";
const iconUrl = "http://localhost:3000";

const getDomain = (url, subdomain) => {
  subdomain = subdomain || false;

  url = url.replace(/(https?:\/\/)?(www.)?/i, "");

  if (!subdomain) {
    url = url.split(".");

    url = url.slice(url.length - 2).join(".");
  }

  if (url.indexOf("/") !== -1) {
    return url.split("/")[0];
  }

  return url;
};

const storeEvent = async (fabContentId, sessionRef) => {
  try {
    const response = await fetch(
      `${apiUrl}/api/v1/guest/products/store-event`,
      {
        headers: {
          requesthost: getDomain(window.location.hostname),
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
          requesthost: window.location.hostname,
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
    } else if (splitIcon[0] === "far") {
      prefixIcon = "fa-regular";
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
      } else if (splitIcon[0] === "far") {
        prefixIcon = "fa-regular";
      } else {
        contentPrefixIcon = "fa-brands";
      }

      let contentIconValue = "fa-" + contentSplitIcon[1];

      contents.push(
        `<a class="${contacts[i].class}" onclick="storeEvent('${
          contacts[i].id
        }', '${
          atob(localStorage.getItem("fab-session-ref")).split(".")[0]
        }')" style="text-decoration:none !important; width:100% !important; display:flex !important; align-items: center; gap: 10px; color: ${
          contacts[i].textColor
        } !important;" href="${
          contacts[i].destination
        }" target="_blank"><span style="display:flex; align-items: center;"><div style="width:24px; height:24px; cursor:pointer; z-index:9999;background:transparent; position:absolute;"></div><iframe scrolling="no" width="24" height="24" style="z-index:1111;border: 0px none; cursor:pointer; margin-top:auto; margin-bottom:auto;" src="${iconUrl}/icons/${contacts[
          i
        ].icon
          .split(" ")
          .join("_")}/${contacts[i].textColor.slice(
          1
        )}/${style.data.button.bodyColor.slice(
          1
        )}/24"></iframe></span><span style="color:#343a40; display:flex; font-size:18px !important; font-weight:500 !important; margin-left:10 !important; cursor:pointer; margin-top:auto; margin-bottom:auto;"> <p>${
          contacts[i].textContent
        } <p style="font-size:12px; font-weight:400; color: rgb(107 114 128); margin-top:auto; margin-bottom:auto; margin-left:15px;">${
          contacts[i].description
        }</p></span> <div style="width:24px; height:24px; cursor:pointer; z-index:9999;right:25px;background:transparent; position:absolute;"></div>
        <iframe scrolling="no" width="24" height="24" style="z-index:1111;border: 0px none; margin-left:auto;" src="${iconUrl}/icons/fas_angle-right/343a40/${style.data.button.bodyColor.slice(
          1
        )}/24"></iframe></a>`
      );
    }

    // Create element
    const mainArea = document.createElement("div");
    const buttonContainer = document.createElement("div");
    const button = document.createElement("button");
    const buttonCover = document.createElement("div");
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
      newList.className = "fab-content-list-65150cd97e5e7";
    }

    if (
      style.data.button.buttonStyle === "Rounded Button" ||
      style.data.button.buttonStyle === "Rounded Button With Text" ||
      style.data.button.buttonStyle === "Long Rounded Button#1"
    ) {
      button.innerHTML =
        style.data.button.iconType === "font-awesome"
          ? `<div style="width:${
              style.data.button.buttonStyle === "Long Rounded Button#1"
                ? style.data.button.size / 2.5
                : style.data.button.size / 2
            }px; height:${
              style.data.button.buttonStyle === "Long Rounded Button#1"
                ? style.data.button.size / 2.5
                : style.data.button.size / 2
            }px; cursor:pointer; z-index:9999;background:transparent; position:absolute;"></div><iframe id="logo-iframe" scrolling="no" width="${
              style.data.button.buttonStyle === "Long Rounded Button#1"
                ? style.data.button.size / 2.5
                : style.data.button.size / 2
            }" height="${
              style.data.button.buttonStyle === "Long Rounded Button#1"
                ? style.data.button.size / 2.5
                : style.data.button.size / 2
            }" style="z-index:1111; border: 0px none; cursor:pointer; margin-top:auto; margin-bottom:auto;" src="${iconUrl}/icons/${style.data.button.icon
              .split(" ")
              .join("_")}/${style.data.button.textColor.slice(
              1
            )}/${style.data.button.backgroundColor.slice(1)}/${
              style.data.button.buttonStyle === "Long Rounded Button#1"
                ? style.data.button.size / 2.5
                : style.data.button.size / 2
            }"></iframe>`
          : `<img id="fab-img-65150cd97e5e7" style="width:${
              style.data.button.buttonStyle === "Long Rounded Button#1"
                ? style.data.button.size / 2.5
                : style.data.button.size / 2
            }px; height:${style.data.button.size / 2}px;" src="${
              style.data.button.icon
            }" alt="logo" />`;
    }

    header.innerHTML = style.data.button.textContent;

    if (
      style.data.button.buttonStyle === "Rounded Button With Text" ||
      style.data.button.buttonStyle === "Long Rounded Button#1" ||
      style.data.button.buttonStyle === "Long Rounded Button#2"
    ) {
      buttonText.innerHTML = style.data.button.textContent;
      buttonText.className = "fab-content-text-65150cd97e5e7";
    }

    document.body.appendChild(mainArea);

    mainArea.appendChild(buttonContainer);

    if (style.data.button.left) {
      buttonContainer.appendChild(button);
      buttonContainer.appendChild(buttonCover);
    }

    if (style.data.button.buttonStyle === "Rounded Button With Text") {
      buttonContainer.appendChild(textContainer);
      buttonContainer.appendChild(buttonCover);
      textContainer.appendChild(buttonText);
    }

    if (style.data.button.buttonStyle === "Long Rounded Button#1") {
      button.appendChild(buttonText);
      buttonContainer.appendChild(buttonCover);
      buttonText.style.color = style.data.button.textColor;
      buttonText.style.fontSize = style.data.button.size / 3.5 + "px";
    }

    if (style.data.button.buttonStyle === "Long Rounded Button#2") {
      const logoContainer = document.createElement("div");
      button.appendChild(buttonText);
      logoContainer.innerHTML =
        style.data.button.iconType === "font-awesome"
          ? `<iframe id="logo-iframe" scrolling="no" width="${
              style.data.button.size / 2.5
            }" height="${
              style.data.button.size / 2.5
            }" style="border: 0px none; cursor:pointer; margin-top:auto; margin-bottom:auto;" src="${iconUrl}/icons/${style.data.button.icon
              .split(" ")
              .join("_")}/${style.data.button.textColor.slice(
              1
            )}/${style.data.button.backgroundColor.slice(1)}/${
              style.data.button.size / 2.5
            }"></iframe>`
          : `<img src="${style.data.button.icon}" alt="logo" />`;
      button.appendChild(logoContainer);
      logoContainer.id = "logo-container-65150cd97e5e7";
      logoContainer.style.background = style.data.button.backgroundColor;
      logoContainer.style.width = (style.data.button.size - 10) * 0.95 + "px";
      logoContainer.style.height = (style.data.button.size - 10) * 0.95 + "px";
      const logoCover = document.createElement("div");
      logoCover.style.position = "absolute";
      logoCover.style.background = "transparent";
      logoCover.style.width = (style.data.button.size - 10) * 0.95 + "px";
      logoCover.style.height = (style.data.button.size - 10) * 0.95 + "px";
      logoContainer.appendChild(logoCover);

      buttonText.style.fontSize = style.data.button.size / 3.5 + "px";
      buttonText.style.marginLeft = style.data.button.size / 4 + "px";
    }

    if (style.data.button.right) {
      buttonContainer.appendChild(button);
      buttonContainer.appendChild(buttonCover);
    }
    mainContent.appendChild(innerDiv);
    innerDiv.appendChild(header);
    innerDiv.appendChild(contentLists);

    mainArea.id = "fab-main-area-65150cd97e5e7";

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

    buttonContainer.id = "fab-button-container-65150cd97e5e7";

    if (
      style.data.button.right ||
      style.data.button.buttonStyle === "Long Rounded Button#2"
    ) {
      buttonContainer.style.float = "right";
    } else {
      buttonContainer.style.float = "left";
    }

    if (style.data.button.buttonStyle === "Rounded Button With Text") {
      textContainer.id = "fab-text-container-65150cd97e5e7";
      textContainer.style.fontSize = style.data.button.size / 3.5 + "px";
    }

    if (
      style.data.button.buttonStyle === "Rounded Button" ||
      style.data.button.buttonStyle === "Rounded Button With Text"
    ) {
      button.id = "fab-button-65150cd97e5e7";
      button.style.width = style.data.button.size + "px";
      button.style.height = style.data.button.size + "px";
      button.style.zIndex = 99999;
      buttonCover.id = "fab-button-cover-65150cd97e5e7";
      buttonCover.style.width = style.data.button.size + "px";
      buttonCover.style.height = style.data.button.size + "px";
      buttonCover.style.background = style.data.button.backgroundColor;
      buttonCover.style.right = 0;
      buttonCover.style.zIndex = 99998;
    }

    if (style.data.button.buttonStyle === "Long Rounded Button#1") {
      button.id = "fab-button-long-1-65150cd97e5e7";
      button.style.height = style.data.button.size - 10 + "px";
      button.style.zIndex = 99999;
      buttonCover.id = "fab-button-cover-65150cd97e5e7";
      buttonCover.style.height = style.data.button.size + "px";
      buttonCover.style.width =
        style.data.button.size -
        10 +
        style.data.button.textContent.length * 15 +
        "px";
      buttonCover.style.position = "absolute";
      buttonCover.style.background = style.data.button.backgroundColor;
      buttonCover.style.opacity = "0.4";
      buttonCover.style.zIndex = 99998;
    }

    if (style.data.button.buttonStyle === "Long Rounded Button#2") {
      button.id = "fab-button-long-2-65150cd97e5e7";
      button.style.height = style.data.button.size - 10 + "px";
      button.style.width =
        style.data.button.size +
        30 +
        style.data.button.textContent.length * 10 +
        "px";
      button.style.zIndex = 99999;
      buttonCover.id = "fab-button-cover-65150cd97e5e7";
      buttonCover.style.height = style.data.button.size + "px";
      buttonCover.style.width =
        style.data.button.size +
        30 +
        style.data.button.textContent.length * 10 +
        "px";
      buttonCover.style.position = "absolute";
      buttonCover.style.background = style.data.button.backgroundColor;
      buttonCover.style.opacity = "0.15";
      buttonCover.style.zIndex = 99998;
    }

    button.style.backgroundColor = style.data.button.backgroundColor;
    button.style.color = style.data.button.textColor;

    mainContent.style.position = "relative";

    if (style.data.button.top) {
      mainContent.style.top =
        style.data.button.size === 50
          ? "60px"
          : style.data.button.size === 70
          ? "80px"
          : "100px";
    }
    if (style.data.button.right) {
      mainContent.style.right =
        style.data.button.size === 50
          ? "300px"
          : style.data.button.size === 70
          ? "280px"
          : "260px";
    }
    if (style.data.button.bottom) {
      mainContent.style.bottom = 75 + contacts.length * 75 + "px";
    }

    if (style.data.button.left) {
      mainContent.style.left = "10px";

      if (style.data.button.buttonStyle === "Long Rounded Button#2") {
        buttonContainer.style.position = "relative";
        buttonContainer.style.left =
          style.data.button.size +
          style.data.button.textContent.length * 10 +
          "px";
      }
    }

    // Inner Div styles
    innerDiv.id = "fab-inner-div-65150cd97e5e7";
    innerDiv.style.width = "350px";

    header.style.backgroundColor = style.data.button.backgroundColor;
    header.style.color = style.data.button.textColor;

    header.id = "fab-header-65150cd97e5e7";
    contentLists.style.minHeight = 65 * contacts.length;
    contentLists.style.background = style.data.button.bodyColor;
    contentLists.id = "fab-content-lists-65150cd97e5e7";

    const pluginButton =
      style.data.button.buttonStyle === "Rounded Button" ||
      style.data.button.buttonStyle === "Rounded Button With Text"
        ? document.getElementById("fab-button-65150cd97e5e7")
        : style.data.button.buttonStyle === "Long Rounded Button#1"
        ? document.getElementById("fab-button-long-1-65150cd97e5e7")
        : document.getElementById("fab-button-long-2-65150cd97e5e7");

    mainArea.appendChild(mainContent);
    mainContent.id = "pluginButtonContents-65150cd97e5e7";
    mainContent.style.visibility = "hidden";

    pluginButton.addEventListener("click", (event) => {
      if (isContentsOpened === false) {
        mainContent.style.visibility = "visible";
        isContentsOpened = true;
      } else {
        mainContent.style.visibility = "hidden";
        isContentsOpened = false;
      }
    });

    const logoIframe = document.getElementById("logo-iframe");
    logoIframe.addEventListener("click", (event) => {
      if (isContentsOpened === false) {
        mainContent.style.visibility = "visible";
        isContentsOpened = true;
      } else {
        mainContent.style.visibility = "hidden";
        isContentsOpened = false;
      }
    });
  } catch (error) {
    console.log("Website is not match button qualifications.");
  }
};
