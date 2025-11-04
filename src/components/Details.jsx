import { useState } from "react";
import styles from "./Details.module.css";

function Details() {
  const [receiptId, setReceiptId] = useState("");
  const [details, setDetails] = useState(null);

  async function handleFetch(e) {
    e.preventDefault();
    if (!receiptId) {
      alert("Please enter Receipt ID");
      return;
    }

    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `https://temple.hexalinks.in/api/vazhipadu_receipt_details?receipt_id=${receiptId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);

      if (data?.success) {
        setDetails(data.data);
      } else {
        alert(data?.message || "No details found ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Server error ❌");
    }
  }

  return (
    <div className={styles.container}>
      <h2>Fetch Receipt Details</h2>

      <form className={styles.inputContainer}>
        <input
          className={styles.noArrows}
          type="number"
          placeholder="Enter Receipt ID"
          value={receiptId}
          onChange={(e) => setReceiptId(e.target.value)}
        />
        <button type="submit" onClick={handleFetch}>
          Fetch
        </button>
      </form>

      {details && (
        <div className={styles.detailsBox}>
          <h3>Details Found</h3>

          <p>
            <strong>പേര്  :     </strong> {details.name}
          </p>
          <p>
            <strong>നാൾ  :    </strong> {details.naalu}
          </p>
          <p>
            <strong>നമ്പർ :    </strong> {details.contact_no}
          </p>
        </div>
      )}
    </div>
  );
}

export default Details;
