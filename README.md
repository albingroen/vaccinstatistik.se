# vaccinstatistik.se

> A site where you can see how the covid-19 vaccination is going in Sweden

[![Update data](https://github.com/albingroen/vaccination-site/actions/workflows/action.yml/badge.svg?branch=main)](https://github.com/albingroen/vaccination-site/actions/workflows/action.yml)

## What is this?

A site where you can see the total amount of vaccinations in Sweden, as well as per municipality, and a little trend graph. 

## How does it work?

The data gets fetched from the [Swedish vaccination registry](https://www.folkhalsomyndigheten.se/smittskydd-beredskap/utbrott/aktuella-utbrott/covid-19/statistik-och-analyser/statistik-over-registrerade-vaccinationer-covid-19/) through a GitHub action that runs every single morning at 08.00.

## Accessing the data

If you want to play with the data you can access the json file [here](https://raw.githubusercontent.com/albingroen/vaccination-site/main/vaccinations.json) (this is the one that gets updated with fresh data once a day).

