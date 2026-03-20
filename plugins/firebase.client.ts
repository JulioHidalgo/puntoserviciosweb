import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

export default defineNuxtPlugin(() => {

  if (process.server) return;

const firebaseConfig = {
  apiKey: "AIzaSyA63UW23ScFCYffIjmH_syYZxGVTvOO-W0",
  authDomain: "puntoserviciosblog.firebaseapp.com",
  projectId: "puntoserviciosblog",
  storageBucket: "puntoserviciosblog.appspot.com",
  messagingSenderId: "1072251918532",
  appId: "1:1072251918532:web:9ed0f23222466083bd1191"
};

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);

  return {
    provide: {
      db,
      auth,
      storage
    }
  };
});
