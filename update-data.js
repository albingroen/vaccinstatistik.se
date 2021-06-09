const axios = require("axios");
const excelToJson = require("convert-excel-to-json");
const fs = require("fs");

const main = () => {
  axios({
    method: "GET",
    url: "https://fohm.maps.arcgis.com/sharing/rest/content/items/fc749115877443d29c2a49ea9eca77e9/data",
    responseType: "arraybuffer",
    headers: {
      "Content-Type": "blob",
    },
  })
    .then(async (res) => {
      const fileName = "data.xlsx";
      fs.writeFileSync(fileName, res.data);
      const result = excelToJson({
        sourceFile: fileName,
      });

      const records = result["Vaccinerade tidsserie"].filter(
        (record) => record.F === "Minst 1 dos"
      );
      records.splice(0, 1);

      const cleanData = records.map((record) => ({
        progress: Number(record.E),
        week: Number(record.A),
        year: Number(record.B),
        region: record.C,
        amount: record.D,
      }));

      fs.writeFileSync(
        "./vaccinations.json",
        JSON.stringify(cleanData, null, 2)
      );

      fs.rmSync("./data.xlsx");

      console.info("Updated data!");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

main();
