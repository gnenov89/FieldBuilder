const FieldService = {
  getField: function (id) {
    return {
      label: "Sales region",
      required: false,
      choices: [
        "Asia",
        "Australia",
        "Western Europe",
        "Eastern Europe",
        "Latin America",
        "Middle East",
      ],
      displayAlpha: true,
      default: "North America",
    };
  },
  saveField: function (fieldJson) {
    // Add the code here to call the API (or temporarily, just log fieldJson to the console)
    console.log(fieldJson);
  },
};

export default FieldService;