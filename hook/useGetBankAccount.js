import axios from "axios";

export default function useGetBankAccount({ setPreview }) {
  const [bankAccount, setBankAccount] = useState({});

  async function getBankAccount() {
    try {
      const res = await axios.get(`/api/sitters/${id}/payout`);
      setBankAccount(res.data.data[0]);
      if (res.data.data[0].book_bank_image_url) {
        setPreview(res.data.data[0].book_bank_image_url);
      }
    } catch (error) {
      console.error("Error fetching bank account:", error);
    }
  }

  return { bankAccount, setBankAccount, getBankAccount };
}
