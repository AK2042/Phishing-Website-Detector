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

try:
    with open('phishing_model.pkl', 'rb') as f:
        model = pickle.load(f)
    with open('vectorizer.pkl', 'rb') as f:
        vectorizer = pickle.load(f)
    print("Model and vectorizer loaded successfully")
except Exception as e:
    print(f"Error loading model or vectorizer: {e}")
    raise e

browser = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))

url = 'https://www.nature.com/articles/s41598-022-10841-5'

links_with_text = []

try:
    browser.get(url)
        
    WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
        
    time.sleep(2)
        
    soup = BeautifulSoup(browser.page_source, "html.parser")
        
    for line in soup.find_all('a'):
        href = line.get('href')
        if href:
            links_with_text.append([url, href])
except Exception as e:
    print(f"An error occurred while scraping: {e}")
finally:
    browser.quit()

link_list=[]

for link in links_with_text:
    try:
        encoded_url = urllib.parse.quote(link[1], safe='')
        x_predict = vectorizer.transform([encoded_url])
        additional_features = [[len(encoded_url), encoded_url.count('.'), encoded_url.count('/')]]
        x_predict = sp.hstack((x_predict, additional_features), format='csr')
        y_predict = model.predict(x_predict)

        result = link+' : '+("This is a Phishing Site" if y_predict[0] == 1 else "This is not a Phishing Site")
        print(result)
        link_list.append((link,y_predict[0]))
    
    except Exception as e:
        print(f"Error during prediction: {e}")

G = nx.Graph()
node_colors = {}

for link, prediction in link_list:
    G.add_edge(url, link[1])
    node_colors[link[1]] = 'red' if prediction == 1 else 'green'

node_colors_list = [node_colors.get(node,'blue') for node in G.nodes]

pos = nx.spring_layout(G) 
nx.draw(G, pos, with_labels=False, node_color=node_colors_list, node_size=500)
plt.savefig("graph.jpg")