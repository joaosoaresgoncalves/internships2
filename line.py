#solve the word count without punctuation
import string
def remove(x):
    x = ''.join(ch for ch in x if ch not in string.punctuation)
    return x

frases = ["isto é uma, experiencia","outra e outra"]
rddFR = sc.parallelize(frases)
print(rddFR.collect())

# Apply the remove function to clean punctuation, then split by spaces
rddFR2 = rddFR.map(remove).flatMap(lambda line: line.split())
print(rddFR2.collect())

# Count each word
wordCounts = rddFR2.map(lambda word: (word, 1)).reduceByKey(lambda a, b: a + b)
print(wordCounts.collect())
