import datetime as dt
import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


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

@app.route("/")
def welcome():
    return (
        f"Welcome to the US Cities Analysis API!<br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/population<br/>"
    )


@app.route("/api/v1.0/population")
def population():
    """Return the pop data for each city"""

    # Query for the city name, pop, lat ,lng, and fliter to grab largest 100 
    population = session.query(Cities.city, Cities.population, Cities.lat, Cities.lng).\
        filter(Cities.population > 500000).all()

    return jsonify(population)

# # create index 
# @app.route("/")
# def index():
# #         # Store the entire dict collection in a dict  dict(db.mars_data.find())
#     mars = mongo.db.mars_data.find_one()
#     return render_template('index.html', mars=mars)

# # create scrape 
# @app.route("/scrape")
# def scrape():
#     scrape_mars_dict = scrape_mars.scrape()
#     mars_data = db.mars_data
#     mars_data.update(
#         {},
#         scrape_mars_dict,
#         upsert=True
#     )
#     return redirect("/", code=302)

if __name__ == "__main__":
    app.run(debug=True)