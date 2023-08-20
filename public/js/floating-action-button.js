const generateButton = async (id) => {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/user/my-products/" + id + "/public-button",
      {
        headers: {
          requesthost: window.location.host,
        },
      }
    );

    const style = await response.json();

    const contacts = style.data.contents;

    let isContentsOpened = false;

    console.log(style.data.button.buttonStyle);

    const splitIcon = style.data.button.icon.split(" ");

    let prefixIcon;

    if (splitIcon[0] === "fas") {
      prefixIcon = "fa-solid";
    } else {
      prefixIcon = "fa-brands";
    }

    let iconValue = "fa-" + splitIcon[1];

    const mainArea = document.createElement("div");
    const buttonContainer = document.createElement("div");
    const button = document.createElement("button");
    const mainContent = document.createElement("div");
    const innerDiv = document.createElement("div");
    const header = document.createElement("div");
    const contentLists = document.createElement("div");
    let textContainer;
    let buttonText;
    if (
      style.data.button.buttonStyle === "Rounded Button With Text" ||
      style.data.button.buttonStyle === "Long Rounded Button#1" ||
      style.data.button.buttonStyle === "Long Rounded Button#2"
    ) {
      textContainer = document.createElement("div");
      buttonText = document.createElement("h5");
    }

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
        `<a style="text-decoration:none !important; color:rgb(75, 85, 99) !important; width:100% !important; display:flex !important; align-items: center; gap: 10px;" href="${contacts[i].destination}" target="_blank"><span style="font-size:24px !important;"><i style="font-size:20 !important;" class="${contentPrefixIcon} ${contentIconValue}"></i></span><span style="font-size:18 !important; font-weight:500 !important; margin-left:10 !important;"> ${contacts[i].textContent}</span> <i style="font-size:20 !important; margin-left:auto !important" class="fa-solid fa-chevron-right"></i></a>`
      );
    }

    for (let i = 0; i < contents.length; i++) {
      let newList = document.createElement("div");
      newList.innerHTML = contents[i];
      contentLists.appendChild(newList);
      newList.className = "fab-content-list";
    }

    button.innerHTML =
      style.data.button.iconType === "font-awesome"
        ? `<i class="${prefixIcon} ${iconValue}"></i>`
        : `<img src="${style.data.button.icon}" alt="logo" />`;
    header.innerHTML = style.data.button.textContent;

    if (
      style.data.button.buttonStyle === "Rounded Button With Text" ||
      style.data.button.buttonStyle === "Long Rounded Button#1" ||
      style.data.button.buttonStyle === "Long Rounded Button#2"
    ) {
      buttonText.innerHTML = style.data.button.textContent;
    }

    document.body.appendChild(mainArea);

    mainArea.appendChild(buttonContainer);

    if (style.data.button.left) {
      buttonContainer.appendChild(button);
    }
    if (
      style.data.button.buttonStyle === "Rounded Button With Text" ||
      style.data.button.buttonStyle === "Long Rounded Button#1" ||
      style.data.button.buttonStyle === "Long Rounded Button#2"
    ) {
      buttonContainer.appendChild(textContainer);
      textContainer.appendChild(buttonText);
    }

    if (style.data.button.right) {
      buttonContainer.appendChild(button);
    }
    mainContent.appendChild(innerDiv);
    innerDiv.appendChild(header);
    innerDiv.appendChild(contentLists);

    mainArea.id = "fab-main-area";

    if (style.data.button.top) {
      mainArea.style.top = style.data.button.top;
    }

    if (style.data.button.right) {
      mainArea.style.right = style.data.button.right;
    }

    if (style.data.button.bottom) {
      mainArea.style.bottom = style.data.button.bottom;
    }

    if (style.data.button.left) {
      mainArea.style.left = style.data.button.left;
    }

    buttonContainer.id = "fab-button-container";

    if (style.data.button.right) {
      buttonContainer.style.float = "right";
    } else {
      buttonContainer.style.float = "left";
    }

    if (
      style.data.button.buttonStyle === "Rounded Button With Text" ||
      style.data.button.buttonStyle === "Long Rounded Button#1" ||
      style.data.button.buttonStyle === "Long Rounded Button#2"
    ) {
      textContainer.id = "fab-text-container";
    }

    button.id = "fab-button";

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

    const pluginButton = document.getElementById("fab-button");

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
