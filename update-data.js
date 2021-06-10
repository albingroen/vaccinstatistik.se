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
      const rawJson = excelToJson({
        sourceFile: fileName,
      });

      const result = {};

      Object.entries(rawJson).forEach(([type, records]) => {
        switch (type) {
          case "Vaccinationer tidsserie":
            result[type] = records
              .filter((_, i) => !!i)
              .map((record) => ({
                week: Number(record.A),
                year: Number(record.B),
                region: record.C,
                amount: record.D,
              }));
            break;

          case "Vaccinerade tidsserie":
            result[type] = records
              .filter((_, i) => !!i)
              .map((record) => ({
                week: Number(record.A),
                year: Number(record.B),
                region: record.C,
                amount: record.D,
                share: Number(record.E),
                status: record.F,
              }));
            break;

          case "Vaccinerade ålder":
            result[type] = records
              .filter((_, i) => !!i)
              .map((record) => ({
                region: record.A,
                age: record.B,
                amount: record.C,
                share: Number(record.D),
                status: record.E,
              }));
            break;

          case "Vaccinerade kön":
            result[type] = records
              .filter((_, i) => !!i)
              .map((record) => ({
                sex: record.A,
                amount: record.B,
                share: Number(record.C),
                status: record.D,
              }));
            break;

          case "Vaccinerade kommun":
            result[type] = records
              .filter((_, i) => !!i)
              .map((record) => ({
                code: record.A,
                name: record.B,
                amountAtLeast1: record.C,
                amountFull: record.D,
                shareAtLeast1: Number(record.E),
                shareFull: Number(record.F),
              }));
            break;

          case "Vaccinerade kommun och ålder":
            result[type] = records
              .filter((_, i) => !!i)
              .map((record) => ({
                county: record.A,
                countyName: record.B,
                municipality: record.C,
                municipalityName: record.D,
                age: record.E,
                population: record.F,
                amountAtLeast1: record.G,
                amountFull: record.H,
                shareAtLeast1: Number(record.I),
                shareFull: Number(record.J),
              }));
            break;
        }
      });

      fs.writeFileSync("./vaccinations.json", JSON.stringify(result, null, 2));

      fs.rmSync("./data.xlsx");

      console.info("Updated data!");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

main();
