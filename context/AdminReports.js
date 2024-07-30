import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

const ReportContext = createContext();

export function useAdminReport() {
  return useContext(ReportContext);
}

export function AdminReportProvider(props) {
  const [reports, setReports] = useState([]);
  const [filtedReport, setFiltedReport] = useState("All status");
  const [currentReport, setCurrentReport] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDropdownOpened, setIsDropDownOpened] = useState();
  const [isReportDetailOpened, setIsReportDetailOpened] = useState(false);
  const [isCancelReportModalOpened, setIsCancelReportModalOpened] =
    useState(false);
  const [isResolveModalOpened, setIsResolveModalOpened] = useState(false);

  async function getReports() {
    setLoading(true);
    try {
      const response = await axios.get("/api/reports/reports");
      if (response) {
        setReports(response.data);
        setLoading(false);
        setError(null);
      }
    } catch {
      setError("Could not get reports");
      setLoading(false);
    }
  }

  function reportDetailToggle(values) {
    setCurrentReport(values);
    setIsReportDetailOpened((prev) => !prev);
  }

  function cancelReportToggle() {
    setIsCancelReportModalOpened((prev) => !prev);
  }

  function resolveToggle() {
    setIsResolveModalOpened((prev) => !prev);
  }

  function dropdownToggle() {
    setIsDropDownOpened((prev) => !prev);
  }

  useEffect(() => {
    getReports();
  }, [isReportDetailOpened]);

  return (
    <ReportContext.Provider
      value={{
        loading,
        error,
        reports,
        currentReport,
        setCurrentReport,
        isReportDetailOpened,
        reportDetailToggle,
        isCancelReportModalOpened,
        cancelReportToggle,
        isResolveModalOpened,
        resolveToggle,
        isDropdownOpened,
        dropdownToggle,
        filtedReport,
        setFiltedReport,
      }}
    >
      {props.children}
    </ReportContext.Provider>
  );
}
