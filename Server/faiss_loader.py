# faiss_loader.py
from langchain.vectorstores import FAISS
from langchain.embeddings import HuggingFaceBgeEmbeddings
from langchain.document_loaders import CSVLoader

model_name = "BAAI/bge-base-en"
encode_kwargs = {"normalize_embeddings": True}
model_norm = HuggingFaceBgeEmbeddings(
    model_name=model_name,
    model_kwargs={"device": "cpu"},
    encode_kwargs=encode_kwargs,
)


def load_faiss():
    loader = CSVLoader(file_path="D:\\Pranav\\Repository\\Python\\Records\\try1.csv")
    documents = loader.load()
    embeddings = model_norm
    db = FAISS.from_documents(documents, embeddings)
    return db


def retrieve_info(db, query):
    similar_response = db.similarity_search(query, k=6)
    page_contents_array = [doc.page_content for doc in similar_response]
    return page_contents_array
