import styles from "./Customer.module.css";
import { useState } from "react";

function Customer() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editingIndex] = { name, image, description };
      setItems(updatedItems);
      setEditingIndex(null);
    } else {
      setItems([...items, { name, image, description }]);
    }

    setName("");
    setImage("");
    setDescription("");
  };
  const handleDelete = (indexToDelete) => {
    setItems(items.filter((_, index) => index !== indexToDelete));
  };

  const handleEdit = (indexToEdit) => {
    const itemToEdit = items[indexToEdit];

    setName(itemToEdit.name);
    setImage(itemToEdit.image);
    setDescription(itemToEdit.description);

    setEditingIndex(indexToEdit);
  };

  return (
      <main>
        <section className={styles.createContent}>
          <h2>Create New Profile</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Image</label>

              <div className={styles.imageInputWrapper}>
                <input
                  type="text"
                  placeholder="Enter Image URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />

                <img
                  src={"link.png"}
                  alt="Upload"
                  className={styles.uploadIcon}
                  onClick={() => document.getElementById("imageUpload").click()}
                />

                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setImage(URL.createObjectURL(file)); 
                    }
                  }}
                />
              </div>

              {image && (
                <img src={image} alt="Preview" className={styles.preview} />
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Description</label>
              <textarea
                placeholder="Expand on your ideas..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className={styles.btn}>
              Create
            </button>
          </form>
        </section>

        <section className={styles.listContent}>
          {items.map((item, index) => (
            <div key={index} className={styles.card}>
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              
              <div className={styles.cardActions}>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
            </div>
          ))}
        </section>
      </main>
  );
}

export default Customer;
