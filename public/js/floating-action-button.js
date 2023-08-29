const generateButton = async (id) => {
  try {
    // Get button details
    const response = await fetch(
      "http://localhost:8080/api/v1/user/my-products/" + id + "/public-button",
      {
        headers: {
          requesthost: window.location.host,
          exactreferer: window.document.referrer,
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
        `<a style="text-decoration:none !important; color:rgb(75, 85, 99) !important; width:100% !important; display:flex !important; align-items: center; gap: 10px;" href="${contacts[i].destination}" target="_blank"><span><i style="font-size:16px !important;" class="${contentPrefixIcon} ${contentIconValue}"></i></span><span style="font-size:20px !important; font-weight:500 !important; margin-left:10 !important;"> ${contacts[i].textContent}</span> <i style="font-size:16px !important; margin-left:auto !important" class="fa-solid fa-chevron-right"></i></a>`
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
          ? `<i class="${prefixIcon} ${iconValue}"></i>`
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
          ? `<i class="${prefixIcon} ${iconValue}"></i>`
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
      console.log("clicked");
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
