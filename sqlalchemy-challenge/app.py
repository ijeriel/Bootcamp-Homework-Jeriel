#sqlalchemy-challenge
import numpy as np
import datetime as dt
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Resources/hawaii.sqlite")

# reflect an existing database into a new model
base = automap_base()
# reflect the tables
base.prepare(engine, reflect=True)

# Save references to tables
measurement = base.classes.measurement
station = base.classes.station

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List of available api routes."""
    return (
        f"List of Available Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/start<br/>"
        f"/api/v1.0/start/end<br/>"
    )


@app.route("/api/v1.0/precipitation")
def precipitation():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query 12 months data
    twelve_month_prcp = session.query(measurement.date, measurement.prcp).\
    filter(measurement.date > '2016-08-23').\
    order_by(measurement.date).all()

    session.close()

    # Create dictionary
    prcp_data = []
    for date,prcp in twelve_month_prcp:
        prcp_dict = {}
        prcp_dict["date"] = date
        prcp_dict["prcp"] = prcp
        prcp_data.append(prcp_dict)

    return jsonify(prcp_data)


@app.route("/api/v1.0/stations")
def stations():
    # Create our session (link)
    session = Session(engine)

    # Query stations
    twelve_month_prcp = session.query(measurement.station).\
        group_by(measurement.station).all()

    session.close()

    # List of stations
    station_list = list(np.ravel(twelve_month_prcp))

    return jsonify(station_list)

@app.route("/api/v1.0/tobs")
def tobs():
    # Create our session (link)
    session = Session(engine)

    # Query for most active station
    last12 = dt.date(2017, 8, 23) - dt.timedelta(days=365)
    busiest = session.query(measurement.date, measurement.tobs).\
        filter(measurement.station == 'USC00519281').\
        filter(measurement.date >= last12).all()

    tobs_list = list(np.ravel(busiest))

    return jsonify(tobs_list)

@app.route("/api/v1.0/start")
def start():
    # Create our session (link)
    session = Session(engine)

    # Query min, avg, max
    min_max = session.query(measurement.station,func.min(measurement.tobs),func.max(measurement.tobs),func.round(func.avg(measurement.tobs),2)).\
        group_by(measurement.station).\
        order_by(func.count(measurement.station).desc()).first()

    min_avg_max = list(np.ravel(min_max))

    return jsonify(min_avg_max)



    



if __name__ == '__main__':
    app.run(debug=True)