const generateButton = async (id) => {
  console.log(id);

  const response = await fetch(
    "http://localhost:8080/api/v1/user/my-products/" + id + "/public-button"
  );
  const style = await response.json();

  const contacts = style.data.contents;

  console.log(contacts);

  let isContentsOpened = false;

  // 1
  const mainAreaCss = {
    fontFamily: "Arial",
    position: "fixed",
    top: style.data.button.top ? style.data.button.top + "px" : null,
    right: style.data.button.right ? style.data.button.right + "px" : null,
    bottom: style.data.button.bottom ? style.data.button.bottom + "px" : null,
    left: style.data.button.left ? style.data.button.left + "px" : null,
    width: style.data.button.size + "px",
    height: style.data.button.size + "px",
    zIndex: 99999,
  };

  // 2
  const buttonCss = {
    width: style.data.button.size + "px",
    height: style.data.button.size + "px",
    borderRadius: "50%",
    border: "0px",
    boxShadow:
      "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    backgroundColor: style.data.button.backgroundColor,
    color: style.data.button.textColor,
    fontSize: "32px",
    cursor: "pointer",
  };

  // 2
  const mainContentCss = {
    position: "relative",
    top: style.data.button.top ? "10px" : null,
    left: style.data.button.left ? "10px" : null,
    bottom: style.data.button.bottom ? 150 + contacts.length * 65 + "px" : null,
    right: style.data.button.right ? "320px" : null,
  };

  // 3
  const innerDivCss = {
    position: "absolute",
  };

  // 4
  const headerCss = {
    backgroundColor: style.data.button.backgroundColor,
    paddingTop: "15px",
    paddingBottom: "15px",
    paddingRight: "20px",
    paddingLeft: "20px",
    color: style.data.button.textColor,
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",
    minWidth: "350px",
    fontWeight: 600,
    fontSize: "20px",
  };

  // 4
  const contentListsCss = {
    background: style.data.button.bodyColor,
    cursor: "pointer",
    minHeight: 65 * contacts.length,
    borderBottomLeftRadius: "15px",
    borderBottomRightRadius: "15px",
    color: "rgb(75 85 99)",
    fontWeight: 500,
    boxShadow:
      "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
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
  const button = document.createElement("button");
  button.id = "pluginButton";
  const mainContent = document.createElement("div");
  const innerDiv = document.createElement("div");
  const header = document.createElement("div");
  const contentLists = document.createElement("div");

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
      `<a style="text-decoration:none; color:rgb(75, 85, 99); width:100%; display:flex;" href="${contacts[i].destination}" target="_blank"><span style="font-size:24px;"><i style="font-size:20;" class="${contentPrefixIcon} ${contentIconValue}"></i></span><span style="font-size:18; font-weight:500; margin-left:10;"> ${contacts[i].textContent}</span> <i style="font-size:20; margin-left:auto" class="fa-solid fa-chevron-right"></i></a>`
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

  document.body.appendChild(mainArea);
  mainArea.appendChild(button);
  mainContent.appendChild(innerDiv);
  innerDiv.appendChild(header);
  innerDiv.appendChild(contentLists);
  Object.assign(mainArea.style, mainAreaCss);
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
};
