"use client";

import useSWR from "swr";
import React, { useEffect } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Skeleton,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Link,
} from "@nextui-org/react";
import { useRouter } from 'next/navigation'

// const fetcher = (...args) => fetch(...args).then((res) => res.json())

const AddPage = ({ prods }) => {
  // const { data, error } = useSWR('http://127.0.0.1:5000/part', fetcher)
  const router = useRouter()
  const [selectedColor, setSelectedColor] = React.useState("success");
  const [loadingData, setLoadingData] = React.useState(false);
  const [partNo, setPartNo] = React.useState("ระบุ Part No.");
  const [qty, setQty] = React.useState(0);

  const [partData, setPartData] = React.useState([]);

  // useEffect(() => {
  //   fetch('http://127.0.0.1:5000/part')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setPartData(data);
  //     })
  // }, []);

  const searchItem = () => {
    if (partNo !== undefined) {
      if (partNo === "") {
        alert("กรุณาระบุ PartNo.");
        return;
      }
    }
    setPartData([]);
    setLoadingData(true);
    fetch(`http://192.168.20.15:5000/detail?id=${partNo}`)
      .then((res) => res.json())
      .then((data) => {
        setPartData(data);
        console.dir(data);
        setLoadingData(false);
      });
  };

  const postData = () => {
    var docs = [];
    var seq = 0;
    partData.map((i) => {
      // console.dir(i)
      docs.push({
        // id
        // mtm_no
        // mtm_date
        part_mtm: i.code_mom,
        part_mtm_name: i.name_mom,
        n_qty: parseInt(qty),
        seq: seq + 1,
        part_detail_no: i.code_son,
        part_detail_name: i.name_son,
        qty: i.nqty * qty,
        part_unit: i.um_son_name,
      });
      seq++;
    });

    // console.dir(docs)
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(docs);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.API_HOST}/report`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // router.push(`http://localhost:5000/pdf?id=${result.job_no}`)
        router.push(`/`)
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="w-full">
      <div className="flex flex-nowrap justify-between w-full">
        <div className="justify-items-start flex w-full space-x-4">
          <>
            <Input
              isClearable
              isRequired
              type="text"
              label="Part No."
              labelPlacement="outside"
              value={partNo}
              onChange={(e) => setPartNo(e.target.value)}
              className="max-w-xs"
            />
          </>
          <>
            <Input
              isClearable
              isRequired
              type="number"
              label="Qty"
              labelPlacement="outside"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="max-w-xs"
            />
          </>
          <>
            <div className="pt-6">
              <Button
                isLoading={loadingData}
                color="primary"
                onPress={searchItem}
              >
                ค้นหา
              </Button>{" "}
            </div>
          </>
        </div>
        <div className="gap justify-self-end pt-6">
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
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            }
            onPress={postData}
          >
            บันทึกข้อมูล
          </Button>{" "}
        </div>
      </div>
      <div className="pt-10">
        {loadingData ? (
          <div className="w-full flex items-center gap-3">
            <div>
              <Skeleton className="flex rounded-full w-full h-12" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-full rounded-lg" />
              <Skeleton className="h-3 w-full rounded-lg" />
              <Skeleton className="h-3 w-full rounded-lg" />
              <Skeleton className="h-3 w-full rounded-lg" />
              <Skeleton className="h-3 w-full rounded-lg" />
              <Skeleton className="h-3 w-full rounded-lg" />
              <Skeleton className="h-3 w-full rounded-lg" />
              <Skeleton className="h-3 w-full rounded-lg" />
            </div>
          </div>
        ) : (
          <Table
            color={selectedColor}
            selectionMode="single"
            defaultSelectedKeys={["1"]}
            aria-label="Example static collection table"
          >
            <TableHeader>
              <TableColumn>#</TableColumn>
              <TableColumn>รหัส</TableColumn>
              <TableColumn>รายละเอียด</TableColumn>
              <TableColumn>จำนวน</TableColumn>
              <TableColumn>หน่วย</TableColumn>
              <TableColumn>สถานะ</TableColumn>
            </TableHeader>
            <TableBody>
              {partData.length > 0 &&
                partData.map((i, k) => (
                  <TableRow key={i.key_son}>
                    <TableCell>{k + 1}</TableCell>
                    <TableCell>{i.code_son}</TableCell>
                    <TableCell>{i.name_son}</TableCell>
                    <TableCell>
                      <span
                        className={
                          qty > 0
                            ? `text-blue-800 font-bold`
                            : `text-red-800 font-bold`
                        }
                      >
                        {(i.nqty * qty).toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>{i.um_son_name}</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default AddPage;
