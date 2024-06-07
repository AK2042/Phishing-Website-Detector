from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse, FileResponse
from pydantic import BaseModel
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import time
import urllib.parse
import pickle
import scipy.sparse as sp
import networkx as nx
import matplotlib.pyplot as plt
import os
import logging

app = FastAPI()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load the model and vectorizer
try:
    with open('phishing_model.pkl', 'rb') as f:
        model = pickle.load(f)
    with open('vectorizer.pkl', 'rb') as f:
        vectorizer = pickle.load(f)
    logger.info("Model and vectorizer loaded successfully")
except Exception as e:
    raise RuntimeError(f"Error loading model or vectorizer: {e}")

# Chrome options for Selenium
options = webdriver.ChromeOptions()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-gpu')
options.add_argument('--disable-dev-shm-usage')

class URLRequest(BaseModel):
    url: str

def init_browser():
    try:
        browser = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options)
        logger.info("WebDriver initialized successfully")
        return browser
    except Exception as e:
        raise RuntimeError(f"Error initializing Chrome WebDriver: {e}")

def scrape_links(url: str, browser):
    links_with_text = []
    try:
        browser.get(url)
        WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
        time.sleep(2)

        soup = BeautifulSoup(browser.page_source, "html.parser")
        for line in soup.find_all('a'):
            href = line.get('href')
            if href and href.startswith('http'):
                links_with_text.append(href)
    except Exception as e:
        logger.error(f"An error occurred while scraping: {e}")
    return links_with_text

@app.post("/checkurl")
async def check_url(request: URLRequest):
    url = request.url
    try:
        browser = init_browser()
        links_with_text = scrape_links(url, browser)
        browser.quit()
        
        results = []
        link_list = []

        for link in links_with_text:
            try:
                x_predict = vectorizer.transform([link])
                additional_features = [[len(link), link.count('.'), link.count('/')]]
                x_predict = sp.hstack((x_predict, additional_features), format='csr')
                y_predict = model.predict(x_predict)
                
                result = {
                    "url": link,
                    "result": "This is a Phishing Site" if y_predict[0] == 1 else "This is not a Phishing Site"
                }
                results.append(result)
                link_list.append((link, y_predict[0]))
            except Exception as e:
                logger.error(f"Error during prediction: {e}")
                results.append({"url": link, "error": str(e)})

        generate_graph(url, link_list)
        return JSONResponse(content={"original_url": url, "results": results})
    except Exception as e:
        logger.error(f"Error during processing: {e}")
        raise HTTPException(status_code=500, detail=f"Error during processing: {e}")

def generate_graph(url: str, link_list):
    G = nx.Graph()
    node_colors = {}

    for link, prediction in link_list:
        G.add_edge(url, link)
        node_colors[link] = 'red' if prediction == 1 else 'green'

    node_colors_list = [node_colors.get(node, 'blue') for node in G.nodes]

    pos = nx.spring_layout(G)
    nx.draw(G, pos, with_labels=True, node_color=node_colors_list, node_size=500)
    plt.savefig("graph.jpg")

@app.get("/graph")
async def get_graph():
    try:
        if os.path.exists("graph.jpg"):
            return FileResponse("graph.jpg", media_type="image/jpeg")
        else:
            raise HTTPException(status_code=404, detail="Graph image not found")
    except Exception as e:
        logger.error(f"Error returning graph image: {e}")
        raise HTTPException(status_code=500, detail=f"Error returning graph image: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
