```
                     _           _        _   _     _   _ _               
__   ____ _  ___ ___(_)_ __  ___| |_ __ _| |_(_)___| |_(_) | __  ___  ___ 
\ \ / / _` |/ __/ __| | '_ \/ __| __/ _` | __| / __| __| | |/ / / __|/ _ \
 \ V / (_| | (_| (__| | | | \__ \ || (_| | |_| \__ \ |_| |   < _\__ \  __/
  \_/ \__,_|\___\___|_|_| |_|___/\__\__,_|\__|_|___/\__|_|_|\_(_)___/\___|
                                                                          
```

## What is this?

A site where you can see the total amount of vaccinations in Sweden, as well as per municipality, and a little trend graph. 

## How does it work?

The data gets fetched from the [Swedish vaccination registry](https://www.folkhalsomyndigheten.se/smittskydd-beredskap/utbrott/aktuella-utbrott/covid-19/statistik-och-analyser/statistik-over-registrerade-vaccinationer-covid-19/) through a GitHub action that runs every single morning at 08.00.

## Accessing the data

If you want to play with the data you can access the json file [here](https://raw.githubusercontent.com/albingroen/vaccination-site/main/vaccinations.json) (this is the one that gets updated with fresh data once a day).

