import datetime as dt
import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################
# Create Engine
engine = create_engine("sqlite:///p2_cities.sqlite")

# reflect an existing database into a new model
Base = automap_base() # AUTO MAP OR DECLARATIVE?

# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to table
Cities = Base.classes.cities

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

# # create index 
@app.route("/")
def welcome():
     # Store the entire dict collection in a dict 
    cities = Cities
    return render_template("index.html", cities = cities)


@app.route("/population")
def population():
    """Return the pop data for each city"""

    # Query for the city name, pop, lat ,lng, and fliter to grab largest 100 
    population = session.query(Cities.city, Cities.population, Cities.lat, Cities.lng).\
        filter(Cities.population > 500000).all()

    return jsonify(population)

# create metadata route for metric selector
@app.route("/metadata")
def metric_metadata(metric):
    """Return all data for a given metric."""
    sel = [
        Cities.population,
        Cities.lat,
        Cities.lng
    ]

    results = session.query(*sel).all()

    # Create a dictionary entry for each row of metadata information
    metric_metadata = {}
    for result in results:
        metric_metadata["population"] = result[0]
        metric_metadata["lat"] = result[1]
        metric_metadata["lng"] = result[2]
 

    print(metric_metadata)
    return jsonify(metric_metadata)

if __name__ == "__main__":
    app.run(debug=True)