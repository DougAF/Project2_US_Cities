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

# create index 
@app.route("/")
def welcome():
    engine = create_engine("sqlite:///p2_cities.sqlite")

    # reflect an existing database into a new model
    Base = automap_base() # AUTO MAP OR DECLARATIVE?
    # reflect the tables
    Base.prepare(engine, reflect=True)
    # Save references to table
    Cities = Base.classes.cities
    #Create our session (link) from Python to the DB
    session = Session(engine)
    # Store the entire dict collection in a dict 
    cities = Cities
    
    return render_template("index.html", cities = cities)

#testing route 
@app.route("/population")
def population():
    """Return the pop data for each city"""
    engine = create_engine("sqlite:///p2_cities.sqlite")
# reflect an existing database into a new model
    Base = automap_base() # AUTO MAP OR DECLARATIVE?
# reflect the tables
    Base.prepare(engine, reflect=True)
# Save references to table
    Cities = Base.classes.cities
# Create our session (link) from Python to the DB
    session = Session(engine)
 # Query for the city name, pop, lat ,lng, and fliter to grab largest 100 
    population = session.query(Cities.city, Cities.population, Cities.lat, Cities.lng).\
        filter(Cities.population > 500000).all()

    return jsonify(population)

#create metadata route for metric selector
@app.route("/metadata")
def city_metadata():
    engine = create_engine("sqlite:///p2_cities.sqlite")
# reflect an existing database into a new model
    Base = automap_base() # AUTO MAP OR DECLARATIVE?
# reflect the tables
    Base.prepare(engine, reflect=True)
# Save references to table
    Cities = Base.classes.cities
# Create our session (link) from Python to the DB
    session = Session(engine)

    """Return all data for a city."""
    sel = [
        Cities.city,
        Cities.state_name,
        Cities.lat,
        Cities.lng,
        Cities.population
    ]

    results = session.query(*sel).order_by(Cities.population.desc()).limit(100).all()

    # Create a dictionary entry for each city's information
    meta_dict = {}
    # meta_dict2 = {}
   
    meta_list = []

    # for i in range(len(results)):

    for result in results:
        city_metadata_dict = {}
        city_metadata_dict["city"] = result[0]
        city_metadata_dict["state"] = result[1]
        city_metadata_dict["coordinates"] = [result[2], result[3]]
        city_metadata_dict["population"] = result[4]
            # meta_dict.updte({city_metadata_dict["cit"]: city_metadata_dict})
        meta_list.append(city_metadata_dict)
    meta_dict = {"key": meta_list}
        # list.apend(city_metadata_dict)
        # meta_dict2.update({"values": meta_dict})
    return jsonify(meta_dict)


if __name__ == "__main__":
    app.run(debug=True)