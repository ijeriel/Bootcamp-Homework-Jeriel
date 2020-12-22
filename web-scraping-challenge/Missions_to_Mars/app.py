from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo

import scrape_mars

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/mars_app"
mongo = PyMongo(app)

@app.route("/")
def index():
    mars_data = mongo.db.mars_data.find_one()
    return render_template("index.html", mars_data=mars_data)

@app.route("/scrape")
def scrape():
    mars_info = mongo.db.mars_data
    mars_data_title = scrape_mars.news_title
    mars_data_news = scrape_mars.news_p
    mars_data_featured_image = scrape_mars.featured_image_url
    mars_data_facts = scrape_mars.marsfacts_html
    mars_data_hemisphere = scrape_mars.hemisphere_image_urls
    mars_data = {"title": mars_data_title, "news": mars_data_news, "featured_image": mars_data_featured_image, "facts": mars_data_facts, "hemisphere": mars_data_hemisphere}
    mars_info.update({}, mars_data, upsert=True)
    return redirect("/", code=302)

if __name__ == "__main__":
    app.run(debug=False)
    

