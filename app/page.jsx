"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Link,
} from "@nextui-org/react";

const colors = [
  "default",
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
];

const HomPage = () => {
  const [selectedColor, setSelectedColor] = React.useState("success");
  const [loadingData, setLoadingData] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoadingData(true);
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`http://192.168.20.15:5000/data`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.dir(result);
        setData(result);
        setLoadingData(false);
      })
      .catch((error) => console.error(error));
  }, [data]);

  return (
    <>
      <Table
        color={selectedColor}
        selectionMode="single"
        defaultSelectedKeys={["1"]}
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn>#</TableColumn>
          <TableColumn>เลขที่เอกสาร</TableColumn>
          <TableColumn>รหัส</TableColumn>
          <TableColumn>รายละเอียด</TableColumn>
          <TableColumn>จำนวน Ctn</TableColumn>
          <TableColumn>จำนวน Qty</TableColumn>
          <TableColumn>หน่วย</TableColumn>
          <TableColumn>สถานะ</TableColumn>
          <TableColumn>
            <Link href="/add">
              <Button
                color="primary"
                startContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                }
              >
                เพิ่มรายการใหม่
              </Button>{" "}
            </Link>
          </TableColumn>
        </TableHeader>
        {data?.length > 0 ? (
          <TableBody>
            {data?.map((i, k) => (
              <TableRow key={k + 1}>
                <TableCell>{k + 1}</TableCell>
                <TableCell>{i.mtm_no}</TableCell>
                <TableCell>{i.part_mtm}</TableCell>
                <TableCell>{i.part_mtm_name}</TableCell>
                <TableCell>{i.ctn}</TableCell>
                <TableCell>{(i.qty).toLocaleString()}</TableCell>
                <TableCell>{i.part_unit}</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>
                  <Link isExternal href={`http://192.168.20.15:5000/pdf?id=${i.mtm_no}`}>
                    <Button
                      color="warning"
                      startContent={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
                          />
                        </svg>
                      }
                    >
                      ปริ้นรายงาน
                    </Button>{" "}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
        )}
      </Table>
    </>
  );
};

export default HomPage;
