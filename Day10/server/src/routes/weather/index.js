const router = require("express").Router();

router.get("/weather", async (req, res, next) => {
  try {
    await fetch(
      "api.openweathermap.org/data/2.5/weather?q=London&appid=10146cf54e95ea4c448b4ffdd736f0d3"
    )
      .then((res) => res.json())
      .then();
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
