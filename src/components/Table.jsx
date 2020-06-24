import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import { CacheContext } from "./../context/cacheContext";

export const CacheTable = () => {
  const { cache, get } = useContext(CacheContext);
  console.log(cache);
  return (
    <Table striped bordered hover variant="dark" className="mt-3">
      <thead>
        <tr>
          <th>Key :</th>
          <th>Value :</th>
        </tr>
      </thead>
      <tbody>
        {cache.map((i) => {
          return (
            <Raw keyValue={i.value} keyName={i.key} key={i.key} get={get} />
          );
        })}
      </tbody>
    </Table>
  );
};

const Raw = ({ keyName, keyValue, get }) => {
  const onDoubleClick = () => {
    console.log("doubleclick on #", keyName);
    get(keyName, keyValue);
  };
  return (
    <tr onDoubleClick={onDoubleClick}>
      <td>{keyName}</td>
      <td>{keyValue}</td>
    </tr>
  );
};
