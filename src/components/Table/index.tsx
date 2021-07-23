import "./table.css";
import Pagination from "../Pagination";
import { useCallback, useEffect, useState } from "react";
import FilterForm, { FilterFormState } from "../FilterForm";
import data from "../../data/data.json";

interface ShowData {
  id: number;
  name: string;
  date: string;
  title: string;
  field: string;
  old_value: string;
  new_value: string;
  [key: string]: any;
}

const Table: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [showData, setShowData] = useState<ShowData[] | []>([]);
  const [countPerPage, setCountPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState<ShowData[]>([]);

  const handePagination = (selectedPage: number) => {
    setPage(selectedPage);
  };

  const handleFilter = useCallback((filteredvalues: FilterFormState) => {
    console.log(Object.entries(filteredvalues));
    console.log(Array.isArray(data));
    const entries = Object.entries(filteredvalues);
    let shows: any = data;
    entries.forEach((field) => {
      if (Array.isArray(data)) {
        shows = shows.filter((el: ShowData, index: number) => {
          const key: string = field[0];
          if (el[key].toLowerCase().includes(filteredvalues[key].toLowerCase()))
            return el;
        });
      }
    });
    console.log(shows);

    setFilteredData(shows);
    setPage(1);
  }, []);

  useEffect(() => {
    if (filteredData) {
      console.log(page * countPerPage - countPerPage);

      const showingData = filteredData?.slice(
        page * countPerPage - countPerPage,
        page * countPerPage - countPerPage + countPerPage
      );
      console.log(showingData);

      setShowData(showingData);
    }
  }, [filteredData, page, countPerPage]);

  const handleSelectedRow = (value: any, id: number) => {
    console.log(value, id);
  };

  return (
    <div>
      <FilterForm handleFilter={handleFilter} />
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>شناسه</th>
            <th>نام تغییر دهنده</th>
            <th>تاریخ</th>
            <th>نام آگهی</th>
            <th>فیلد</th>
            <th>مقدار قدیمی</th>
            <th>مقدار جدید</th>
          </tr>
        </thead>
        <tbody>
          {showData.map((el: ShowData) => {
            return (
              <tr key={el.id}>
                <th data-column="#">
                  <input
                    type="checkbox"
                    // checked={true}
                    onChange={(e) => handleSelectedRow(e.target.value, el.id)}
                  />
                </th>
                <td data-column="شناسه">{el.id}</td>
                <td data-column="نام تغییر دهنده">{el.name}</td>
                <td data-column="تاریخ">{el.date}</td>
                <td data-column="نام آگهی">{el.title}</td>
                <td data-column="فیلد">{el.field}</td>
                <td data-column="مقدار قدیمی">{el.old_value}</td>
                <td data-column="مقدار جدید">{el.new_value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        page={page}
        totalRecord={filteredData?.length}
        countPerPage={countPerPage}
        handlePagination={handePagination}
      />
    </div>
  );
};

export default Table;
