
const DB_NAME = "cms-comtronics-media";
const STORE_NAME = "media";
const DB_VERSION = 1;

function openMediaDB() {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("IndexedDB tidak tersedia di browser."));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveMediaFile(file) {
  const db = await openMediaDB();

  const media = {
    id: crypto.randomUUID(),
    name: file.name,
    type: file.type,
    size: file.size,
    file: file,
  };

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");

    transaction.objectStore(STORE_NAME).put(media);

    transaction.oncomplete = () => {
      db.close();

      resolve({
        id: media.id,
        name: media.name,
        type: media.type,
        size: media.size,
      });
    };

    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };

    transaction.onabort = () => {
      db.close();
      reject(transaction.error || new Error("Penyimpanan media dibatalkan."));
    };
  });
}

export async function getMediaFile(id) {
  if (!id || typeof window === "undefined") return null;

  const db = await openMediaDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const request = transaction.objectStore(STORE_NAME).get(id);

    request.onsuccess = () => {
      const storedMedia = request.result;

      if (storedMedia?.file instanceof Blob) {
        resolve(storedMedia.file);
      } else {
        resolve(null);
      }
    };

    request.onerror = () => {
      reject(request.error);
    };

    transaction.oncomplete = () => {
      db.close();
    };

    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };

    transaction.onabort = () => {
      db.close();
      reject(transaction.error);
    };
  });
}
