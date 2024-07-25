import axios from "axios";
import { useEffect } from "react";

export default function Abc() {
  async function a() {
    try {
      const ab = await axios.get("/api/protect");
      console.log(ab);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    a();
  }, []);
  return;
}
