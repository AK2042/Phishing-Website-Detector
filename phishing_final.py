import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.linear_model import LogisticRegression
import pickle

data = pd.read_csv('phishing_site_urls.csv')
urls = data['URL']
labels = data['Label']

data['url_length'] = urls.apply(lambda x: len(x))
data['num_dots'] = urls.apply(lambda x: x.count('.'))
data['num_slashes'] = urls.apply(lambda x: x.count('/'))

vectorizer = TfidfVectorizer(max_features=5000)
X = vectorizer.fit_transform(urls)

import scipy.sparse as sp
additional_features = data[['url_length', 'num_dots', 'num_slashes']].values
X = sp.hstack((X, additional_features), format='csr')

y = (labels == 'bad').astype(int).values

trainX, testX, trainY, testY = train_test_split(X, y, test_size=0.2, random_state=100)

model = LogisticRegression(max_iter=1000)
model.fit(trainX, trainY)

predictions = model.predict(testX)

accuracy = accuracy_score(testY, predictions)
precision = precision_score(testY, predictions)
recall = recall_score(testY, predictions)
f1 = f1_score(testY, predictions)

print(f'Accuracy: {accuracy:.4f}')
print(f'Precision: {precision:.4f}')
print(f'Recall: {recall:.4f}')
print(f'F1 Score: {f1:.4f}')


with open('phishing_model.pkl', 'wb') as f:
    pickle.dump(model, f)
with open('vectorizer.pkl', 'wb') as f:
    pickle.dump(vectorizer, f)
