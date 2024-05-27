from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import time
import pickle

def prediction(l):
    load = pickle.load(open('phishing.pkl', 'rb'))
    res = load.predict(l)
    for i in range(len(l)):
        print(l[i], res[i])

browser = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
urls = ['https://www.yourbank.com/update-your-account-information-now']
links_with_text = []

try:
    for url in urls:
        browser.get(url)
        WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
        time.sleep(2)
        soup = BeautifulSoup(browser.page_source, "html.parser")

        for line in soup.find_all('a'):
            href = line.get('href')
            links_with_text.append([url, href])
except Exception as e:
    print(f"An error occurred: {e}")
finally:
    browser.quit()
x = [link[1] for link in links_with_text]

prediction(x)