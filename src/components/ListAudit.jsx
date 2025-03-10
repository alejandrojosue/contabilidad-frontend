import { useEffect } from "react";
import { COLUMNS_AUDIT } from "../constants/datagridHeaders";
import { useAudit } from "../hooks/useAudit";
import Table from "../components/DataTable";

export const ListAudit = () => {
  const { values, loading, get } = useAudit()

  useEffect(() => {
    get()
  }, []);

  return <Table columns={COLUMNS_AUDIT} rows={values} loading={loading} />;
};
