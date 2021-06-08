A site where you can see the total amount of vaccinations in Sweden, as well as per municipality, and a little trend graph. 

The data gets fetched from the [Swedish vaccination registry](https://www.folkhalsomyndigheten.se/smittskydd-beredskap/utbrott/aktuella-utbrott/covid-19/statistik-och-analyser/statistik-over-registrerade-vaccinationer-covid-19/) through a GitHub action that runs every single morning at 08.00.

If you want to play with the data you can access the json file [here](https://raw.githubusercontent.com/albingroen/vaccination-site/main/vaccinations.json) (this is the one that gets updated with fresh data once a day).
