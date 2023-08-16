(async function generateButton(id) {
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

    // 1
    const mainAreaCss = {
      fontFamily: "Arial !important",
      position: "fixed !important",
      top: style.data.button.top
        ? style.data.button.top + "px !important"
        : null,
      right: style.data.button.right
        ? style.data.button.right + "px !important"
        : null,
      bottom: style.data.button.bottom
        ? style.data.button.bottom + "px !important"
        : null,
      left: style.data.button.left
        ? style.data.button.left + "px !important"
        : null,
      width: style.data.button.size + "px !important",
      height: style.data.button.size + "px !important",
      zIndex: 99999 + " !important",
    };

    const buttonContainerCss = {
      display: "flex !important",
      gap: "10px 12px !important",
      alignItems: "center !important",
      float:
        style.data.button.right === null
          ? "left !important"
          : "right !important",
      whiteSpace: "nowrap !important",
    };

    const textContainerCss = {
      height: "28px !important",
      display: "flex !important",
      alignItems: "center !important",
      justifyContent: "center !important",
      paddingTop: "10px !important",
      paddingBottom: "10px !important",
      paddingLeft: "20px !important",
      paddingRight: "20px !important",
      boxShadow:
        "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1) !important",
      background: "white !important",
      borderRadius: "10px !important",
      fontSize: "24px !important",
      color: "#374151 !important",
    };

    // 2
    const buttonCss = {
      width: style.data.button.size + "px !important",
      height: style.data.button.size + "px !important",
      borderRadius: "50% !important",
      border: "0px !important",
      boxShadow:
        "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1) !important",
      backgroundColor: style.data.button.backgroundColor + " !important",
      color: style.data.button.textColor + " !important",
      fontSize: "32px !important",
      cursor: "pointer !important",
    };

    // 2
    const mainContentCss = {
      position: "relative !important",
      top: style.data.button.top ? 90 + "px !important" : null,
      left: style.data.button.left ? "10px !important" : null,
      bottom: style.data.button.bottom
        ? 50 + contacts.length * 75 + "px !important"
        : null,
      right: style.data.button.right ? "320px !important" : null,
    };

    // 3
    const innerDivCss = {
      position: "absolute !important",
    };

    // 4
    const headerCss = {
      backgroundColor: style.data.button.backgroundColor,
      paddingTop: "15px !important",
      paddingBottom: "15px !important",
      paddingRight: "20px !important",
      paddingLeft: "20px !important",
      color: style.data.button.textColor + " !important",
      borderTopLeftRadius: "15px !important",
      borderTopRightRadius: "15px !important",
      minWidth: "350px !important",
      fontWeight: 600 + " !important",
      fontSize: "20px !important",
    };

    // 4
    const contentListsCss = {
      background: style.data.button.bodyColor + " !important",
      cursor: "pointer !important",
      minHeight: 65 * contacts.length + " !important",
      borderBottomLeftRadius: "15px !important",
      borderBottomRightRadius: "15px !important",
      color: "rgb(75 85 99) !important",
      fontWeight: 500 + " !important",
      boxShadow:
        "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1) !important",
    };

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
    button.id = "pluginButton";
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
        `<a style="text-decoration:none !important; color:rgb(75, 85, 99) !important; width:100% !important; display:flex !important;" href="${contacts[i].destination}" target="_blank"><span style="font-size:24px !important;"><i style="font-size:20 !important;" class="${contentPrefixIcon} ${contentIconValue}"></i></span><span style="font-size:18 !important; font-weight:500 !important; margin-left:10 !important;"> ${contacts[i].textContent}</span> <i style="font-size:20 !important; margin-left:auto !important" class="fa-solid fa-chevron-right"></i></a>`
      );
    }

    const listStyleCss = {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      borderTop: "1px solid rgb(229 231 235)",
      paddingTop: "20px",
      paddingRight: "25px",
      paddingBottom: "20px",
      paddingLeft: "25px",
    };

    for (let i = 0; i < contents.length; i++) {
      let newList = document.createElement("div");
      newList.innerHTML = contents[i];
      contentLists.appendChild(newList);
      Object.assign(newList.style, listStyleCss);
    }

    button.innerHTML = `<i class="${prefixIcon} ${iconValue}"></i>`;
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
    Object.assign(mainArea.style, mainAreaCss);
    Object.assign(buttonContainer.style, buttonContainerCss);

    if (
      style.data.button.buttonStyle === "Rounded Button With Text" ||
      style.data.button.buttonStyle === "Long Rounded Button#1" ||
      style.data.button.buttonStyle === "Long Rounded Button#2"
    ) {
      Object.assign(textContainer.style, textContainerCss);
    }
    Object.assign(button.style, buttonCss);
    Object.assign(mainContent.style, mainContentCss);
    Object.assign(innerDiv.style, innerDivCss);
    Object.assign(header.style, headerCss);
    Object.assign(contentLists.style, contentListsCss);

    const pluginButton = document.getElementById("pluginButton");

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
  } catch (error) {
    console.log(error);
    console.log("This domain is not in the whitelist.");
  }
});
