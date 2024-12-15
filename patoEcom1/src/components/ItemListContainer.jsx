import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import ItemList from "./ItemList";

const ItemListContainer = ({ firebaseApp }) => {
  const [medicamentos, setMedicamentos] = useState([]);

  useEffect(() => {
    const fetchMedicamentos = async () => {
      const db = getFirestore(firebaseApp);
      const snapshot = await getDocs(collection(db, "medicamentos"));
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMedicamentos(items);
    };

    fetchMedicamentos();
  }, [firebaseApp]);

  return (
    <div className="item-list-container">
      <h2>Medicamentos Disponibles</h2>
      <ItemList items={medicamentos} />
    </div>
  );
};

export default ItemListContainer;
