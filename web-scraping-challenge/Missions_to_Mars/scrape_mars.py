#!/usr/bin/env python
# coding: utf-8

# In[1]:


import os
import pandas as pd
from bs4 import BeautifulSoup as bs
from splinter import Browser
from webdriver_manager.chrome import ChromeDriverManager
import time

# In[2]:


#get_ipython().system('which chromedriver')


# In[3]:


executable_path = {'executable_path': ChromeDriverManager().install()}
browser = Browser('chrome', **executable_path, headless=False)


# In[4]:


#NASA Mars News Scrape
url = 'https://mars.nasa.gov/news/'
browser.visit(url)
time.sleep(5)


# In[5]:


html = browser.html
soup = bs(html, 'html.parser')


# In[6]:


#print(soup.prettify())


# In[7]:


news = soup.find("li", class_="slide")
news_title = news.find("div",class_="content_title").text
news_p = news.find("div", class_="article_teaser_body").text


# In[8]:


print(news_title)
print(news_p)


# In[9]:


#browser.quit()


# In[10]:


#JPL Mars Space Images Scrape
url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
browser.visit(url)


# In[11]:


html = browser.html
soup = bs(html, 'html.parser')


# In[12]:


#print(soup.prettify())


# In[13]:


image = soup.find('div', class_='carousel_container')
f_image = image.a['data-fancybox-href']
base_url = "https://www.jpl.nasa.gov"
featured_image_url = base_url + f_image


# In[14]:


print(featured_image_url)


# In[15]:


#Mars Facts
url = 'https://space-facts.com/mars/'
browser.visit(url)
time.sleep(5)

# In[16]:


html = browser.html
soup = bs(html, 'html.parser')


# In[17]:


#print(soup.prettify())


# In[19]:


mars = pd.read_html(url)


# In[20]:


mars


# In[21]:


mars_dat = mars[0]
mars_dat


# In[23]:


marsfacts_html = mars_dat.to_html(header=False)
marsfacts_html


# In[22]:


#Mars Hemispheres
url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
browser.visit(url)
time.sleep(5)

# In[24]:


html = browser.html
soup = bs(html, 'html.parser')


# In[25]:


#print(soup.prettify())


# In[26]:


cerberus_url = 'https://astropedia.astrogeology.usgs.gov/download/Mars/Viking/cerberus_enhanced.tif/full.jpg'
schiaparelli_url = 'https://astropedia.astrogeology.usgs.gov/download/Mars/Viking/schiaparelli_enhanced.tif/full.jpg'
syrtismajor_url = 'https://astropedia.astrogeology.usgs.gov/download/Mars/Viking/syrtis_major_enhanced.tif/full.jpg'
vallesmarineris_url = 'https://astropedia.astrogeology.usgs.gov/download/Mars/Viking/valles_marineris_enhanced.tif/full.jpg'


# In[30]:


hemisphere_image_urls = [
    {"title": "Cerberus Hemisphere", "img_url": cerberus_url},
    {"title": "Shiaparelli Hemisphere", "img_url": schiaparelli_url},
    {"title": "Syrtis Major Hemisphere", "img_url": syrtismajor_url},
    {"title": "Valles Marineris Hemisphere", "img_url": vallesmarineris_url},
]
hemisphere_image_urls


browser.quit()





