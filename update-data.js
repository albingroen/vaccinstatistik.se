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

      // const vaccinatedRegionAndAge = result["Vaccinerade kommun och ålder"];
      // const vaccinations = result["Vaccinationer tidsserie"];
      // const vaccinatedRegion = result["Vaccinerade kommun"];
      const vaccinated = result["Vaccinerade tidsserie"];
      const vaccinatedAge = result["Vaccinerade ålder"];
      // const vaccinatedSex = result["Vaccinerade kön"];

      const vaccinatedRecords = vaccinated.filter(
        (record) => record.F === "Minst 1 dos"
      );
      vaccinatedRecords.splice(0, 1);

      const vaccinatedAgeRecords = vaccinatedAge.filter(
        (record) => record.E === "Minst 1 dos"
      );
      vaccinatedAgeRecords.splice(0, 1);

      const cleanVaccinated = vaccinatedRecords.map((record) => ({
        progress: Number(record.E),
        week: Number(record.A),
        year: Number(record.B),
        region: record.C,
        amount: record.D,
      }));

      const cleanVaccinatedAge = vaccinatedAgeRecords.map((record) => ({
        progress: Number(record.D),
        region: record.A,
        amount: record.C,
        age: record.B,
      }));

      fs.writeFileSync(
        "./vaccinations.json",
        JSON.stringify(
          {
            vaccinated: cleanVaccinated,
            vaccinatedAge: cleanVaccinatedAge,
          },
          null,
          2
        )
      );

      fs.rmSync("./data.xlsx");

      console.info("Updated data!");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

main();
