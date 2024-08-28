import React, { useContext, useEffect, useState } from "react";
import HeaderClasses from "./HeaderClasses";
import TrainingClasses from "./TrainingClasses";
import CardsClasses from "./CardsClasses";
import { AuthContext } from "../../apis/context/AuthTokenContext";
import { getTrainingClasses } from "../../apis/ZeeStudio";
import { useQuery } from "@tanstack/react-query";

function MoreClasses() {
  
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(0);
  const [classesGymFilter, setClassesGymFilter] = useState([]);

  const [dateFilter, setDateFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [categoreyFilter, setCategoreyFilter] = useState("");
  const [skill, setSkill] = useState(true);

  const { token, branchId } = useContext(AuthContext);

  const {
    data: classesGym,
    isPending,
    error,
  } = useQuery({
    queryKey: [
      "trainingClasses",
      limit,
      page,
      searchFilter,
      dateFilter,
      categoreyFilter,
    ],
    queryFn: ({ signal }) =>
      getTrainingClasses(
        token,
        limit,
        page,
        searchFilter,
        dateFilter,
        categoreyFilter,
        branchId,
        signal
      ),
  });

  const getFilterDate = (data) => {
    setDateFilter(data);
  };
  const getFilterSearch = (data) => {
    setSearchFilter(data);
  };
  const getFilterCategorey = (data) => {
    setCategoreyFilter(data);
  };

  const getLimit = (value) => {
    setLimit(value);
  };

  return (
    <>
      <HeaderClasses />
      <TrainingClasses
        classesGym={classesGymFilter || []}
        getFilterDate={getFilterDate}
        getFilterSearch={getFilterSearch}
        getFilterCategorey={getFilterCategorey}
        limit={limit}
      />
      <CardsClasses classesGym={classesGym} getLimit={getLimit} pending={isPending}/>
    </>
  );
}

export default MoreClasses;
