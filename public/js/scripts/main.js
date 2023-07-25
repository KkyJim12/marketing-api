require.config({
  paths: {
    fontawesome: "./vendor/fontawesome/fontawesome.min",
    "fontawesome/solid": "./vendor/fontawesome/solid.min",
    "fontawesome/brands": "./vendor/fontawesome/brands.min",
    "fontawesome/regular": "./vendor/fontawesome/regular.min",
  },
  shim: {
    fontawesome: {
      deps: ["fontawesome/solid", "fontawesome/brands", "fontawesome/regular"],
    },
  },
});

require(["fontawesome"], function (fontawesome) {
  console.log("Congrats, Font Awesome is installed using Require.js");
});
