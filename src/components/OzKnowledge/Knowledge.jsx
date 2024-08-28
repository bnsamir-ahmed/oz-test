import { useContext } from "react";
import { AuthContext } from "../../apis/context/AuthTokenContext";
import { KnowledgeHome } from "../../apis/OzKnowledge";
import { useQuery } from '@tanstack/react-query';
import { Alert, Skeleton } from 'antd';
import MainHeaderWrapper from "../UI/MainHeaderWrapper";
import Paragraph from "../UI/Paragraph";
import KnowledgeDescription from "./KnowledgeDescription";
import PopularCourses from "./PopularCourses";
import PopularInstructor from "./PopularInstructor";
import JoinCommuinty from "../Community/JoinCommuinty/JoinCommuinty";

const Knowledge = () => {
  const { token, branchId } = useContext(AuthContext);

  const { isPending, error, data } = useQuery({
    queryKey: ['KnowledgeHome'],
    queryFn: ({signal}) => KnowledgeHome(token, branchId, signal)
  })

  return (
    <>
      <MainHeaderWrapper image={data?.knowladge_slider} height="670px">
        <div className={`container-fluid px-70`}>
          <div className="col-xl-6 col-lg-9 col-12">
              {isPending && (<Skeleton active paragraph={{rows: 2}} />)}
              <Paragraph className="head_paragraph mb-3">{data?.knowladge_slider[0]?.title}</Paragraph>
              <Paragraph className="description mb-0">{data?.knowladge_slider[0]?.description}</Paragraph>
          </div>
        </div>
      </MainHeaderWrapper>
        {error && (<Alert message={error.message} type="error" showIcon />)}
      <KnowledgeDescription categories={data?.categories} info={data?.info} isPending={isPending} />
      <PopularCourses />
      <PopularInstructor details={data?.recommended_trainers} />
      <JoinCommuinty details={data?.footer} />
    </>
  );
};
export default Knowledge;
