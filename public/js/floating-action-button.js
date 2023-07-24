const generateButton = async (id) => {
  console.log(id);

  const response = await fetch(
    "http://localhost:8080/api/v1/user/my-products/" + id + "/public-button"
  );
  const data = await response.json();

  console.log(data);

  const button = document.createElement("button");
  button.innerHTML = "Test";
  console.log(button);
  document.body.appendChild(button);
};
