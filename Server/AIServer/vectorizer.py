import pickle
from langchain.vectorstores import FAISS
from langchain.document_loaders import CSVLoader
from langchain.embeddings import HuggingFaceBgeEmbeddings


def setup_faiss_vectorizer():
    model_name = "BAAI/bge-base-en"
    encode_kwargs = {"normalize_embeddings": True}

    model_norm = HuggingFaceBgeEmbeddings(
        model_name=model_name,
        model_kwargs={"device": "cpu"},
        encode_kwargs=encode_kwargs,
    )


    loader = CSVLoader(
        file_path="D:\\Softwares\\Codes\\D3CODE\\Monitus\\try1.csv"
    )
    documents = loader.load()

    embeddings = model_norm
    faiss_vectorizer = FAISS.from_documents(documents, embeddings)
    faiss_vectorizer = FAISS.from_documents(documents, embeddings)

    # Serialize and store the faiss_vectorizer
    with open("faiss_vectorizer.pkl", "wb") as f:
        pickle.dump(faiss_vectorizer, f)
    print("Serialized faiss_vectorizer stored successfully.")


def load_faiss_vectorizer():
    # Load the serialized faiss_vectorizer
    with open("D:\\Softwares\\Codes\\D3CODE\\Monitus\\faiss_vectorizer.pkl", "rb") as f:
        faiss_vectorizer = pickle.load(f)
    return faiss_vectorizer