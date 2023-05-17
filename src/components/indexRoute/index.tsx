import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface IIndexRouteProps {
  currentPage: number;
}

const IndexRoute = ({ currentPage }: IIndexRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/page/${currentPage}`);
  }, []);

  return <></>;
};

export default IndexRoute;
