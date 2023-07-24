const generateButton = async (id) => {
  console.log(id);

  const response = await fetch(
    "http://localhost:8080/api/v1/user/my-products/" + id + "/public-button"
  );
  const style = await response.json();
  console.log(style);

  const divCss = {
    position: "absolute",
    top: style.data.top ? style.data.top : null,
    right: style.data.right ? style.data.right : null,
    bottom: style.data.bottom ? style.data.bottom : null,
    left: style.data.left ? style.data.left : null,
  };

  const buttonCss = {
    background: style.data.backgroundColor,
    border: "none",
    color: style.data.textColor,
    width: style.data.size,
    height: style.data.size,
    borderRadius: "50%",
    fontSize: 32,
  };

  const splitIcon = style.data.icon.split(" ");

  let prefixIcon;

  if (splitIcon[0] === "fas") {
    prefixIcon = "fa-solid";
  } else {
    prefixIcon = "fa-brands";
  }

  let iconValue = "fa-" + splitIcon[1];

  const div = document.createElement("div");
  const button = document.createElement("button");
  button.innerHTML = `<i class="${prefixIcon} ${iconValue}"></i>`;
  div.appendChild(button);
  document.body.appendChild(div);
  Object.assign(button.style, buttonCss);
  Object.assign(div.style, divCss);
};
