import { useEffect, useState } from "react";
import { COLUMNS_AUDIT } from "../constants/datagridHeaders";
import { useAudit } from "../hooks/useAudit";
import Table from "../components/DataTable";
import AlertComponent from "./AlertComponent";

export const ListAudit = () => {
  const { values, loading, error, get } = useAudit();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    get();
  }, []);
  
  useEffect(() => {
    if (error?.msg) {
      setOpen(true);
    }
  }, [error]);

  const handleClose = () => setOpen(false);

  return (
    <>
      <Table columns={COLUMNS_AUDIT} rows={values} loading={loading} />
      <AlertComponent message={error?.msg ?? ""} type="error" open={open} handleClose={handleClose} />
    </>
  );
};
