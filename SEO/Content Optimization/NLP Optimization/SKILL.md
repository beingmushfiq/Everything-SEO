---
name: seo-nlp-optimization
description: Natural Language Processing algorithms, semantic salience scoring, BM25 / TF-IDF topical co-occurrence, and document vector optimization.
metadata:
  category: Content Optimization
  discipline: Semantic Engineering
  version: "1.0.0"
---

# NLP Optimization

## A. Purpose
The NLP Optimization skill applies computational linguistics and Natural Language Processing (NLP) principles to elevate the semantic depth and algorithmic relevance of web content. Modern search engines do not match query strings via crude keyword density formulas; they utilize deep learning models (such as BERT, MUM, and transformer-based vector embeddings) to parse syntactic dependencies, entity salience, and contextual co-occurrence. This skill enables practitioners and autonomous agents to audit and optimize content against state-of-the-art NLP models, ensuring documents communicate high topical authority without degrading editorial readability.

## B. Trigger Conditions
Invoke this skill when:
1. Optimizing an essential pillar guide or high-value commercial landing page competing against deeply authoritative enterprise websites.
2. Troubleshooting a document that has high word count and strong backlinks but fails to rank in the top 10 due to thin semantic relevance.
3. Aligning newly generated or refreshed content with Google’s Natural Language API salience expectations.
4. Conducting an algorithmic content audit before launching an expensive content marketing campaign.

Upstream dependencies: [SERP Analysis](../../Keyword%20Research/SERP%20Analysis/SKILL.md) and [Gap Analysis](../Gap%20Analysis/SKILL.md).

## C. Scope and Boundaries
- **In-Scope**:
  - Entity extraction and salience scoring (Google Cloud Natural Language API model).
  - BM25 and TF-IDF semantic co-occurrence modeling.
  - Syntactic dependency parsing and subject-predicate-object structure optimization.
  - Vector cosine similarity benchmarking against top-ranking corpus assets.
  - Removing semantic bloat, repetitive tautology, and keyword stuffing.
- **Out-of-Scope**:
  - Wikidata / Wikipedia Knowledge Graph mapping (Handled by [Entity Coverage](../Entity%20Coverage/SKILL.md)).
  - HTML title and heading tag engineering (Handled by [Title](../../On-page%20SEO/Title/SKILL.md) and [Headings Optimization](../../On-page%20SEO/Headings%20Optimization/SKILL.md)).
  - Readability and sentence-level cognitive load (Handled by [Readability](../Readability/SKILL.md)).

## D. Required Inputs
1. **Target Document Text**: Clean body copy stripped of HTML/markdown boilerplate.
2. **Top 3 Ranking Competitor Documents**: Clean body copy from the top 3 ranking URLs for the primary query.
3. **Primary Target Entity**: The core concept being optimized (e.g., `PostgreSQL Write-Ahead Logging`).

## E. Required Tools and Data Sources
- **Commercial Tooling**: Surfer SEO (Content Score & NLP entities), Clearscope (Term relevance grades), InLinks (Topic semantic mapping).
- **Zero-Cost / Open Source Alternatives**:
  - Google Cloud Natural Language API (Free tier / demo endpoint for entity salience and syntax analysis).
  - Python NLP libraries: `spacy` (Named Entity Recognition [NER], dependency parsing), `scikit-learn` (`TfidfVectorizer`), `gensim` (FastText/Word2Vec word embeddings).
  - HuggingFace Transformers (SentenceTransformers for vector cosine similarity comparisons).

## F. Core Concepts and Decision Principles
1. **Entity Salience vs. Keyword Frequency**:
   - *Frequency*: How many times a word appears in the text (crude keyword count).
   - *Salience*: A metric (0.0 to 1.0) calculated by Google's Natural Language algorithms indicating how central an entity is to the overall document topic based on syntax, position, and sentence structure.
   - An entity mentioned 3 times in primary subject positions (e.g., `PostgreSQL archives WAL records...`) can have higher salience than a keyword repeated 20 times in passive prepositional phrases.
2. **Topical Co-occurrence (BM25 / TF-IDF)**:
   - When expert authors write about a topic, they naturally use a predictable constellation of supporting technical vocabulary without thinking about SEO.
   - For example, an authoritative article on `Kubernetes Security` will naturally contain `RBAC`, `pod security admission`, `etcd encryption`, `kube-bench`, `CIS benchmarks`, and `least privilege`. If your article omits these co-occurring entities, NLP models score it as a generic, superficial summary.
3. **The "Unnatural Optimization" Trap**:
   - Blindly inserting NLP keywords into random paragraphs without grammatical harmony destroys user experience and triggers neural text classification filters.
   - Every injected entity must function as a legitimate structural component of a meaningful technical sentence.

## G. Operational Workflow

```
[Extract Clean Corpus from Target & Competitors] -> [Run Spacy NER & Entity Extraction]
                         |                                          |
                         v                                          v
      [Calculate Salience & BM25 Co-occurrence] -> [Identify Deficit Entity Matrix]
                         |                                          |
                         v                                          v
      [Draft Contextual Entity Sentences] -> [Validate Vector Cosine Similarity]
```

### Step 1: Text Corpus Extraction & Cleansing
1. Strip navigation menus, headers, footers, author bios, and sidebar text from your target document and the top 3 competitor documents.
2. Retain pure editorial body copy for statistical processing.

### Step 2: Extract Entities & Salience via Spacy or Google NLP API
Run a local Python script using `spacy` to identify Named Entities, nouns, and core noun chunks:
```python
import spacy
from collections import Counter

nlp = spacy.load("en_core_web_sm")

def extract_top_entities(text):
    doc = nlp(text)
    # Filter for Nouns, Proper Nouns, and Named Entities
    entities = [ent.text.lower() for ent in doc.ents]
    noun_chunks = [chunk.text.lower() for chunk in doc.noun_chunks if len(chunk.text.split()) < 4]
    return Counter(entities + noun_chunks).most_common(50)

with open('my_doc.txt') as f: my_terms = extract_top_entities(f.read())
with open('competitor_top1.txt') as f: comp_terms = extract_top_entities(f.read())

print("Top 10 Competitor Entities:", comp_terms[:10])
```

### Step 3: Compute TF-IDF / BM25 Entity Gap
1. Compute the TF-IDF vector matrix across a mini-corpus comprising your document and the top 5 ranking documents:
```python
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd

corpus = [open('my_doc.txt').read(), open('comp1.txt').read(), open('comp2.txt').read()]
vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1, 2), max_features=100)
X = vectorizer.fit_transform(corpus)
feature_names = vectorizer.get_feature_names_out()

df_tfidf = pd.DataFrame(X.toarray(), columns=feature_names, index=['My Doc', 'Comp 1', 'Comp 2']).T
# Find terms where Competitors have high TF-IDF but My Doc has 0
deficit_terms = df_tfidf[(df_tfidf['My Doc'] == 0) & (df_tfidf[['Comp 1', 'Comp 2']].mean(axis=1) > 0.05)]
print("Critical NLP Deficit Entities:\n", deficit_terms)
```

### Step 4: Syntactic Sentence Optimization (Boosting Salience)
To boost the salience of the core entity:
1. **Promote the Entity to the Grammatical Subject**:
   - *Weak Salience (Passive/Object)*: `Automated recovery can be achieved when tools like PostgreSQL are configured properly.`
   - *Strong Salience (Active/Subject)*: `PostgreSQL Write-Ahead Logging (WAL) guarantees crash recovery by recording every database transaction before disk commit.`
2. **Inject Missing Co-Occurring Entities into Contextual Passages**:
   - Group related deficit terms together in dedicated explanatory subsections rather than scattering single words randomly throughout the text.

### Step 5: Vector Similarity Verification
Compute the cosine similarity between your revised document and the top-ranking competitor using SentenceTransformers:
```python
from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer('all-MiniLM-L6-v2')
emb1 = model.encode(open('my_doc.txt').read(), convert_to_tensor=True)
emb2 = model.encode(open('comp1.txt').read(), convert_to_tensor=True)

similarity = util.pytorch_cos_sim(emb1, emb2)
print(f"Semantic Cosine Similarity: {similarity.item():.4f}")
```
*Target*: Achieve a cosine similarity between **0.78 and 0.88**. A score $> 0.95$ indicates excessive paraphrasing; a score $< 0.70$ indicates insufficient topical alignment.

## H. Analysis and Decision Framework
Use this framework to evaluate NLP recommendations:

```
                    [Discovered Deficit NLP Term]
                                  |
                Is the term technically relevant to your
                 product/service or core subject matter?
                             /            \
                          [Yes]           [No]
                           /                \
           Does adding it require a dedicated (Discard: Off-topic term)
           sentence or paragraph to be clear?
                      /          \
                   [Yes]         [No]
                    /              \
         (Draft a 2-sentence     (Naturally weave term into
          technical explanation)  an existing related sentence)
```

## I. Prioritization Framework
Score entity injection opportunities using the **NLP Relevance Deficit (NRD)**:

$$\text{NRD} = \text{Average Competitor TF-IDF Score} \times \text{Competitor Frequency Rank (1-10)}$$

Prioritize the top 15 terms with the highest NRD score.

## J. Deliverables & Specifications
Deliver an **NLP Semantic Enhancement Matrix**:
1. `target_url`: Document path.
2. `primary_entity_salience_score`: Pre vs. Post optimization.
3. `deficit_entities_injected`: List of 10-20 semantic entities added.
4. `syntactic_rewrite_examples`: 3 before/after sentence pairs demonstrating active subject-verb-object optimization.
5. `vector_similarity_score`: Cosine similarity score against the #1 ranking competitor.

## K. Quality Assurance Checklist
- [ ] Primary focus entity is the grammatical subject of the opening sentence of the document.
- [ ] No sentences sound awkward or forced when read aloud.
- [ ] Injected entities reflect accurate technical facts and up-to-date documentation.
- [ ] Target document does not exceed competitor term frequency by more than 50% (prevents over-optimization flags).
- [ ] Verified that vector similarity falls within the target range (0.78 - 0.88).

## L. Failure Modes and Anti-Patterns
- **The "Surfer SEO 100/100" Obsession**: Cramming every single obscure NLP term into the text until the article reads like an AI-generated fever dream, repelling human readers.
- **Tautological Filler**: Writing sentences like `When considering database backups, database backups are important for your database` to manipulate entity counts.
- **Ignoring Document Structure**: Placing all NLP keywords into a single "Terminology" glossary at the end of the page instead of weaving them contextually into the main argument.

## M. AI-Agent Operating Instructions
1. An AI agent must compute TF-IDF or BM25 matrices programmatically rather than guessing semantic terms.
2. When performing sentence rewrites, always preserve the author’s original brand voice and editorial tone.
3. Reject any suggested term that represents competitor trademarked product names or irrelevant geographical entities.

## N. Success Metrics & Verification Windows
- **Salience Elevation**: Core focus entity reaches a Google Natural Language API salience score $\ge 0.15$.
- **Ranking Velocity**: Document advances into the Google Top 10 within 30 days of updating.

## O. Related Skills
- **Upstream Input**: [SERP Analysis](../../Keyword%20Research/SERP%20Analysis/SKILL.md), [Gap Analysis](../Gap%20Analysis/SKILL.md)
- **Knowledge Graph Alignment**: [Entity Coverage](../Entity%20Coverage/SKILL.md)
- **Editorial Polish**: [Readability](../Readability/SKILL.md)

## P. Authoritative References
- [Google Cloud Natural Language API Documentation: Analyzing Entities](https://cloud.google.com/natural-language/docs/analyzing-entities) — Official guide on salience, entities, and syntax parsing.
- [Devlin et al. (Google AI): BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](https://arxiv.org/abs/1810.04805) — Foundational research on transformer-based semantic text representation.

## Q. Maintenance and Review Cycle
- **Annual Model Re-calibration**: Re-run NLP entity benchmarks every 12 months as the surrounding topical vocabulary and machine learning models evolve.
