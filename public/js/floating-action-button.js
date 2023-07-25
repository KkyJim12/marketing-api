const generateButton = async (id) => {
  console.log(id);

  const response = await fetch(
    "http://localhost:8080/api/v1/user/my-products/" + id + "/public-button"
  );
  const style = await response.json();
  console.log(style);

  const contacts = [
    { id: 1, title: "Email", icon: "fa-solid fa-envelope" },
    { id: 2, title: "Phone", icon: "fa-solid fa-phone" },
    { id: 3, title: "Line", icon: "fa-brands fa-line" },
    { id: 4, title: "Facebook", icon: "fa-brands fa-facebook" },
    { id: 5, title: "Youtube", icon: "fa-brands fa-youtube" },
  ];

  // 1
  const mainAreaCss = {
    fontFamily: "Arial",
    position: "fixed",
    top: style.data.top ? style.data.top : null,
    right: style.data.right ? style.data.right : null,
    bottom: style.data.bottom ? style.data.bottom : null,
    left: style.data.left ? style.data.left : null,
    width: style.data.size,
    height: style.data.size,
    zIndex: 99999,
  };

  // 2
  const buttonCss = {
    width: style.data.size,
    height: style.data.size,
    borderRadius: "50%",
    border: 0,
    boxShadow:
      "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    backgroundColor: style.data.backgroundColor,
    color: style.data.textColor,
    fontSize: 32,
    cursor: "pointer",
  };

  // 2
  const mainContentCss = {
    position: "relative",
    top: style.data.top ? 10 : null,
    left: style.data.left ? 10 : null,
    bottom: style.data.bottom ? 400 + style.data.textContent.length * 10 : null,
    right: style.data.right ? 320 : null,
  };

  // 3
  const innerDivCss = {
    position: "absolute",
  };

  // 4
  const headerCss = {
    backgroundColor: style.data.backgroundColor,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 20,
    paddingLeft: 20,
    color: style.data.textColor,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    minWidth: 350,
    fontWeight: 600,
    fontSize: 20,
  };

  // 4
  const contentListsCss = {
    background: style.data.bodyColor,
    cursor: "pointer",
    minHeight: 300,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    color: "rgb(75 85 99)",
    fontWeight: 500,
    boxShadow:
      "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  };

  const splitIcon = style.data.icon.split(" ");

  let prefixIcon;

  if (splitIcon[0] === "fas") {
    prefixIcon = "fa-solid";
  } else {
    prefixIcon = "fa-brands";
  }

  let iconValue = "fa-" + splitIcon[1];

  const mainArea = document.createElement("div");
  const button = document.createElement("button");
  const mainContent = document.createElement("div");
  const innerDiv = document.createElement("div");
  const header = document.createElement("div");
  const contentLists = document.createElement("div");

  const contents = [];

  for (let i = 0; i < contacts.length; i++) {
    contents.push(
      `<span style="font-size:24;"><i class="${contacts[i].icon}"></i></span><span style="font-size:18; font-weight:500; margin-left:10;"> ${contacts[i].title}</span> <i style="font-size:16; margin-left:auto" class="fa-solid fa-chevron-right"></i>`
    );
  }

  const listStyleCss = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    borderTop: "1px solid rgb(229 231 235)",
    paddingTop: 20,
    paddingRight: 25,
    paddingBottom: 20,
    paddingLeft: 25,
  };

  for (let i = 0; i < contents.length; i++) {
    let newList = document.createElement("div");
    newList.innerHTML = contents[i];
    contentLists.appendChild(newList);
    Object.assign(newList.style, listStyleCss);
  }

  button.innerHTML = `<i class="${prefixIcon} ${iconValue}"></i>`;
  header.innerHTML = style.data.textContent;

  document.body.appendChild(mainArea);
  mainArea.appendChild(button);
  mainArea.appendChild(mainContent);
  mainContent.appendChild(innerDiv);
  innerDiv.appendChild(header);
  innerDiv.appendChild(contentLists);
  Object.assign(mainArea.style, mainAreaCss);
  Object.assign(button.style, buttonCss);
  Object.assign(mainContent.style, mainContentCss);
  Object.assign(innerDiv.style, innerDivCss);
  Object.assign(header.style, headerCss);
  Object.assign(contentLists.style, contentListsCss);
};
